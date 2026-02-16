import Card from '../../components/Card';

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Contact</h1>
        <p className="text-slate-600">
          Questions or feedback? We would love to hear from you.
        </p>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Email</h2>
        <p className="text-sm text-slate-600">
          Reach us at:{' '}
          <a
            href="mailto:hello@simplecalculators.io"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            hello@simplecalculators.io
          </a>
        </p>
      </Card>
    </div>
  );
}
