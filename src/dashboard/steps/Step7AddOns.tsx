import React, { useRef } from 'react';
import { useConfigurator } from '../ConfiguratorContext';

const numberPlateStyles = ['Standard', 'Sport', 'Custom', 'Vintage'];

const Step7AddOns: React.FC = () => {
  const { config, setConfig } = useConfigurator();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Tow Hitch Toggle */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Tow Hitch</label>
        <button
          className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
            config.towHitch
              ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
              : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
          }`}
          onClick={() => setConfig(c => ({ ...c, towHitch: !c.towHitch }))}
          type="button"
        >
          {config.towHitch ? 'Yes' : 'No'}
        </button>
      </div>

      {/* Roof Rack Toggle */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Roof Rack</label>
        <button
          className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
            config.roofRack
              ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
              : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
          }`}
          onClick={() => setConfig(c => ({ ...c, roofRack: !c.roofRack }))}
          type="button"
        >
          {config.roofRack ? 'Yes' : 'No'}
        </button>
      </div>

      {/* Custom Logo Upload */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Custom Logo Upload</label>
        <div className="flex items-center gap-4">
          <button
            className="px-5 py-3 rounded-xl font-semibold border border-white/20 bg-white/10 text-white hover:bg-[#007BFF]/30 transition-all duration-200"
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            {config.customLogo ? 'Change Logo' : 'Upload Logo'}
          </button>
          {config.customLogo && (
            <span className="text-white/70">{(config.customLogo as File).name}</span>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0] || null;
              setConfig(c => ({ ...c, customLogo: file }));
            }}
          />
        </div>
      </div>

      {/* Number Plate Style */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Number Plate Style</label>
        <div className="flex flex-wrap gap-3">
          {numberPlateStyles.map(style => (
            <button
              key={style}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.numberPlate === style
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, numberPlate: style }))}
              type="button"
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Special Requests</label>
        <textarea
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#007BFF] transition-colors min-h-[80px]"
          value={config.specialRequests}
          onChange={e => setConfig(c => ({ ...c, specialRequests: e.target.value }))}
          placeholder="Describe any special requests or customizations..."
        />
      </div>
    </div>
  );
};

export default Step7AddOns;