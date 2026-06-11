// ============================================================
// MySQL API Client — replaces supabaseClient.ts
// All calls go to our Node.js/Express backend at localhost:4000
// ============================================================

// Fall back to the live API if VITE_API_BASE wasn't inlined at build time
// (e.g. building on a server without .env.production). A missing value here
// would otherwise crash the whole app at module load with `undefined.replace`.
const API_BASE = import.meta.env.VITE_API_BASE || 'https://api-travel.globalconnectworldtravel.com//api';

// Strip /api suffix to get the server origin for static files like /uploads/...
const API_ORIGIN = API_BASE.replace(/\/api\/?$/, '');

/**
 * Resolve an image URL — handles relative paths, old localhost URLs, and full URLs.
 */
export const resolveImageUrl = (url: string | undefined | null): string => {
  if (!url) return '';
  // Fix old localhost URLs stored in DB (e.g. http://localhost:4000/uploads/...)
  const localhostMatch = url.match(/^https?:\/\/localhost:\d+(\/uploads\/.+)$/);
  if (localhostMatch) return `${API_ORIGIN}${localhostMatch[1]}`;
  // Cloudinary: inject auto format + auto quality so it serves an optimized
  // webp/avif instead of the full-size original. Idempotent (only matches /upload/v).
  if (url.includes('res.cloudinary.com/')) {
    return url.replace(/\/image\/upload\/v(\d)/, '/image/upload/f_auto,q_auto,c_limit,w_1600/v$1');
  }
  // Already a full URL pointing to production or external — return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  // Relative path like /uploads/file.jpg — prepend API origin
  return `${API_ORIGIN}${url}`;
};

// ---------- Token helpers ----------
export const getToken = (): string | null => localStorage.getItem('auth_token');
export const setToken = (token: string) => localStorage.setItem('auth_token', token);
export const removeToken = () => localStorage.removeItem('auth_token');

const authHeaders = (): Record<string, string> => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ---------- Generic fetch wrapper ----------
async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }

  return res.json() as Promise<T>;
}

// ============================================================
// AUTH
// ============================================================
export const auth = {
  async signInWithPassword(email: string, password: string) {
    const data = await apiFetch<{ token: string; user: any; profile: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    return data;
  },

  async signUp(email: string, password: string, full_name: string) {
    const data = await apiFetch<{ token: string; user: any; profile: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name }),
    });
    setToken(data.token);
    return data;
  },

  async signOut() {
    removeToken();
  },

  async getSession(): Promise<{ user: any; profile: any } | null> {
    const token = getToken();
    if (!token) return null;
    try {
      const data = await apiFetch<{ user: any; profile: any }>('/auth/me');
      return data;
    } catch {
      removeToken();
      return null;
    }
  },
};

// ============================================================
// TOUR PACKAGES
// ============================================================
export const packages = {
  async getAll() {
    return apiFetch<any[]>('/packages');
  },

  async getById(id: string | number) {
    return apiFetch<any>(`/packages/${id}`);
  },

  async create(pkg: any) {
    return apiFetch<any>('/packages', {
      method: 'POST',
      body: JSON.stringify(pkg),
    });
  },

  async update(id: string | number, pkg: any) {
    return apiFetch<any>(`/packages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pkg),
    });
  },

  async delete(id: string | number) {
    return apiFetch<any>(`/packages/${id}`, { method: 'DELETE' });
  },
};

// ============================================================
// ENQUIRIES (travel_details)
// ============================================================
export const enquiries = {
  async getAll() {
    return apiFetch<any[]>('/enquiries');
  },

  async submit(data: {
    full_name: string;
    email: string;
    phone: string;
    travel_origin?: string;
    destination?: string;
    travel_date?: string;
    adults?: string;
    children?: string;
    tentative_budget?: string;
    specific_requirements?: string;
    message?: string;
  }) {
    return apiFetch('/enquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string | number) {
    return apiFetch(`/enquiries/${id}`, { method: 'DELETE' });
  },
};

// ============================================================
// CONTACT DETAILS
// ============================================================
export const contact = {
  async getAll() {
    return apiFetch<any[]>('/contact');
  },

  async submit(data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    message: string;
  }) {
    return apiFetch('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string | number) {
    return apiFetch(`/contact/${id}`, { method: 'DELETE' });
  },
};

// ============================================================
// PACKAGE ENQUIRIES
// ============================================================
export const packageEnquiries = {
  async getAll() {
    return apiFetch<any[]>('/package-enquiries');
  },

  async submit(data: {
    package_id?: string | number;
    package_title?: string;
    name: string;
    email: string;
    phone?: string;
    travel_date?: string;
    num_travelers?: number;
    message?: string;
  }) {
    return apiFetch('/package-enquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string | number) {
    return apiFetch(`/package-enquiries/${id}`, { method: 'DELETE' });
  },
};

// ============================================================
// TRENDING DESTINATIONS
// ============================================================
export const trendingDestinations = {
  async getAll() {
    return apiFetch<any[]>('/trending-destinations');
  },

  async add(image_url: string, name = '', sort_order = 0) {
    return apiFetch<any>('/trending-destinations', {
      method: 'POST',
      body: JSON.stringify({ image_url, name, sort_order }),
    });
  },

  async update(id: string | number, data: { name: string; image_url: string; sort_order?: number }) {
    return apiFetch<any>(`/trending-destinations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string | number) {
    return apiFetch<any>(`/trending-destinations/${id}`, { method: 'DELETE' });
  },
};

// ============================================================
// DREAM DESTINATIONS
// ============================================================
export const dreamDestinations = {
  async getAll() {
    return apiFetch<any[]>('/dream-destinations');
  },

  async add(title: string, image_url: string, link = '', sort_order = 0) {
    return apiFetch<any>('/dream-destinations', {
      method: 'POST',
      body: JSON.stringify({ title, image_url, link, sort_order }),
    });
  },

  async update(id: string | number, data: { title: string; image_url: string; link: string; sort_order?: number }) {
    return apiFetch<any>(`/dream-destinations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string | number) {
    return apiFetch<any>(`/dream-destinations/${id}`, { method: 'DELETE' });
  },
};

// ============================================================
// FILE UPLOAD (replaces Supabase Storage)
// ============================================================
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const token = getToken();
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(err.error || 'Upload failed');
  }

  const data = await res.json();
  return data.publicUrl;
};
