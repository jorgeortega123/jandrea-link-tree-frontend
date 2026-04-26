import { useState, type FormEvent } from 'react';
import type { AdminEntry, EntryType } from '../../types';
import { useCreateEntry, useUpdateEntry } from '../../hooks/useEntries';
import Button from '../ui/Button';

interface EntryFormProps {
  entry?: AdminEntry | null;
  onClose: () => void;
}

export default function EntryForm({ entry, onClose }: EntryFormProps) {
  const isEditing = !!entry;
  const [title, setTitle] = useState(entry?.title || '');
  const [description, setDescription] = useState(entry?.description || '');
  const [type, setType] = useState<EntryType>(entry?.type || 'link');
  const [url, setUrl] = useState(entry?.url || '');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const createMutation = useCreateEntry();
  const updateMutation = useUpdateEntry();

  const loading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('El título es requerido');
      return;
    }

    if (type === 'link' && !url.trim()) {
      setError('La URL es requerida para tipo link');
      return;
    }

    if (type === 'catalog' && !isEditing && !file) {
      setError('El archivo PDF es requerido');
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('type', type);
    if (type === 'link') formData.append('url', url.trim());
    if (file) formData.append('file', file);

    try {
      if (isEditing && entry) {
        await updateMutation.mutateAsync({ id: entry.id, formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setType('link')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              type === 'link'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Link
          </button>
          <button
            type="button"
            onClick={() => setType('catalog')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              type === 'catalog'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Catálogo PDF
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Título *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none text-sm"
          placeholder="Nombre del catálogo o link"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          rows={2}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none text-sm resize-none"
          placeholder="Descripción opcional"
        />
      </div>

      {type === 'link' && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">URL *</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none text-sm"
            placeholder="https://ejemplo.com"
          />
        </div>
      )}

      {type === 'catalog' && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Archivo PDF {isEditing ? '(dejar vacío para mantener actual)' : '*'}
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
          />
          {isEditing && entry.file_name && (
            <p className="text-xs text-slate-400 mt-1">Actual: {entry.file_name}</p>
          )}
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear'}
        </Button>
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
