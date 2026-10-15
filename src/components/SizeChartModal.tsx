import React, { useState } from 'react';
import { X, Ruler, Info } from 'lucide-react';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const toUnit = (valInches: number) => {
    if (unit === 'inches') return `${valInches}"`;
    return `${Math.round(valInches * 2.54)} cm`;
  };

  const rows = [
    { size: 'XS', chest: 36, waist: 32, hips: 38, length: 40, shoulder: 14, sleeves: 21, trouser: 38 },
    { size: 'S', chest: 38, waist: 34, hips: 41, length: 41, shoulder: 14.5, sleeves: 21.5, trouser: 38.5 },
    { size: 'M', chest: 40, waist: 37, hips: 44, length: 42, shoulder: 15, sleeves: 22, trouser: 39 },
    { size: 'L', chest: 43, waist: 40, hips: 47, length: 43, shoulder: 15.5, sleeves: 22.5, trouser: 39.5 },
    { size: 'XL', chest: 46, waist: 43, hips: 50, length: 44, shoulder: 16.5, sleeves: 23, trouser: 40 },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Ruler className="w-5 h-5 text-amber-800" />
          <h2 className="font-serif-luxury text-2xl font-semibold text-stone-900">
            Pakistani Ready-to-Wear Sizing Chart
          </h2>
        </div>
        <p className="text-xs text-stone-500 mb-6">
          Standard Pakistani tailoring measurements for stitched summer lawn shirts and trousers.
        </p>

        {/* Unit toggle */}
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-md">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                unit === 'inches' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                unit === 'cm' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Centimeters
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto border border-stone-200 rounded-md">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-stone-100 text-stone-800 font-semibold uppercase tracking-wider border-b border-stone-200">
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Chest</th>
                <th className="py-2.5 px-3">Waist</th>
                <th className="py-2.5 px-3">Hips</th>
                <th className="py-2.5 px-3">Shirt Length</th>
                <th className="py-2.5 px-3">Shoulder</th>
                <th className="py-2.5 px-3">Sleeves</th>
                <th className="py-2.5 px-3">Trouser</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700 tabular-nums">
              {rows.map((r) => (
                <tr key={r.size} className="hover:bg-amber-50/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-stone-900">{r.size}</td>
                  <td className="py-3 px-3">{toUnit(r.chest)}</td>
                  <td className="py-3 px-3">{toUnit(r.waist)}</td>
                  <td className="py-3 px-3">{toUnit(r.hips)}</td>
                  <td className="py-3 px-3">{toUnit(r.length)}</td>
                  <td className="py-3 px-3">{toUnit(r.shoulder)}</td>
                  <td className="py-3 px-3">{toUnit(r.sleeves)}</td>
                  <td className="py-3 px-3">{toUnit(r.trouser)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tailoring Tip Note */}
        <div className="mt-6 p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-md flex items-start gap-2.5 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Tailor’s Note for Unstitched Lawn:</span> All unstitched 3-piece
            suits include 3.0m shirt, 2.5m dupatta, and 2.5m trouser fabric, allowing your personal darzi
            (tailor) to stitch up to size 2XL or customized floor lengths. For best results, pre-soak lawn
            fabric in cold water before tailor cutting.
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-md hover:bg-stone-800 transition-colors"
          >
            Got it, Return to Suit
          </button>
        </div>
      </div>
    </div>
  );
};
