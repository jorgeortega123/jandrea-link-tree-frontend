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
} from '@tabler/icons-react';
import type { SocialLink } from '../../types';
import { usePublicSocialLinks } from '../../hooks/useSocialLinks';

type IconComponent = React.ComponentType<{ size?: number | string; strokeWidth?: number }>;

const iconMap: Record<string, IconComponent> = {
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

const roles = ['Corte láser', 'Impresión 3D', 'Artículos personalizados', 'Diseño a medida'];

function SocialIcon({ name, ...props }: { name: string; size?: number | string; strokeWidth?: number }) {
  const Icon = iconMap[name] || IconLink;
  return <Icon {...props} />;
}

export default function ProfileHeader() {
  const { data: socialLinks, isLoading } = usePublicSocialLinks();

  return (
    <header className="flex flex-col items-center pt-6 pb-8 px-4">
      <h1 className="text-3xl font-bold tracking-widest  text-slate-800">
        Jandrea
      </h1>

      <p className="mt-2 text-sm text-center text-slate-400 tracking-wide">
        {roles.map((r, i) => (
          <span key={r}>
            {i > 0 && <span className="text-slate-300 mx-1">|</span>}
            {r}
          </span>
        ))}
      </p>

      {isLoading ? (
        <div className="flex gap-4 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-11 h-11 rounded-full bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : socialLinks && socialLinks.length > 0 ? (
        <div className="flex gap-4 mt-6">
          {socialLinks.map((link: SocialLink) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 shadow-sm transition-all hover:text-slate-800 hover:border-slate-400 hover:scale-110"
            >
              <SocialIcon name={link.icon} size={20} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
