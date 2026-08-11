import { Mail, MapPin, Phone } from 'lucide-react';

const siteBase = import.meta.env.BASE_URL;

export const Footer = () => (
  <footer className="bg-slate-950 text-slate-300">
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="text-2xl font-extrabold text-white">
            OPEX <span className="text-blue-400">Ninja</span>
          </div>
          <p className="mt-4 max-w-md leading-7">
            Operational excellence consulting for organizations that want measurable improvement and sustainable control.
          </p>
          <p className="mt-6 text-sm text-slate-500">
            Process Excellence · SAP / ERP · Cybersecurity · ISO
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Explore</h3>
          <div className="mt-4 space-y-3 text-sm">
            <a href="#services" className="block hover:text-white">Services</a>
            <a href="#method" className="block hover:text-white">Transformation Model</a>
            <a href="#industries" className="block hover:text-white">Industries</a>
            <a href="#assessment" className="block hover:text-white">Free Health Check</a>
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
            <div className="pt-1 text-xs text-slate-500">
              LinkedIn profile coming soon.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-500">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} OPEX Ninja. All rights reserved.</span>
          <span>Operational Excellence · Digital Transformation · Assurance</span>
        </div>
      </div>
    </div>
  </footer>
);
