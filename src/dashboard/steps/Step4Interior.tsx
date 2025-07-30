import React from 'react';
import { useConfigurator } from '../ConfiguratorContext';

const upholsteries = ['Fabric', 'Leather', 'Vegan Leather', 'Alcantara'];
const seatTypes = ['Standard', 'Sport', 'Bucket', 'Heated+Ventilated'];
const ambientLightings = ['None', 'Single Color', 'Multicolor (RGB)'];
const dashboardLayouts = ['Classic', 'Digital', 'AI Cockpit'];
const cabinCombos = [
  { name: 'Black/Red', colors: ['#111', '#c00'] },
  { name: 'Beige/Brown', colors: ['#f5e9da', '#7c4a02'] },
  { name: 'Grey/Blue', colors: ['#888', '#007BFF'] },
  { name: 'White/Black', colors: ['#fff', '#111'] },
];
const steerings = ['Normal', 'Flat-bottom', 'Carbon Finish'];
const sunroofs = ['None', 'Panoramic', 'Sliding'];

const Step4Interior: React.FC = () => {
  const { config, setConfig } = useConfigurator();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Upholstery */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Upholstery</label>
        <div className="flex flex-wrap gap-3">
          {upholsteries.map(up => (
            <button
              key={up}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.upholstery === up
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, upholstery: up }))}
              type="button"
            >
              {up}
            </button>
          ))}
        </div>
      </div>

      {/* Seat Type */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Seat Type</label>
        <div className="flex flex-wrap gap-3">
          {seatTypes.map(seat => (
            <button
              key={seat}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.seatType === seat
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, seatType: seat }))}
              type="button"
            >
              {seat}
            </button>
          ))}
        </div>
      </div>

      {/* Ambient Lighting */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Ambient Lighting</label>
        <div className="flex flex-wrap gap-3">
          {ambientLightings.map(light => (
            <button
              key={light}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.ambientLighting === light
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, ambientLighting: light }))}
              type="button"
            >
              {light}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Layout */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Dashboard Layout</label>
        <div className="flex flex-wrap gap-3">
          {dashboardLayouts.map(layout => (
            <button
              key={layout}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.dashboardLayout === layout
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, dashboardLayout: layout }))}
              type="button"
            >
              {layout}
            </button>
          ))}
        </div>
      </div>

      {/* Cabin Color Combo */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Cabin Color Combo</label>
        <div className="flex flex-wrap gap-3">
          {cabinCombos.map(combo => (
            <button
              key={combo.name}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none flex items-center gap-2 ${
                config.cabinColorCombo === combo.name
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, cabinColorCombo: combo.name }))}
              type="button"
            >
              <span className="w-5 h-5 rounded-full border border-white/30" style={{ background: combo.colors[0] }}></span>
              <span className="w-5 h-5 rounded-full border border-white/30" style={{ background: combo.colors[1] }}></span>
              <span>{combo.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Steering */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Steering</label>
        <div className="flex flex-wrap gap-3">
          {steerings.map(steer => (
            <button
              key={steer}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.steering === steer
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, steering: steer }))}
              type="button"
            >
              {steer}
            </button>
          ))}
        </div>
      </div>

      {/* Sunroof */}
      <div>
        <label className="block text-white/80 mb-2 font-semibold text-lg">Sunroof</label>
        <div className="flex flex-wrap gap-3">
          {sunroofs.map(sr => (
            <button
              key={sr}
              className={`px-5 py-3 rounded-xl font-semibold border transition-all duration-200 text-base shadow-sm focus:outline-none ${
                config.sunroof === sr
                  ? 'bg-[#007BFF] text-white border-[#007BFF] scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-[#007BFF]/30'
              }`}
              onClick={() => setConfig(c => ({ ...c, sunroof: sr }))}
              type="button"
            >
              {sr}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step4Interior;