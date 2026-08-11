import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-slate-950 text-slate-300">
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="text-2xl font-extrabold text-white">OPEX <span className="text-blue-400">Ninja</span></div>
          <p className="mt-4 max-w-md leading-7">Operational excellence consulting for organizations that want measurable improvement and sustainable control.</p>
          <p className="mt-6 text-sm text-slate-500">Replace the contact placeholders below with your verified business details before launch.</p>
        </div>
        <div>
          <h3 className="font-semibold text-white">Explore</h3>
          <div className="mt-4 space-y-3 text-sm">
            <a href="#services" className="block hover:text-white">Services</a>
            <a href="#method" className="block hover:text-white">Transformation Model</a>
            <a href="#industries" className="block hover:text-white">Industries</a>
            <a href="#assessment" className="block hover:text-white">Free Health Check</a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex gap-3"><Mail className="h-5 w-5 text-blue-400" /> YOUR_EMAIL</div>
            <div className="flex gap-3"><Phone className="h-5 w-5 text-blue-400" /> YOUR_PHONE</div>
            <div className="flex gap-3"><MapPin className="h-5 w-5 text-blue-400" /> YOUR_LOCATION</div>
            <a href="YOUR_LINKEDIN_URL" className="flex gap-3 hover:text-white"><Linkedin className="h-5 w-5 text-blue-400" /> LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-500">
        © {new Date().getFullYear()} OPEX Ninja. All rights reserved.
      </div>
    </div>
  </footer>
);
