import { Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: ['Services', 'Pricing', 'Security', 'Status'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
    Resources: ['Documentation', 'API Docs', 'Community', 'Support'],
  };

  return (
    <footer className="bg-primary dark:bg-slate-950 text-white border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">OPEX Ninja</h3>
            <p className="text-slate-300 text-sm">AI-Powered Operational Excellence Platform</p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-white">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-300 hover:text-secondary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 py-8">
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-secondary" />
              <span className="text-slate-300">contact@opexninja.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-secondary" />
              <span className="text-slate-300">+1 (555) 000-0000</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-secondary" />
              <span className="text-slate-300">San Francisco, CA</span>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-700">
            <p className="text-slate-400 text-sm">
              © {currentYear} OPEX Ninja. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-secondary transition-colors text-sm">
                Twitter
              </a>
              <a href="#" className="text-slate-400 hover:text-secondary transition-colors text-sm">
                LinkedIn
              </a>
              <a href="#" className="text-slate-400 hover:text-secondary transition-colors text-sm">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
