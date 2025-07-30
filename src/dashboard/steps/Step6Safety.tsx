import React from 'react';
import { useConfigurator } from '../ConfiguratorContext';

const airbagOptions = [2, 4, 6, 8, 10];
const antiTheftOptions = ['GPS', 'Biometric', 'Keyless Lock'];

const Step6Safety: React.FC = () => {
  const { config, setConfig } = useConfigurator();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Airbags */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Airbags</label>
        <div className="flex flex-wrap gap-3">
          {airbagOptions.map(num => (
            <button
              key={num}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.airbags === num
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, airbags: num }))}
              type="button"
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Anti-theft System */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Anti-theft System</label>
        <div className="flex flex-wrap gap-3">
          {antiTheftOptions.map(opt => (
            <button
              key={opt}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.antiTheft === opt
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, antiTheft: opt }))}
              type="button"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Crash SOS Toggle */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Crash SOS</label>
        <button
          className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
            config.crashSOS
              ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
              : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
          }`}
          onClick={() => setConfig(c => ({ ...c, crashSOS: !c.crashSOS }))}
          type="button"
        >
          {config.crashSOS ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      {/* TPMS Toggle */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">TPMS (Tire Pressure Monitoring System)</label>
        <button
          className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
            config.tpms
              ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
              : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
          }`}
          onClick={() => setConfig(c => ({ ...c, tpms: !c.tpms }))}
          type="button"
        >
          {config.tpms ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      {/* ISOFIX Toggle */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">ISOFIX for Child Seats</label>
        <button
          className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
            config.isofix
              ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
              : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
          }`}
          onClick={() => setConfig(c => ({ ...c, isofix: !c.isofix }))}
          type="button"
        >
          {config.isofix ? 'Enabled' : 'Disabled'}
        </button>
      </div>
    </div>
  );
};

export default Step6Safety;