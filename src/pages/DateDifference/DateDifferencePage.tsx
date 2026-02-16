import useStickyState from '../../utils/useStickyState';
import Card from '../../components/Card';
import AdSlot from '../../components/AdSlot';
import { formatNumber } from '../../utils/formatting';

const todayIso = new Date().toISOString().slice(0, 10);

export default function DateDifferencePage() {
  const [startDate, setStartDate] = useStickyState('date-diff-start', todayIso);
  const [endDate, setEndDate] = useStickyState('date-diff-end', todayIso);

  const start = new Date(startDate);
  const end = new Date(endDate);
  const validDates = !isNaN(start.getTime()) && !isNaN(end.getTime());
  const dayMs = 1000 * 60 * 60 * 24;
  const diffMs = validDates ? Math.abs(end.getTime() - start.getTime()) : 0;
  const days = Math.round(diffMs / dayMs);
  const weeks = days / 7;
  const months = days / 30.44;

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Date Difference Calculator</h2>
      <p className="text-slate-600 mb-6">
        Calculate the time difference between two dates.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Dates</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Results</h3>
            <div className="space-y-4 text-center">
              <div>
                <p className="text-sm text-slate-600">Total Days</p>
                <p className="text-4xl font-bold text-blue-600">{formatNumber(days, 0)}</p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-600">Weeks</p>
                <p className="text-2xl font-semibold text-slate-900">{formatNumber(weeks, 2)}</p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-600">Months (approx)</p>
                <p className="text-2xl font-semibold text-slate-900">{formatNumber(months, 2)}</p>
              </div>
            </div>
          </Card>

          <AdSlot />
        </div>
      </div>
    </div>
  );
}
