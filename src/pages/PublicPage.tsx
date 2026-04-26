import { Helmet } from 'react-helmet-async';
import ProfileHeader from '../components/public/ProfileHeader';
import EntryList from '../components/public/EntryList';
import Footer from '../components/public/Footer';

export default function PublicPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Jandrea',
    description: 'Catálogos y enlaces de Jandrea',
    url: window.location.origin,
  };

  return (
    <>
      <Helmet>
        <title>Jandrea - Catálogos y Enlaces</title>
        <meta name="description" content="Explora los catálogos y enlaces de Jandrea. Encuentra nuestras últimas colecciones y formas de contacto." />
      </Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      <main className="min-h-screen bg-white">
        {/* Solo la imagen sobre fondo coral con ondas */}
        <div className="relative overflow-hidden" style={{ backgroundColor: '#FE7466' }}>
          <div
            className="pointer-events-none absolute inset-[-50%] z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='70'%3E%3Cpath d='M0,35 C23,10 47,60 70,35 C93,10 117,60 140,35' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3C/svg%3E")`,
              backgroundSize: '140px 70px',
              transform: 'rotate(15deg)',
            }}
          />
          <div className="relative z-10 flex justify-center py-10">
            <img
              src="https://api.jandrea.art/images/image/9235cdb8-2f63-4166-a055-e841475c5406"
              alt="Jandrea"
              className="w-auto h-32 object-contain"
            />
          </div>
        </div>

        {/* Nombre, roles, iconos sobre fondo blanco */}
        <ProfileHeader />
        <EntryList />
        <Footer />
      </main>
    </>
  );
}
