import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchAdminProfile, loginAdmin } from '../api/auth';

const AuthContext = createContext(null);
const TOKEN_KEY = 'lasa_admin_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      if (!token) {
        setLoading(false);
        setAdmin(null);
        return;
      }

      try {
        setLoading(true);
        const profile = await fetchAdminProfile(token);
        if (isMounted) {
          setAdmin(profile?.admin || profile);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setAdmin(null);
          setError(err?.message || 'Unable to validate session');
          setToken(null);
          localStorage.removeItem(TOKEN_KEY);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      isMounted = false;
    };
  }, [token]);

  const signIn = async (credentials) => {
    const result = await loginAdmin(credentials);
    const newToken = result?.token;
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
    }
    setAdmin(result?.admin || null);
    setError(null);
    return result;
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setAdmin(null);
  };

  const value = useMemo(
    () => ({
      token,
      admin,
      loading,
      error,
      signIn,
      signOut,
    }),
    [token, admin, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
