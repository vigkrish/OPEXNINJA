import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://opexninja-api.onrender.com/api';

const SUPABASE_URL = 'https://gibwltoooekmqckpoghu.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_y3QKGkpDoBytRtDcpojzTQ_K2Ow3y6M';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    const isContactSubmission =
      config?.method?.toLowerCase() === 'post' && config?.url === '/contact';

    if (!isContactSubmission) {
      return Promise.reject(error);
    }

    try {
      const payload = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
      const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone || null,
          company: payload.company || null,
          subject: payload.subject || null,
          message: payload.message,
          status: 'new',
          source: 'website',
        }),
      });

      if (!response.ok) {
        throw new Error(`Supabase contact fallback failed with ${response.status}`);
      }

      return {
        data: { success: true, fallback: 'supabase' },
        status: 201,
        statusText: 'Created',
        headers: {},
        config,
      };
    } catch (fallbackError) {
      return Promise.reject(fallbackError);
    }
  }
);
