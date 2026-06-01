import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function AdminLogin() {
  const { signIn, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      navigate('/admin/events', { replace: true });
    }
  }, [token, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn(formState);
      const destination = location.state?.from?.pathname || '/admin/events';
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] bg-lasa-50 py-20">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-lasa-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-lasa-600">Admin Login</h1>
        <p className="mt-2 text-sm text-lasa-500">
          Sign in with your admin credentials to manage events.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-lasa-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-lasa-200 px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-lasa-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-lasa-200 px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-lasa-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-lasa-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </section>
  );
}
