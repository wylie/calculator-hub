import { Link } from 'react-router-dom';
import ConsentBanner from './ConsentBanner';
import CanonicalLink from './CanonicalLink';
import Nav from './Nav';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <CanonicalLink />
      <Nav />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {children}
      </main>
      <ConsentBanner />
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-slate-600">
          <p className="mb-2">
            Disclaimer: These calculators provide estimates for educational purposes only. They are not
            financial or medical advice. Please consult with a qualified professional for
            personalized guidance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
            <Link to="/privacy" className="text-xs text-slate-600 hover:text-slate-900 underline">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-slate-600 hover:text-slate-900 underline">Terms</Link>
            <Link to="/contact" className="text-xs text-slate-600 hover:text-slate-900 underline">Contact</Link>
          </div>
          <p>Simple Calculators 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
