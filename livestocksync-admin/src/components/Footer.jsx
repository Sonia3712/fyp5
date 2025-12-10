import React from 'react';
import { 
  Heart, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Mail,
  Phone
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary to-[#2a2d4c] text-white relative overflow-hidden">
      {/* Gradient Border Top */}
      <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section with Floating Logo Card */}
          <div className="lg:col-span-1">
            <div className="flex items-start space-x-4 mb-6">
              {/* Floating Logo Card - Same as navigation */}
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 bg-card rounded-2xl shadow-lg border border-gray-700 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl"></div>
                  <img 
                    src="/logo1.png" 
                    alt="LivestockSync Logo" 
                    className="w-8 h-8 object-contain relative z-10"
                  />
                </div>
                {/* Soft Shadow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#5A35B5]/20 to-[#0B8C8C]/20 rounded-2xl blur-md opacity-50 -z-10"></div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  LivestockSync
                </h3>
                <p className="text-sm text-gray-300">Digital Farming Revolution</p>
              </div>
            </div>
            <p className="text-base text-gray-300 leading-relaxed mb-6">
              Empowering farmers with intelligent livestock management solutions for modern agriculture.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-gray-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {[
                "Features",
                "Pricing",
                "Mobile App",
                "API Docs"
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-base text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                "About Us",
                "Our Team", 
                "Careers",
                "Contact"
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-base text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Contact Info */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-base text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                support@livestocksync.com
              </div>
              <div className="flex items-center text-base text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                +92 300 123 4567
              </div>
            </div>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Security"
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-base text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-base text-gray-300">
                © 2025 LivestockSync. All rights reserved.
              </p>
            </div>
            
            {/* Version */}
            <div className="text-sm text-gray-400">
              v2.1.0 • Built with <Heart className="h-3 w-3 inline text-red-400" /> for farmers
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;