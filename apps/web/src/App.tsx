import { useEffect, useState } from 'react';
import { Navbar } from './components/organisms/Navbar';
import { Footer } from './components/organisms/Footer';
import { Home } from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark' || 
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <ThemeProvider value={{ isDark, setIsDark }}>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
        <Navbar />
        <main className="flex-1">
          <Home />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
