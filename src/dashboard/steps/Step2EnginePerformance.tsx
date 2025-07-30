import React from 'react';
import { useConfigurator } from '../ConfiguratorContext';

const engineTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'Hydrogen'];
const engineSizes = ['1000cc', '1200cc', '1500cc', '2000cc', '2500cc', '3000cc+'];
const driveTypes = ['FWD', 'RWD', 'AWD'];
const evBatteries = ['30kWh', '50kWh', '70kWh', '100kWh'];

const Step2EnginePerformance: React.FC = () => {
  const { config, setConfig } = useConfigurator();
  const isElectric = config.engineType === 'Electric';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Engine Type */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Engine Type</label>
        <div className="flex flex-wrap gap-3">
          {engineTypes.map(type => (
            <button
              key={type}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.engineType === type
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, engineType: type }))}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Engine Size */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Engine Size</label>
        <select
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#007BFF] transition-colors appearance-none cursor-pointer"
          value={config.engineSize}
          onChange={e => setConfig(c => ({ ...c, engineSize: e.target.value }))}
        >
          <option value="">Select Engine Size</option>
          {engineSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      {/* Drive Type */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Drive Type</label>
        <div className="flex flex-wrap gap-3">
          {driveTypes.map(type => (
            <button
              key={type}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.driveType === type
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, driveType: type }))}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Turbo */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Turbo</label>
        <button
          className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
            config.turbo
              ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
              : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
          }`}
          onClick={() => setConfig(c => ({ ...c, turbo: !c.turbo }))}
          type="button"
        >
          {config.turbo ? 'Yes' : 'No'}
        </button>
      </div>

      {/* Max Speed */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Max Speed (100–400 km/h)</label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={100}
            max={400}
            step={5}
            value={config.maxSpeed}
            onChange={e => setConfig(c => ({ ...c, maxSpeed: Number(e.target.value) }))}
            className="w-full accent-[#007BFF] h-2 rounded-lg appearance-none bg-white/20"
          />
          <span className="text-white/80 font-mono text-lg">{config.maxSpeed} km/h</span>
        </div>
      </div>

      {/* 0–100 km/h in */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">0–100 km/h in (seconds)</label>
        <input
          type="text"
          className="w-32 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#007BFF] transition-colors"
          value={config.zeroToHundred}
          onChange={e => setConfig(c => ({ ...c, zeroToHundred: e.target.value }))}
          placeholder="e.g. 4.2"
        />
      </div>

      {/* EV Battery Capacity (If Electric) */}
      {isElectric && (
        <div>
          <label className="block text-white/80 mb-2 font-semibold text-lg">EV Battery Capacity</label>
          <div className="flex flex-wrap gap-3">
            {evBatteries.map(bat => (
              <button
                key={bat}
                className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                  config.evBattery === bat
                    ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                    : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
                }`}
                onClick={() => setConfig(c => ({ ...c, evBattery: bat }))}
                type="button"
              >
                {bat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fast Charging Support toggle (If Electric) */}
      {isElectric && (
        <div>
          <label className="block text-white/80 mb-2 font-semibold text-lg">Fast Charging Support</label>
          <button
            className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
              config.fastCharging
                ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
            }`}
            onClick={() => setConfig(c => ({ ...c, fastCharging: !c.fastCharging }))}
            type="button"
          >
            {config.fastCharging ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      )}

      {/* Estimated Range (If Electric) */}
      {isElectric && (
        <div>
          <label className="block text-white/80 mb-2 font-semibold text-lg">Estimated Range (km)</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={100}
              max={800}
              step={10}
              value={config.range}
              onChange={e => setConfig(c => ({ ...c, range: Number(e.target.value) }))}
              className="w-full accent-[#007BFF] h-2 rounded-lg appearance-none bg-white/20"
            />
            <span className="text-white/80 font-mono text-lg">{config.range} km</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2EnginePerformance;