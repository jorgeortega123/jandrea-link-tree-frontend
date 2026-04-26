import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAdminEntries } from '../../hooks/useEntries';
import type { AdminEntry } from '../../types';
import EntryListItem from './EntryListItem';
import EntryForm from './EntryForm';
import ReorderList from './ReorderList';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { data: entries, isLoading } = useAdminEntries();
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<AdminEntry | null>(null);

  const handleEdit = (entry: AdminEntry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEntry(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">Admin Jandrea</h1>
            <p className="text-xs text-slate-500">
              {entries ? `${entries.length} entradas` : 'Cargando...'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowForm(true)} className="text-xs">
              + Nuevo
            </Button>
            <Button variant="secondary" onClick={logout} className="text-xs">
              Salir
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[60px] rounded-xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : !entries || entries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 mb-4">No hay entradas aún</p>
            <Button onClick={() => setShowForm(true)}>Crear primera entrada</Button>
          </div>
        ) : (
          <ReorderList entries={entries}>
            {entries.map((entry) => (
              <EntryListItem key={entry.id} entry={entry} onEdit={handleEdit} />
            ))}
          </ReorderList>
        )}
      </main>

      {/* Form Modal */}
      <Modal
        open={showForm}
        onClose={handleCloseForm}
        title={editingEntry ? 'Editar entrada' : 'Nueva entrada'}
      >
        <EntryForm entry={editingEntry} onClose={handleCloseForm} />
      </Modal>
    </div>
  );
}
