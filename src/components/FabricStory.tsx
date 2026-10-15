import React from 'react';
import { Feather, Sun, Sparkles, Award } from 'lucide-react';

export const FabricStory: React.FC = () => {
  return (
    <section className="bg-stone-900 text-stone-100 py-16 sm:py-24 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
            The Craft of Pakistani Lawn
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
            Engineered for the 45°C Heat of the Subcontinent
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
            In Pakistan, lawn is not merely fabric—it is an art form, a cultural obsession, and the ultimate
            sanctuary against oppressive summer heat. Here is why Zahra Noor summer lawn stands in a league of its own.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-stone-800/60 p-6 rounded-lg border border-stone-700/60 space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-900/40 text-amber-300 flex items-center justify-center">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl font-medium text-white">
              80s Count Swiss &amp; Giza Weave
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              We spin extra-long staple combed cotton into an ultra-dense, feather-light 80s count weave.
              The resulting textile feels cool to the touch, absorbs perspiration instantly, and resists creasing.
            </p>
          </div>

          <div className="bg-stone-800/60 p-6 rounded-lg border border-stone-700/60 space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-900/40 text-amber-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl font-medium text-white">
              Weightless Schiffli &amp; Chikankari
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Heavy embroidery suffocates in summer. Our master artisans utilize fine resham threads and
              laser eyelet Schiffli cutwork to create opulent patterns without adding bulk or stiffness.
            </p>
          </div>

          <div className="bg-stone-800/60 p-6 rounded-lg border border-stone-700/60 space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-900/40 text-amber-300 flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl font-medium text-white">
              Gossamer Silk &amp; Chiffon Dupattas
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Every 3-piece suit is crowned by a 2.5-meter pure medium silk or Bamberg chiffon dupatta.
              Printed with archival floral motifs that float effortlessly on warm summer breezes.
            </p>
          </div>
        </div>

        {/* Customer Proof Strip */}
        <div className="mt-16 pt-12 border-t border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-300">
          <div className="space-y-2">
            <div className="text-amber-400 text-xs font-semibold">“Survives Lahore May Heat”</div>
            <p className="text-xs text-stone-300 italic">
              “I wore the Firdaus Mint suit to an outdoor daytime lunch in Gulberg. The lawn was so breathable and the silk dupatta draped beautifully without slipping.”
            </p>
            <p className="text-[11px] text-stone-400 font-medium">— Ayesha M., Lahore (Verified Buyer)</p>
          </div>

          <div className="space-y-2">
            <div className="text-amber-400 text-xs font-semibold">“Impeccable Finishing &amp; Laces”</div>
            <p className="text-xs text-stone-300 italic">
              “Ordered from Clifton, Karachi. Delivered via TCS in 48 hours with cash on delivery. The Schiffli borders are pristine and need zero extra trimming.”
            </p>
            <p className="text-[11px] text-stone-400 font-medium">— Mahnoor S., Karachi (Verified Buyer)</p>
          </div>

          <div className="space-y-2">
            <div className="text-amber-400 text-xs font-semibold">“Perfect Stitched Tailoring”</div>
            <p className="text-xs text-stone-300 italic">
              “Took the stitched Pret option in Size M. The chest and shoulder measurements matched my Sapphire suits exactly. Saved me a trip to the tailor!”
            </p>
            <p className="text-[11px] text-stone-400 font-medium">— Dr. Zainab Tariq, Islamabad (Verified Buyer)</p>
          </div>
        </div>
      </div>
    </section>
  );
};
