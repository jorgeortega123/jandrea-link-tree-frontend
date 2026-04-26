import { usePublicEntries } from '../../hooks/useEntries';
import EntryCard from './EntryCard';

export default function EntryList() {
  const { data: entries, isLoading, error } = usePublicEntries();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 w-full max-w-lg mx-auto px-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[72px] rounded-xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-slate-500 py-8">
        Error al cargar los catálogos. Intenta de nuevo más tarde.
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="text-center text-slate-400 py-12">
        No hay catálogos disponibles aún.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-lg mx-auto px-4">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
