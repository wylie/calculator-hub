import { useEffect, useRef } from 'react';

interface AdSlotProps {
  slotId?: string;
}

export default function AdSlot({ slotId = '1569767653' }: AdSlotProps) {
  const isDev = import.meta.env.DEV;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (!import.meta.env.PROD) {
      return;
    }

    const wrapper = wrapperRef.current;
    const adElement = adRef.current;
    if (!wrapper || !adElement) {
      return;
    }

    const updateVisibility = () => {
      const status = adElement.getAttribute('data-ad-status');

      if (status === 'filled') {
        wrapper.style.display = '';
        return true;
      }

      if (status === 'unfilled') {
        wrapper.style.display = 'none';
        return true;
      }

      return false;
    };

    const observer = new MutationObserver(updateVisibility);
    observer.observe(adElement, {
      attributes: true,
      attributeFilter: ['data-ad-status'],
    });
    updateVisibility();

    const pollInterval = window.setInterval(() => {
      if (updateVisibility()) {
        window.clearInterval(pollInterval);
      }
    }, 500);

    const fallbackTimeout = window.setTimeout(() => {
      const status = adElement.getAttribute('data-ad-status');
      if (status !== 'filled') {
        wrapper.style.display = 'none';
      }
      window.clearInterval(pollInterval);
    }, 8000);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log('AdSense error:', e);
    }

    return () => {
      window.clearInterval(pollInterval);
      window.clearTimeout(fallbackTimeout);
      observer.disconnect();
    };
  }, [slotId]);

  if (isDev) {
    return (
      <div className="my-3 md:my-6">
        <div className="flex min-h-[140px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-4 text-center text-sm text-slate-800">
          Ad placeholder (local only)
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="my-3 md:my-6">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1766867001144344"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
