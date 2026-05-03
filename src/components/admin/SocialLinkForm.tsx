import { useState, type FormEvent } from 'react';
import type { AdminSocialLink } from '../../types';
import { useCreateSocialLink, useUpdateSocialLink } from '../../hooks/useSocialLinks';
import Button from '../ui/Button';
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandWhatsapp,
  IconBrandTiktok,
  IconBrandYoutube,
  IconBrandX,
  IconBrandPinterest,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandSpotify,
  IconBrandGithub,
  IconBrandTwitter,
  IconLink,
  type TablerIconsProps,
} from '@tabler/icons-react';

const iconOptions = [
  { value: 'IconBrandInstagram', label: 'Instagram', Icon: IconBrandInstagram },
  { value: 'IconBrandFacebook', label: 'Facebook', Icon: IconBrandFacebook },
  { value: 'IconBrandWhatsapp', label: 'WhatsApp', Icon: IconBrandWhatsapp },
  { value: 'IconBrandTiktok', label: 'TikTok', Icon: IconBrandTiktok },
  { value: 'IconBrandYoutube', label: 'YouTube', Icon: IconBrandYoutube },
  { value: 'IconBrandX', label: 'X', Icon: IconBrandX },
  { value: 'IconBrandTwitter', label: 'Twitter', Icon: IconBrandTwitter },
  { value: 'IconBrandPinterest', label: 'Pinterest', Icon: IconBrandPinterest },
  { value: 'IconBrandLinkedin', label: 'LinkedIn', Icon: IconBrandLinkedin },
  { value: 'IconBrandTelegram', label: 'Telegram', Icon: IconBrandTelegram },
  { value: 'IconBrandSpotify', label: 'Spotify', Icon: IconBrandSpotify },
  { value: 'IconBrandGithub', label: 'GitHub', Icon: IconBrandGithub },
  { value: 'IconLink', label: 'Enlace genérico', Icon: IconLink },
];

interface SocialLinkFormProps {
  link?: AdminSocialLink | null;
  onClose: () => void;
}

export default function SocialLinkForm({ link, onClose }: SocialLinkFormProps) {
  const isEditing = !!link;
  const [label, setLabel] = useState(link?.label || '');
  const [icon, setIcon] = useState(link?.icon || 'IconBrandInstagram');
  const [url, setUrl] = useState(link?.url || '');
  const [error, setError] = useState('');

  const createMutation = useCreateSocialLink();
  const updateMutation = useUpdateSocialLink();

  const loading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!label.trim()) {
      setError('El nombre es requerido');
      return;
    }

    if (!url.trim()) {
      setError('La URL es requerida');
      return;
    }

    try {
      if (isEditing && link) {
        await updateMutation.mutateAsync({ id: link.id, data: { label: label.trim(), icon, url: url.trim() } });
      } else {
        await createMutation.mutateAsync({ label: label.trim(), icon, url: url.trim() });
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
        <label className="block text-sm font-medium text-slate-700 mb-1">Nombre *</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          maxLength={100}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none text-sm"
          placeholder="Ej: Instagram"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Ícono *</label>
        <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
          {iconOptions.map(({ value, label: iconLabel, Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setIcon(value)}
              className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs transition-colors ${
                icon === value
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon size={20} strokeWidth={1.5} />
              <span className="truncate w-full text-center">{iconLabel}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">URL *</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none text-sm"
          placeholder="https://instagram.com/jandrea"
        />
      </div>

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
