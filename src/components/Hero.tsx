import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Scissors, Truck } from 'lucide-react';
import { CategoryType } from '../types';

interface HeroProps {
  onExplore: (category: CategoryType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative overflow-hidden bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-amber-900 uppercase">
              <span>Summer Lawn 2026</span>
              <span aria-hidden="true">·</span>
              <span>The Royal Haveli Edition</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-stone-900 leading-[1.1] text-balance">
              The Poetry of Breathable Luxury &amp; Schiffli Artistry
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Engineered for the warmest Pakistani summers with ultra-fine 80s count pure Swiss lawn,
              subtle Chikankari needlework, and gossamer pure silk dupattas that float effortlessly.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onExplore('unstitched')}
                className="px-6 py-3.5 bg-stone-900 text-white text-xs font-semibold tracking-wider uppercase rounded-md hover:bg-stone-800 transition-all flex items-center gap-2 group cursor-pointer shadow-sm hover:shadow"
              >
                <span>Shop Unstitched Lawn</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onExplore('chikankari')}
                className="px-6 py-3.5 bg-white text-stone-900 border border-stone-300 text-xs font-semibold tracking-wider uppercase rounded-md hover:bg-stone-50 transition-colors cursor-pointer"
              >
                <span>Chikankari Edit</span>
              </button>
            </div>

            <div className="text-xs text-stone-500 pt-2 flex items-center gap-4">
              <span>⭐️ Rated 4.9/5 by 3,400+ women in Pakistan</span>
              <span aria-hidden="true">·</span>
              <span>Available Unstitched &amp; Stitched</span>
            </div>
          </div>

          {/* Right Column: Hero High-Res Pakistani Lawn Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-lg overflow-hidden bg-stone-200 shadow-md">
              <img
                src="/src/assets/images/hero_summer_lawn_editorial_1792047025524.jpg"
                alt="Pakistani woman in luxury pastel embroidered summer lawn suit with flowy printed silk dupatta in a Lahore heritage haveli"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-amber-200 font-medium">Vol. 01 Edition</p>
                  <p className="font-serif-luxury text-lg sm:text-xl font-normal">Firdaus Mint Lawn Suit</p>
                </div>
                <button
                  onClick={() => onExplore('unstitched')}
                  className="text-xs bg-white/90 text-stone-900 px-3 py-1.5 rounded font-medium hover:bg-white transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Pakistani Trust Bar (Full Width Row Below Hero) */}
        <div className="mt-12 pt-8 border-t border-stone-200/90 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-700">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Nationwide Delivery</h2>
              <p className="text-xs text-stone-500 mt-0.5">TCS &amp; Leopards fast dispatch across Pakistan (1-3 days)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Cash on Delivery</h2>
              <p className="text-xs text-stone-500 mt-0.5">Pay in cash right at your doorstep upon parcel arrival</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Scissors className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Custom Tailoring</h2>
              <p className="text-xs text-stone-500 mt-0.5">Expert master tailors for standard &amp; bespoke fitting</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-900">100% Pure Lawn</h2>
              <p className="text-xs text-stone-500 mt-0.5">Breathable 80s count combed cotton with pure silk</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
