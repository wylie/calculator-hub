interface AffiliateBoxProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  iconName?: string;
}

export default function AffiliateBox({
  title,
  description,
  buttonText,
  href,
  iconName = 'shopping_cart',
}: AffiliateBoxProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-blue-50 p-6 my-6">
      <div className="flex items-start gap-4">
        {iconName && (
          <span className="material-symbols-outlined text-xl text-blue-600 flex-shrink-0 mt-1">
            {iconName}
          </span>
        )}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">{title}</h3>
          <p className="text-xs text-slate-600 mb-4">{description}</p>
          <a
            href={href}
            target="_blank"
            rel="nofollow sponsored"
            className="inline-block text-xs font-medium text-blue-600 hover:text-blue-700 underline"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}
