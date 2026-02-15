import { useEffect } from 'react';

interface AdSlotProps {
  slotId?: string;
}

export default function AdSlot({ slotId = '1234567890' }: AdSlotProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log('AdSense error:', e);
    }
  }, [slotId]);

  return (
    <div className="my-6">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6736467803282205"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
