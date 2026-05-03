import type { AdminSocialLink } from '../../types';
import { useDeleteSocialLink } from '../../hooks/useSocialLinks';
import Button from '../ui/Button';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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

const iconMap: Record<string, React.FC<TablerIconsProps>> = {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandWhatsapp,
  IconBrandTiktok,
  IconBrandYoutube,
  IconBrandX,
  IconBrandTwitter,
  IconBrandPinterest,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandSpotify,
  IconBrandGithub,
};

interface SocialLinkListItemProps {
  link: AdminSocialLink;
  onEdit: (link: AdminSocialLink) => void;
}

export default function SocialLinkListItem({ link, onEdit }: SocialLinkListItemProps) {
  const deleteMutation = useDeleteSocialLink();
  const Icon = iconMap[link.icon] || IconLink;

  const handleDelete = async () => {
    if (confirm(`¿Eliminar "${link.label}"?`)) {
      await deleteMutation.mutateAsync(link.id);
    }
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

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

      {/* Icon preview */}
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
        <Icon size={18} strokeWidth={1.5} className="text-slate-600" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-slate-800 text-sm truncate">{link.label}</h3>
        <p className="text-xs text-slate-400 truncate">{link.url}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-1 flex-shrink-0">
        <Button variant="secondary" className="!px-3 !py-1.5 text-xs" onClick={() => onEdit(link)}>
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
