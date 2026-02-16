import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ConsentBanner() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const stored = window.localStorage.getItem('consent-accepted');
    setAccepted(stored === 'true');
  }, []);

  const handleAccept = () => {
    window.localStorage.setItem('consent-accepted', 'true');
    setAccepted(true);
  };

  if (accepted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-lg shadow-lg px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-slate-600">
          We use cookies to understand usage and improve the experience. By using this site, you agree to our privacy policy.
        </p>
        <div className="flex items-center gap-3">
          <Link
            to="/privacy"
            className="text-xs font-medium text-blue-600 hover:text-blue-700 underline"
          >
            Learn more
          </Link>
          <button
            onClick={handleAccept}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
