import React from 'react';
import { useConfigurator } from '../ConfiguratorContext';

const bodyStyles = [
  'Sedan', 'SUV', 'Coupe', 'Convertible', 'Hatchback', 'Pickup'
];
const baseVariants = [
  'Basic', 'Sport', 'Electric', 'Luxury'
];
const transmissions = [
  'Manual', 'Automatic', 'Dual Clutch'
];

const Step1BodyModel: React.FC = () => {
  const { config, setConfig } = useConfigurator();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Body Style */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Body Style</label>
        <div className="flex flex-wrap gap-3">
          {bodyStyles.map(style => (
            <button
              key={style}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.bodyStyle === style
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, bodyStyle: style }))}
              type="button"
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Base Variant */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Base Variant</label>
        <div className="flex flex-wrap gap-3">
          {baseVariants.map(variant => (
            <button
              key={variant}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.baseVariant === variant
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, baseVariant: variant }))}
              type="button"
            >
              {variant}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Range */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Budget Range (₹5L – ₹2Cr)</label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={500000}
            max={20000000}
            step={50000}
            value={config.budget}
            onChange={e => setConfig(c => ({ ...c, budget: Number(e.target.value) }))}
            className="w-full accent-[#007BFF] h-2 rounded-lg appearance-none bg-white/20"
          />
          <span className="text-white/80 font-mono text-lg">₹{(config.budget/100000).toFixed(2)}L</span>
        </div>
      </div>

      {/* Transmission */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Transmission</label>
        <div className="flex flex-wrap gap-3">
          {transmissions.map(trans => (
            <button
              key={trans}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.transmission === trans
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, transmission: trans }))}
              type="button"
            >
              {trans}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step1BodyModel;