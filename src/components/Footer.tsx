import React from 'react';
import { Phone, Mail, MapPin, Shield, RefreshCw, Truck } from 'lucide-react';
import { CategoryType } from '../types';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenTracking: () => void;
  onOpenSizeChart: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTracking,
  onOpenSizeChart,
}) => {
  return (
    <footer className="bg-stone-950 text-stone-400 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Heritage */}
          <div className="space-y-3">
            <span className="font-serif-luxury text-xl font-medium tracking-[0.18em] text-white uppercase block">
              ZAHRA NOOR
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              Purveyors of fine Pakistani luxury lawn, Schiffli embroidery, and contemporary pret.
              Rooted in Lahore’s rich textile heritage, delivering across Pakistan and worldwide.
            </p>
            <div className="pt-2 text-stone-300 space-y-1 text-[11px]">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Flagship: M.M. Alam Road, Gulberg III, Lahore</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>WhatsApp Helpline: +92 300 8472911 (10 AM - 10 PM PKT)</span>
              </p>
            </div>
          </div>

          {/* Col 2: Summer '26 Collections */}
          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-wider text-white text-[11px]">
              Summer '26 Collections
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('unstitched')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Unstitched 3-Piece Luxury Lawn
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('chikankari')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Chikankari &amp; Schiffli Edits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('festive')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Festive Organza &amp; Gotta Lawn
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('pret')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Ready-to-Wear Pret &amp; Kurtis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('coords')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Breezy Cambric 2-Piece Co-ords
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Services */}
          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-wider text-white text-[11px]">
              Customer Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Track TCS / Leopards Courier</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSizeChart}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Pakistani Sizing &amp; Measurement Guide
                </button>
              </li>
              <li>
                <span className="text-stone-400">14-Day Unstitched Return / Exchange</span>
              </li>
              <li>
                <span className="text-stone-400">Cash on Delivery (COD) Guidelines</span>
              </li>
              <li>
                <span className="text-stone-400">Bespoke Darzi (Tailoring) Support</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Nationwide Pakistan Coverage */}
          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-wider text-white text-[11px]">
              Doorstep Delivery Across Pakistan
            </h4>
            <p className="text-stone-400 text-xs">
              Express delivery to 150+ cities including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Sialkot, and Quetta.
            </p>
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-1">
                Accepted Payment Channels
              </span>
              <div className="flex flex-wrap gap-2 text-[11px] text-stone-300 font-medium">
                <span className="bg-stone-900 border border-stone-800 px-2 py-1 rounded">Cash on Delivery</span>
                <span className="bg-stone-900 border border-stone-800 px-2 py-1 rounded">JazzCash</span>
                <span className="bg-stone-900 border border-stone-800 px-2 py-1 rounded">EasyPaisa</span>
                <span className="bg-stone-900 border border-stone-800 px-2 py-1 rounded">Meezan Bank</span>
                <span className="bg-stone-900 border border-stone-800 px-2 py-1 rounded">Visa / Mastercard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} ZAHRA NOOR COUTURE (PVT) LTD. Registered in Pakistan. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Lahore · Karachi · Islamabad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
