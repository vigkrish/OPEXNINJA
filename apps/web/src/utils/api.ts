import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://opexninja-api.onrender.com/api';

const SUPABASE_URL = 'https://gibwltoooekmqckpoghu.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_y3QKGkpDoBytRtDcpojzTQ_K2Ow3y6M';
const CONTACT_NOTIFICATION_EMAIL = 'contactus.opexninja@gmail.com';

type ContactPayload = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject?: string | null;
  message: string;
};

function isContactSubmission(config: { method?: string; url?: string } | undefined) {
  return config?.method?.toLowerCase() === 'post' && config?.url === '/contact';
}

function parsePayload(data: unknown): ContactPayload {
  if (typeof data === 'string') return JSON.parse(data) as ContactPayload;
  return data as ContactPayload;
}

async function notifyByEmail(payload: ContactPayload) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_NOTIFICATION_EMAIL)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone || 'Not provided',
        company: payload.company || 'Not provided',
        service: payload.subject || 'Website enquiry',
        message: payload.message,
        _subject: `New OPEX Ninja enquiry: ${payload.subject || 'Website enquiry'}`,
        _template: 'table',
        _replyto: payload.email,
        _url: window.location.href,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Email notification failed with ${response.status}`);
  }
}

async function persistToSupabase(payload: ContactPayload) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_PUBLISHABLE_KEY,
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
}

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
  async (response) => {
    if (isContactSubmission(response.config)) {
      const payload = parsePayload(response.config.data);
      try {
        await notifyByEmail(payload);
      } catch (notificationError) {
        console.warn('Contact saved, but email notification failed.', notificationError);
      }
    }
    return response;
  },
  async (error) => {
    const config = error.config;

    if (!isContactSubmission(config)) {
      return Promise.reject(error);
    }

    try {
      const payload = parsePayload(config.data);
      await persistToSupabase(payload);

      try {
        await notifyByEmail(payload);
      } catch (notificationError) {
        console.warn('Contact saved, but email notification failed.', notificationError);
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
