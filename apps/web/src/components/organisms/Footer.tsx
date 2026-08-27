import { Mail, MapPin, Phone } from 'lucide-react';

const siteBase = import.meta.env.BASE_URL;
const toSite = (path = '') => `${siteBase}${path}`;

export const Footer = () => (
  <footer className="bg-slate-950 text-slate-300">
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="text-2xl font-extrabold text-white">
            OPEX <span className="text-blue-400">Ninja</span>
          </div>
          <p className="mt-4 max-w-md leading-7">
            Helping organizations reduce waste, automate intelligently and build stronger management systems.
          </p>
          <p className="mt-6 text-sm text-slate-500">
            Operational Excellence · AI & Automation · Performance Intelligence · Digital Transformation
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Explore</h3>
          <div className="mt-4 space-y-3 text-sm">
            <a href={toSite('about')} className="block hover:text-white">About</a>
            <a href={toSite('services')} className="block hover:text-white">Services</a>
            <a href={toSite('industries')} className="block hover:text-white">Industries</a>
            <a href={toSite('case-studies')} className="block hover:text-white">Case Studies</a>
            <a href={toSite('resources')} className="block hover:text-white">Resources</a>
            <a href={toSite('assessment')} className="block hover:text-white">Transformation Diagnostic</a>
            <a href={`${siteBase}privacy.html`} className="block hover:text-white">Privacy Policy</a>
            <a href={`${siteBase}terms.html`} className="block hover:text-white">Terms of Use</a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <div className="mt-4 space-y-3 text-sm">
            <a href="mailto:contactus.opexninja@gmail.com" className="flex gap-3 hover:text-white">
              <Mail className="h-5 w-5 text-blue-400" />
              contactus.opexninja@gmail.com
            </a>
            <a href="tel:+919176816218" className="flex gap-3 hover:text-white">
              <Phone className="h-5 w-5 text-blue-400" />
              +91 91768 16218
            </a>
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-blue-400" />
              Chennai, India
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-500">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} OPEX Ninja. All rights reserved.</span>
          <span>Lean Thinking · Automation · AI · Analytics</span>
        </div>
      </div>
    </div>
  </footer>
);
