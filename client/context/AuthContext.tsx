
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/apiClient';

interface AdminProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  status: string;
}

interface UserInfo {
  id: string;
  email: string;
  full_name?: string;
}

interface AuthContextType {
  user: UserInfo | null;
  profile: AdminProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, check if we have a valid stored token
    auth.getSession().then((session) => {
      if (session) {
        setUser(session.user);
        setProfile(session.profile);
      } else {
        setUser(null);
        setProfile(null);
      }
    }).finally(() => setLoading(false));
  }, []);

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
