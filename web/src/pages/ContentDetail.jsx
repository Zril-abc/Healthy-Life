import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getContentById } from '../api/content';
import { getFavorites, addFavorite, removeFavorite } from '../api/favorites';
import CategoryBadge from '../components/CategoryBadge';

const typeLabel = { artikel: 'Artikel', video: 'Video', infografis: 'Infografis' };

const ContentDetail = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteId, setFavoriteId] = useState(null);
  const [busy, setBusy] = useState(false);

  const loadFavoriteStatus = useCallback(async () => {
    try {
      const favorites = await getFavorites();
      const match = favorites.find((f) => f.content?._id === id);
      setFavoriteId(match ? match._id : null);
    } catch {
      setFavoriteId(null);
    }
  }, [id]);

  useEffect(() => {
    setLoading(true);
    getContentById(id).then(setContent).finally(() => setLoading(false));
    loadFavoriteStatus();
  }, [id, loadFavoriteStatus]);

  const toggleFavorite = async () => {
    setBusy(true);
    try {
      if (favoriteId) {
        await removeFavorite(id);
      } else {
        await addFavorite(id);
      }
      await loadFavoriteStatus();
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <p className="max-w-3xl mx-auto px-4 py-12 text-ink-soft text-sm">Memuat konten...</p>;
  }

  if (!content) {
    return <p className="max-w-3xl mx-auto px-4 py-12 text-ink-soft text-sm">Konten tidak ditemukan.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-24 sm:pb-8">
      <Link to="/" className="text-sm text-ink-soft hover:text-brand mb-4 inline-block">← Kembali ke Beranda</Link>

      {content.imageUrl && (
        <img src={content.imageUrl} alt={content.title} className="w-full aspect-16/9 object-cover rounded-2xl mb-6" />
      )}

      <div className="flex items-center gap-2 mb-3">
        <CategoryBadge category={content.category} />
        <span className="text-xs font-semibold text-ink-soft uppercase tracking-wide">{typeLabel[content.type]}</span>
      </div>

      <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-4">{content.title}</h1>

      <p className="text-ink-soft leading-relaxed whitespace-pre-line mb-8">{content.body}</p>

      <button
        onClick={toggleFavorite}
        disabled={busy}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-colors disabled:opacity-60 ${
          favoriteId ? 'bg-brand text-white' : 'bg-brand-light text-brand-dark hover:bg-brand hover:text-white'
        }`}
      >
        {favoriteId ? '★ Tersimpan di Favorit' : '☆ Simpan ke Favorit'}
      </button>
    </div>
  );
};

export default ContentDetail;
