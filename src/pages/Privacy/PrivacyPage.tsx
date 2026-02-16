import Card from '../../components/Card';

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-600">
          We respect your privacy and collect minimal data to improve site performance.
        </p>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">What We Collect</h2>
        <p className="text-sm text-slate-600 mb-3">
          We use cookies and similar technologies to understand traffic patterns, improve usability, and support ads.
          We do not sell personal information.
        </p>
        <p className="text-sm text-slate-600">
          Third-party services like Google AdSense may use cookies to serve relevant ads based on your visit.
        </p>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Your Choices</h2>
        <p className="text-sm text-slate-600">
          You can control cookies in your browser settings. Continued use of the site indicates acceptance of this policy.
        </p>
      </Card>
    </div>
  );
}
