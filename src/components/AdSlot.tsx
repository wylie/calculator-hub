import { useEffect } from 'react';

interface AdSlotProps {
  slotId?: string;
}

export default function AdSlot({ slotId = '1569767653' }: AdSlotProps) {
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (!import.meta.env.PROD) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log('AdSense error:', e);
    }
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
    <div className="my-3 md:my-6">
      <ins
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
