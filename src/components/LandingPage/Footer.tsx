import React from 'react';
import { Mail, Phone } from 'lucide-react';
import Logo from '../Logo';

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Logo />
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <a href="mailto:contact@rentalbot.com" className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors">
              <Mail className="w-5 h-5" />
              contact@rentalbot.com
            </a>
            <a href="tel:+31201234567" className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors">
              <Phone className="w-5 h-5" />
              +31 20 123 4567
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}