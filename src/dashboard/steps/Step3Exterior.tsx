import React from 'react';
import { useConfigurator } from '../ConfiguratorContext';

const paintFinishes = ['Matte', 'Gloss', 'Metallic', 'Chrome'];
const roofTypes = ['Body Color', 'Glass', 'Carbon'];
const spoilers = ['None', 'Fixed', 'Retractable'];
const rimStyles = ['Classic', 'Sport', 'Premium', 'Custom'];
const rimSizes = [16, 17, 18, 19, 20, 21, 22];
const tyres = ['Normal', 'Sport', 'Off-road'];
const doorHandles = ['Standard', 'Hidden'];
const exhaustStyles = ['Single', 'Dual', 'Quad', 'Hidden'];

const Step3Exterior: React.FC = () => {
  const { config, setConfig } = useConfigurator();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Exterior Color Picker */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Exterior Color</label>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={config.exteriorColor}
            onChange={e => setConfig(c => ({ ...c, exteriorColor: e.target.value }))}
            className="w-16 h-12 rounded-lg border border-white/20 cursor-pointer"
          />
          <span className="text-white/70">{config.exteriorColor}</span>
        </div>
      </div>

      {/* Paint Finish */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Paint Finish</label>
        <div className="flex flex-wrap gap-3">
          {paintFinishes.map(finish => (
            <button
              key={finish}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.paintFinish === finish
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, paintFinish: finish }))}
              type="button"
            >
              {finish}
            </button>
          ))}
        </div>
      </div>

      {/* Roof Type */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Roof Type</label>
        <div className="flex flex-wrap gap-3">
          {roofTypes.map(roof => (
            <button
              key={roof}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.roofType === roof
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, roofType: roof }))}
              type="button"
            >
              {roof}
            </button>
          ))}
        </div>
      </div>

      {/* Spoiler */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Spoiler</label>
        <div className="flex flex-wrap gap-3">
          {spoilers.map(spoiler => (
            <button
              key={spoiler}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.spoiler === spoiler
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, spoiler: spoiler }))}
              type="button"
            >
              {spoiler}
            </button>
          ))}
        </div>
      </div>

      {/* Rims: Style + Size */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Rims</label>
        <div className="flex flex-wrap gap-3 mb-2">
          {rimStyles.map(style => (
            <button
              key={style}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.rims === style
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, rims: style }))}
              type="button"
            >
              {style}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <label className="text-white/70">Size:</label>
          <select
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#007BFF] transition-colors appearance-none cursor-pointer"
            value={config.rimSize}
            onChange={e => setConfig(c => ({ ...c, rimSize: Number(e.target.value) }))}
          >
            {rimSizes.map(size => (
              <option key={size} value={size}>{size}"</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tyres */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Tyres</label>
        <div className="flex flex-wrap gap-3">
          {tyres.map(type => (
            <button
              key={type}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.tyres === type
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, tyres: type }))}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Door Handles */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Door Handles</label>
        <div className="flex flex-wrap gap-3">
          {doorHandles.map(type => (
            <button
              key={type}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.doorHandles === type
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, doorHandles: type }))}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Exhaust Style */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Exhaust Style</label>
        <div className="flex flex-wrap gap-3">
          {exhaustStyles.map(type => (
            <button
              key={type}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.exhaustStyle === type
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, exhaustStyle: type }))}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step3Exterior;