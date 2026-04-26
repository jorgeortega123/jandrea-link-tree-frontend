import type { PublicEntry } from '../../types';

interface CatalogCardProps {
  entry: PublicEntry;
}

export default function CatalogCard({ entry }: CatalogCardProps) {
  const href = entry.r2_key ? `/catalogo/${entry.r2_key}` : '#';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 w-full rounded-xl border border-slate-200 bg-white px-5 py-4 transition-all hover:border-slate-300 hover:shadow-md"
    >
      <div className="shrink-0 w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-slate-800 group-hover:text-slate-900 truncate">
          {entry.title}
        </h3>
        {entry.description && (
          <p className="text-sm text-slate-500 mt-0.5 truncate">{entry.description}</p>
        )}
      </div>
      <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}
