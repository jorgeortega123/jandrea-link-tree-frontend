import { Helmet } from 'react-helmet-async';
import ProfileHeader from '../components/public/ProfileHeader';
import CatalogCard from '../components/public/CatalogCard';
import Footer from '../components/public/Footer';
import { usePublicEntries } from '../hooks/useEntries';

export default function CatalogosPage() {
  const { data: entries, isLoading, error } = usePublicEntries();
  const catalogs = entries?.filter((e) => e.type === 'catalog') ?? [];

  return (
    <>
      <Helmet>
        <title>Jandrea - Catálogos</title>
        <meta name="description" content="Explora nuestros catálogos en PDF." />
      </Helmet>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <ProfileHeader />
        <div className="max-w-lg mx-auto px-4 pb-4">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Catálogos</h2>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-3 w-full max-w-lg mx-auto px-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[72px] rounded-xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-slate-500 py-8">
            Error al cargar los catálogos. Intenta de nuevo más tarde.
          </div>
        ) : catalogs.length === 0 ? (
          <div className="text-center text-slate-400 py-12">
            No hay catálogos disponibles aún.
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full max-w-lg mx-auto px-4">
            {catalogs.map((entry) => (
              <CatalogCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}

        <Footer />
      </main>
    </>
  );
}
