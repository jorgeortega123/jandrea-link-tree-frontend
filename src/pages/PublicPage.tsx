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
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <ProfileHeader />
        <EntryList />
        <Footer />
      </main>
    </>
  );
}
