import { useEffect } from 'react';

interface AdSlotProps {
  slotId?: string;
}

export default function AdSlot({ slotId = '1569767653' }: AdSlotProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log('AdSense error:', e);
    }
  }, [slotId]);

  return (
    <div className="my-3 md:my-6 min-h-[250px]">
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
