import { IconBrandInstagram, IconBrandFacebook, IconBrandWhatsapp } from '@tabler/icons-react';

const socialLinks = [
  { icon: IconBrandInstagram, href: 'https://instagram.com/jandrea', label: 'Instagram' },
  { icon: IconBrandFacebook,  href: 'https://facebook.com/jandrea',  label: 'Facebook' },
  { icon: IconBrandWhatsapp,  href: 'https://wa.me/593000000000',    label: 'WhatsApp' },
];

const roles = ['Corte láser', 'Impresión 3D', 'Artículos personalizados', 'Diseño a medida'];

export default function ProfileHeader() {
  return (
    <header className="flex flex-col items-center pt-6 pb-8 px-4">
      {/* Nombre */}
      <h1 className="text-3xl font-bold tracking-widest  text-slate-800">
        Jandrea
      </h1>

      {/* Roles */}
      <p className="mt-2 text-sm text-center text-slate-400 tracking-wide">
        {roles.map((r, i) => (
          <span key={r}>
            {i > 0 && <span className="text-slate-300 mx-1">|</span>}
            {r}
          </span>
        ))}
      </p>

      {/* Iconos sociales */}
      <div className="flex gap-4 mt-6">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 shadow-sm transition-all hover:text-slate-800 hover:border-slate-400 hover:scale-110"
          >
            <Icon size={20} strokeWidth={1.5} />
          </a>
        ))}
      </div>

      {/* Badge inferior */}
      {/* <div className="mt-6 px-5 py-1.5 rounded-full text-xs tracking-widest text-slate-400 uppercase border border-slate-200 bg-white/70">
        Catálogos &amp; Colecciones
      </div> */}
    </header>
  );
}
