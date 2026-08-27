import { useEffect, useState } from 'react';
import { Navbar } from './components/organisms/Navbar';
import { Footer } from './components/organisms/Footer';
import { HomeRelaunch } from './pages/HomeRelaunch';
import { AmazonHub } from './pages/AmazonHub';
import { ContentPage } from './pages/ContentPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { DiagnosticPage } from './pages/DiagnosticPage';
import { AdminConsole } from './pages/AdminConsole';
import { pageContent } from './content/siteContent';
import { ThemeProvider } from './context/ThemeContext';

function normalizePath(pathname: string) {
  return pathname
    .replace(/^\/OPEXNINJA(?=\/|$)/, '')
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase();
}

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const path = typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '';

  if (path === 'amazon') return <AmazonHub />;

  const page = path ? pageContent[path] : undefined;
  let content = <HomeRelaunch />;
  if (path === 'resources') content = <ResourcesPage />;
  else if (path === 'assessment') content = <DiagnosticPage />;
  else if (path === 'admin') content = <AdminConsole />;
  else if (page) content = <ContentPage {...page} />;

  return (
    <ThemeProvider value={{ isDark, setIsDark }}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        {path !== 'admin' && <Navbar />}
        <main>{content}</main>
        {path !== 'admin' && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;
