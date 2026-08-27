import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../atoms/Button';
import { useTheme } from '@/context/ThemeContext';

const links = [
  ['About', 'about'],
  ['Services', 'services'],
  ['Problem Solving', 'problem-solving-consultant-india'],
  ['Kaizen', 'kaizen-consultant-india'],
  ['Training', 'root-cause-analysis-training'],
  ['Resources', 'resources'],
];

const siteBase = import.meta.env.BASE_URL;
const toSite = (path = '') => `${siteBase}${path}`;

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isDark, setIsDark } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href={toSite()} className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-sm text-orange-400">ON</span>
          <span className="text-xl text-slate-950 dark:text-white">OPEX <span className="text-blue-600">Ninja</span></span>
        </a>
        <nav className="hidden items-center gap-5 md:flex">
          {links.map(([label, path]) => <a key={label} href={toSite(path)} className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300">{label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsDark(!isDark)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Toggle theme">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Button variant="default" size="sm" className="hidden sm:inline-flex" onClick={() => { window.location.href = toSite('assessment'); }}>Start Diagnostic</Button>
          <button onClick={() => setOpen(!open)} className="rounded-lg p-2 md:hidden" aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-slate-200 px-6 py-4 dark:border-slate-800 md:hidden">
          {links.map(([label, path]) => <a key={label} href={toSite(path)} onClick={() => setOpen(false)} className="block py-3 font-medium">{label}</a>)}
          <a href={toSite('operational-excellence-consultant-india')} onClick={() => setOpen(false)} className="block py-3 font-medium">Operational Excellence</a>
          <a href={toSite('continuous-improvement-consultant-india')} onClick={() => setOpen(false)} className="block py-3 font-medium">Continuous Improvement</a>
          <a href={toSite('assessment')} onClick={() => setOpen(false)} className="block py-3 font-semibold text-blue-600">Start Diagnostic</a>
          <a href={toSite('contact')} onClick={() => setOpen(false)} className="block py-3 font-semibold text-orange-500">Book Discovery Call</a>
        </nav>
      )}
    </header>
  );
};
