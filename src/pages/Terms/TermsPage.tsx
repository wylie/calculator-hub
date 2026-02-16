import Card from '../../components/Card';

export default function TermsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Use</h1>
        <p className="text-slate-600">
          By using this site, you agree to these terms.
        </p>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Use of Calculators</h2>
        <p className="text-sm text-slate-600">
          Results are estimates for informational purposes only and should not be considered professional advice.
        </p>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Limitation of Liability</h2>
        <p className="text-sm text-slate-600">
          We are not liable for decisions made based on calculator outputs. Verify any decisions with qualified professionals.
        </p>
      </Card>
    </div>
  );
}
