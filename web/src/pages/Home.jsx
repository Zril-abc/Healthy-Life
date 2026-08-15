import { useEffect, useState } from 'react';
import { getAllContent } from '../api/content';
import ContentCard from '../components/ContentCard';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';

const categories = [
  { value: '', label: 'Semua' },
  { value: 'gizi', label: 'Gizi Seimbang' },
  { value: 'olahraga', label: 'Olahraga' },
  { value: 'kesehatan-mental', label: 'Kesehatan Mental' },
  { value: 'pencegahan-penyakit', label: 'Pencegahan Penyakit' },
];

const Home = () => {
  const { user } = useAuth();
  const [content, setContent] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllContent({ category: category || undefined, search: search || undefined })
      .then(setContent)
      .finally(() => setLoading(false));
  }, [category, search]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24 sm:pb-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-brand mb-1">Halo, {user?.name?.split(' ')[0]} 👋</p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">Yuk, mulai hidup lebih sehat hari ini</h1>
      </div>

      <input
        type="text"
        placeholder="Cari artikel, video, infografis..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-line bg-surface rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-light mb-6"
      />

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              category === c.value
                ? 'bg-brand text-white border-brand'
                : 'bg-surface text-ink-soft border-line hover:border-brand'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-ink-soft text-sm">Memuat konten...</p>
      ) : content.length === 0 ? (
        <EmptyState title="Belum ada konten" description="Coba kategori lain atau kata kunci yang berbeda." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.map((item) => (
            <ContentCard key={item._id} content={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
