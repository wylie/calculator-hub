import affiliateLinks from '../data/affiliateLinks.json';

interface AffiliateBoxProps {
  pageUrl?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
  iconName?: string;
}

function normalizePath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed) return '';
  if (trimmed === '/') return '/';
  return trimmed.replace(/\/+$/, '');
}

export default function AffiliateBox({
  pageUrl,
  title,
  description,
  buttonText,
  href,
  iconName = 'shopping_cart',
}: AffiliateBoxProps) {
  const resolvedPageUrl = normalizePath(pageUrl ?? (typeof window !== 'undefined' ? window.location.pathname : ''));

  const lookup = resolvedPageUrl ? (affiliateLinks as Record<string, {
    title?: string;
    description?: string;
    buttonText?: string;
    href?: string;
    iconName?: string;
  }>)[resolvedPageUrl] : undefined;

  const resolvedTitle = lookup?.title ?? title;
  const resolvedDescription = lookup?.description ?? description;
  const resolvedButtonText = lookup?.buttonText ?? buttonText;
  const resolvedHref = lookup?.href ?? href;
  const resolvedIconName = lookup?.iconName ?? iconName;

  if (!resolvedTitle || !resolvedDescription || !resolvedButtonText || !resolvedHref) {
    return null;
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-blue-50 p-6 my-6">
      <div className="flex items-start gap-4">
        {resolvedIconName && (
          <span className="material-symbols-outlined text-xl text-blue-600 flex-shrink-0 mt-1">
            {resolvedIconName}
          </span>
        )}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">{resolvedTitle}</h3>
          <p className="text-xs text-slate-600 mb-4">{resolvedDescription}</p>
          <a
            href={resolvedHref}
            target="_blank"
            rel="nofollow sponsored"
            className="inline-block text-xs font-medium text-blue-600 hover:text-blue-700 underline"
          >
            {resolvedButtonText}
          </a>
        </div>
      </div>
    </div>
  );
}
