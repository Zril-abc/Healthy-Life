import { useEffect, useState } from 'react';
import { getActivities, addActivity, deleteActivity } from '../api/activities';
import EmptyState from '../components/EmptyState';

const activityTypes = [
  { value: 'air-minum', label: 'Air Minum', icon: '💧', placeholder: 'contoh: 8 gelas' },
  { value: 'olahraga', label: 'Olahraga', icon: '🏃', placeholder: 'contoh: 30 menit' },
  { value: 'tidur', label: 'Tidur', icon: '😴', placeholder: 'contoh: 7 jam' },
  { value: 'mood', label: 'Mood', icon: '🙂', placeholder: 'contoh: Senang' },
  { value: 'berat-badan', label: 'Berat Badan', icon: '⚖️', placeholder: 'contoh: 65 kg' },
];

const meta = (type) => activityTypes.find((t) => t.value === type) || {};

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ type: 'air-minum', value: '', notes: '' });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getActivities().then(setActivities).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.value.trim()) return;
    setSaving(true);
    try {
      await addActivity(form);
      setForm({ ...form, value: '', notes: '' });
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteActivity(id);
    load();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-24 sm:pb-8">
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Catatan Aktivitas</h1>
      <p className="text-sm text-ink-soft mb-6">Catat aktivitas kesehatan harianmu secara rutin.</p>

      <form onSubmit={handleSubmit} className="bg-surface border border-line rounded-2xl p-5 mb-8 flex flex-col gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {activityTypes.map((t) => (
            <button
              type="button"
              key={t.value}
              onClick={() => setForm({ ...form, type: t.value })}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium border transition-colors ${
                form.type === t.value
                  ? 'bg-brand text-white border-brand'
                  : 'bg-page text-ink-soft border-line hover:border-brand'
              }`}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            placeholder={meta(form.type).placeholder}
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
            className="flex-1 border border-line rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-light"
          />
          <input
            type="text"
            placeholder="Catatan (opsional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="flex-1 border border-line rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-light"
          />
          <button
            type="submit"
            disabled={saving}
            className="bg-brand text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-brand-dark transition-colors disabled:opacity-60 shrink-0"
          >
            {saving ? 'Menyimpan...' : 'Catat'}
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-ink-soft text-sm">Memuat...</p>
      ) : activities.length === 0 ? (
        <EmptyState title="Belum ada catatan" description="Mulai catat aktivitas kesehatan harianmu di form atas." />
      ) : (
        <ul className="flex flex-col gap-2">
          {activities.map((a) => (
            <li key={a._id} className="flex items-center justify-between gap-3 bg-surface border border-line rounded-xl px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl shrink-0">{meta(a.type).icon}</span>
                <div className="min-w-0">
                  <p className="font-medium text-ink text-sm truncate">
                    {meta(a.type).label}: {a.value}
                  </p>
                  <p className="text-xs text-ink-soft truncate">
                    {new Date(a.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {a.notes ? ` · ${a.notes}` : ''}
                  </p>
                </div>
              </div>
              <button onClick={() => handleDelete(a._id)} className="text-xs text-ink-soft hover:text-red-600 shrink-0">
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Activities;
