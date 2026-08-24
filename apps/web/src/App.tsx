import { useEffect, useState } from 'react';
import { Navbar } from './components/organisms/Navbar';
import { Footer } from './components/organisms/Footer';
import { Home } from './pages/Home';
import { AmazonHub } from './pages/AmazonHub';
import { ThemeProvider } from './context/ThemeContext';

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

  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  if (path === '/OPEXNINJA/amazon' || path === '/OPEXNINJA/amazon/' || path === '/amazon' || path === '/amazon/') {
    return <AmazonHub />;
  }

  return (
    <ThemeProvider value={{ isDark, setIsDark }}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Navbar />
        <main>
          <Home />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
