import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mendaftar, coba lagi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-surface border border-line rounded-3xl p-8 shadow-sm">
        <span className="inline-flex w-10 h-10 rounded-full bg-brand-light items-center justify-center text-brand font-display font-bold mb-4">+</span>
        <h1 className="font-display text-2xl font-bold text-ink mb-1">Buat akun baru</h1>
        <p className="text-sm text-ink-soft mb-6">Mulai perjalanan hidup sehatmu bersama Healthy Life.</p>

        {error && (
          <div className="mb-4 text-sm bg-red-50 text-red-600 px-3 py-2 rounded-lg">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-ink">Nama Lengkap</span>
            <input
              name="name" type="text" required value={form.name} onChange={handleChange}
              placeholder="Nama kamu"
              className="border border-line rounded-xl px-4 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand-light"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-ink">Email</span>
            <input
              name="email" type="email" required value={form.email} onChange={handleChange}
              placeholder="nama@email.com"
              className="border border-line rounded-xl px-4 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand-light"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-ink">Password</span>
            <input
              name="password" type="password" required minLength={6} value={form.password} onChange={handleChange}
              placeholder="Minimal 6 karakter"
              className="border border-line rounded-xl px-4 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand-light"
            />
          </label>
          <button
            type="submit" disabled={loading}
            className="mt-2 bg-brand text-white font-semibold rounded-xl py-2.5 hover:bg-brand-dark transition-colors disabled:opacity-60"
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <p className="text-sm text-ink-soft mt-6 text-center">
          Sudah punya akun? <Link to="/login" className="text-brand font-semibold hover:underline">Masuk</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
