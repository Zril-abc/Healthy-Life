import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites } from '../api/favorites';
import ContentCard from '../components/ContentCard';
import EmptyState from '../components/EmptyState';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavorites().then(setFavorites).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24 sm:pb-8">
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Konten Favorit</h1>
      <p className="text-sm text-ink-soft mb-6">Artikel, video, dan infografis yang sudah kamu simpan.</p>

      {loading ? (
        <p className="text-ink-soft text-sm">Memuat...</p>
      ) : favorites.length === 0 ? (
        <EmptyState
          title="Belum ada favorit"
          description="Simpan artikel, video, atau infografis yang menarik supaya mudah ditemukan lagi nanti."
          action={<Link to="/" className="mt-2 bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-dark transition-colors">Jelajahi Konten</Link>}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favorites.filter((f) => f.content).map((f) => (
            <ContentCard key={f._id} content={f.content} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
