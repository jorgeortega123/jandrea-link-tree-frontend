import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAdminEntries } from '../../hooks/useEntries';
import { useAdminSocialLinks, useReorderSocialLinks } from '../../hooks/useSocialLinks';
import type { AdminEntry, AdminSocialLink } from '../../types';
import EntryListItem from './EntryListItem';
import EntryForm from './EntryForm';
import SocialLinkListItem from './SocialLinkListItem';
import SocialLinkForm from './SocialLinkForm';
import ReorderList from './ReorderList';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

type Tab = 'entries' | 'social';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { data: entries, isLoading: entriesLoading } = useAdminEntries();
  const { data: socialLinks, isLoading: socialLoading } = useAdminSocialLinks();
  const reorderSocialMutation = useReorderSocialLinks();
  const [activeTab, setActiveTab] = useState<Tab>('entries');

  // Entries state
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<AdminEntry | null>(null);

  // Social links state
  const [showSocialForm, setShowSocialForm] = useState(false);
  const [editingSocialLink, setEditingSocialLink] = useState<AdminSocialLink | null>(null);

  const handleEditEntry = (entry: AdminEntry) => {
    setEditingEntry(entry);
    setShowEntryForm(true);
  };

  const handleCloseEntryForm = () => {
    setShowEntryForm(false);
    setEditingEntry(null);
  };

  const handleEditSocialLink = (link: AdminSocialLink) => {
    setEditingSocialLink(link);
    setShowSocialForm(true);
  };

  const handleCloseSocialForm = () => {
    setShowSocialForm(false);
    setEditingSocialLink(null);
  };

  const handleSocialReorder = (orders: { id: number; sort_order: number }[]) => {
    reorderSocialMutation.mutate(orders);
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
              {socialLinks ? ` · ${socialLinks.length} redes` : ''}
            </p>
          </div>
          <div className="flex gap-2">
            {activeTab === 'entries' ? (
              <Button onClick={() => setShowEntryForm(true)} className="text-xs">
                + Nuevo
              </Button>
            ) : (
              <Button onClick={() => setShowSocialForm(true)} className="text-xs">
                + Red social
              </Button>
            )}
            <Button variant="secondary" onClick={logout} className="text-xs">
              Salir
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-3xl mx-auto px-4 flex gap-1">
          <button
            onClick={() => setActiveTab('entries')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'entries'
                ? 'border-slate-800 text-slate-800'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Entradas
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'social'
                ? 'border-slate-800 text-slate-800'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Redes sociales
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {activeTab === 'entries' ? (
          entriesLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[60px] rounded-xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : !entries || entries.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-400 mb-4">No hay entradas aún</p>
              <Button onClick={() => setShowEntryForm(true)}>Crear primera entrada</Button>
            </div>
          ) : (
            <ReorderList entries={entries}>
              {entries.map((entry) => (
                <EntryListItem key={entry.id} entry={entry} onEdit={handleEditEntry} />
              ))}
            </ReorderList>
          )
        ) : (
          socialLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[60px] rounded-xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : !socialLinks || socialLinks.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-400 mb-4">No hay redes sociales aún</p>
              <Button onClick={() => setShowSocialForm(true)}>Agregar primera red</Button>
            </div>
          ) : (
            <ReorderList entries={socialLinks} onReorder={handleSocialReorder}>
              {socialLinks.map((link) => (
                <SocialLinkListItem key={link.id} link={link} onEdit={handleEditSocialLink} />
              ))}
            </ReorderList>
          )
        )}
      </main>

      {/* Entry Form Modal */}
      <Modal
        open={showEntryForm}
        onClose={handleCloseEntryForm}
        title={editingEntry ? 'Editar entrada' : 'Nueva entrada'}
      >
        <EntryForm entry={editingEntry} onClose={handleCloseEntryForm} />
      </Modal>

      {/* Social Link Form Modal */}
      <Modal
        open={showSocialForm}
        onClose={handleCloseSocialForm}
        title={editingSocialLink ? 'Editar red social' : 'Nueva red social'}
      >
        <SocialLinkForm link={editingSocialLink} onClose={handleCloseSocialForm} />
      </Modal>
    </div>
  );
}
