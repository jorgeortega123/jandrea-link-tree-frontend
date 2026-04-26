import type { AdminEntry } from '../../types';
import { useDeleteEntry } from '../../hooks/useEntries';
import Button from '../ui/Button';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface EntryListItemProps {
  entry: AdminEntry;
  onEdit: (entry: AdminEntry) => void;
}

export default function EntryListItem({ entry, onEdit }: EntryListItemProps) {
  const deleteMutation = useDeleteEntry();

  const handleDelete = async () => {
    if (confirm(`¿Eliminar "${entry.title}"?`)) {
      await deleteMutation.mutateAsync(entry.id);
    }
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: entry.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 py-3"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 p-1"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 10.001 4.001A2 2 0 007 2zm0 6a2 2 0 10.001 4.001A2 2 0 007 8zm0 6a2 2 0 10.001 4.001A2 2 0 007 14zm6-8a2 2 0 10-.001-4.001A2 2 0 0013 6zm0 2a2 2 0 10.001 4.001A2 2 0 0013 8zm0 6a2 2 0 10.001 4.001A2 2 0 0013 14z" />
        </svg>
      </button>

      {/* Icon */}
      {entry.type === 'catalog' ? (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
          <span className="text-white font-bold text-[12px] tracking-tight">PDF</span>
        </div>
      ) : (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-slate-800 text-sm truncate">{entry.title}</h3>
        <p className="text-xs text-slate-400 truncate">
          {entry.type === 'catalog' ? entry.file_name || 'Catálogo' : entry.url}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-1 flex-shrink-0">
        <Button variant="secondary" className="!px-3 !py-1.5 text-xs" onClick={() => onEdit(entry)}>
          Editar
        </Button>
        <Button
          variant="danger"
          className="!px-3 !py-1.5 text-xs"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? '...' : 'Eliminar'}
        </Button>
      </div>
    </div>
  );
}
