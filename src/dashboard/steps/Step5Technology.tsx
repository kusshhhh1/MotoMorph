import React from 'react';
import { useConfigurator } from '../ConfiguratorContext';

const infotainments = ['8”', '12”', 'Full HUD'];
const connectivityOptions = ['Android Auto', 'Apple CarPlay', '5G Telematics'];
const smartTechOptions = [
  'AI Assistant',
  'Heads-Up Display',
  '360° Camera',
  'Adaptive Cruise Control',
  'Auto Emergency Braking',
  'Auto Park Assist',
  'Rain Sensing Wipers',
  'Blind Spot Monitoring',
];

const Step5Technology: React.FC = () => {
  const { config, setConfig } = useConfigurator();

  const toggleConnectivity = (option: string) => {
    setConfig(c => ({
      ...c,
      connectivity: c.connectivity.includes(option)
        ? c.connectivity.filter(o => o !== option)
        : [...c.connectivity, option],
    }));
  };

  const toggleSmartTech = (option: string) => {
    setConfig(c => ({
      ...c,
      smartTech: c.smartTech.includes(option)
        ? c.smartTech.filter(o => o !== option)
        : [...c.smartTech, option],
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Infotainment Display */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Infotainment Display</label>
        <div className="flex flex-wrap gap-3">
          {infotainments.map(info => (
            <button
              key={info}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.infotainment === info
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, infotainment: info }))}
              type="button"
            >
              {info}
            </button>
          ))}
        </div>
      </div>

      {/* Wireless Charging Toggle */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Wireless Charging</label>
        <button
          className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
            config.wirelessCharging
              ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
              : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
          }`}
          onClick={() => setConfig(c => ({ ...c, wirelessCharging: !c.wirelessCharging }))}
          type="button"
        >
          {config.wirelessCharging ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      {/* Connectivity Multi-select */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Connectivity</label>
        <div className="flex flex-wrap gap-3">
          {connectivityOptions.map(option => (
            <button
              key={option}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.connectivity.includes(option)
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => toggleConnectivity(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Assistant Toggle */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Voice Assistant</label>
        <button
          className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
            config.voiceAssistant
              ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
              : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
          }`}
          onClick={() => setConfig(c => ({ ...c, voiceAssistant: !c.voiceAssistant }))}
          type="button"
        >
          {config.voiceAssistant ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      {/* Smart Tech Checkboxes */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Smart Tech Features</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {smartTechOptions.map(option => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.smartTech.includes(option)}
                onChange={() => toggleSmartTech(option)}
                className="w-4 h-4 text-[#007BFF] bg-white/10 border-white/20 rounded focus:ring-[#007BFF]"
              />
              <span className="text-white/80">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step5Technology;