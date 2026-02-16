import Nav from './Nav';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Nav />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-slate-600">
          <p className="mb-2">
            Disclaimer: These calculators provide estimates for educational purposes only. They are not
            financial or medical advice. Please consult with a qualified professional for
            personalized guidance.
          </p>
          <p>Simple Calculators 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
