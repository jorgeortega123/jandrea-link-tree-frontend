import { FileText, Link, ChevronRight } from 'lucide-react';
import type { PublicEntry } from '../../types';

interface EntryCardProps {
  entry: PublicEntry;
}

export default function EntryCard({ entry }: EntryCardProps) {
  const href =
    entry.type === 'catalog' && entry.r2_key
      ? `/api/catalogs/${entry.r2_key}`
      : entry.url || '#';

  const isExternal = entry.type === 'link';

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-4 w-full rounded-xl border border-slate-200 bg-white px-5 py-4 transition-all hover:border-slate-300 hover:shadow-md"
    >
      {/* Icono */}
      <div className="shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
        {entry.type === 'catalog' ? (
          <FileText size={18} className="text-slate-500" strokeWidth={1.7} />
        ) : (
          <Link size={18} className="text-slate-500" strokeWidth={1.7} />
        )}
      </div>

      {/* Texto */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-slate-800 group-hover:text-slate-900 truncate">
          {entry.title}
        </h3>
        {entry.description && (
          <p className="text-sm text-slate-500 mt-0.5 truncate">{entry.description}</p>
        )}
      </div>

      {/* Flecha */}
      <ChevronRight
        size={16}
        className="shrink-0 text-slate-400 group-hover:text-slate-600 transition-colors"
        strokeWidth={2}
      />
    </a>
  );
}
