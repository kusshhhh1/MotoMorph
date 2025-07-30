import React from 'react';
import { useConfigurator } from '../ConfiguratorContext';
import Car3DPreview from '../Car3DPreview';

const Step8Summary: React.FC = () => {
  const { config } = useConfigurator();

  // Placeholder price calculation logic
  const basePrice = 500000;
  const price = basePrice +
    (config.budget || 0) +
    (config.rimSize * 10000) +
    (config.smartTech.length * 20000) +
    (config.airbags * 5000) +
    (config.towHitch ? 15000 : 0) +
    (config.roofRack ? 10000 : 0);

  const handleSave = () => alert('Configuration saved!');
  const handleDownload = () => alert('PDF download coming soon!');
  const handleSubmit = () => {
    // Import and use the design service
    import('../../services/DesignService').then(({ designService }) => {
      const user = JSON.parse(localStorage.getItem('motomorph_user') || '{}');
      const submittedDesign = designService.submitDesign(user, config);
      alert(`Configuration submitted successfully! Design ID: ${submittedDesign.id}`);
    });
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <div className="text-xl md:text-2xl font-bold text-white mb-4">Final 3D Car Preview</div>
      <div className="w-full h-[250px] md:h-[300px] rounded-2xl border border-[#007BFF]/30 shadow-2xl overflow-hidden bg-gradient-to-br from-[#222] to-[#111] mb-6 md:mb-8">
        <Car3DPreview />
      </div>

      <div className="text-lg md:text-xl font-bold text-white mb-2">Summary of Your Configuration</div>
      
      {/* Mobile Summary Cards */}
      <div className="md:hidden space-y-4">
        <div className="bg-black/60 border border-white/10 rounded-xl p-4">
          <h3 className="text-[#007BFF] font-semibold mb-3">Basic Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-white/60">Body Style:</span><span className="text-white">{config.bodyStyle}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Base Variant:</span><span className="text-white">{config.baseVariant}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Budget:</span><span className="text-white">₹{config.budget?.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Transmission:</span><span className="text-white">{config.transmission}</span></div>
          </div>
        </div>

        <div className="bg-black/60 border border-white/10 rounded-xl p-4">
          <h3 className="text-[#007BFF] font-semibold mb-3">Engine & Performance</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-white/60">Engine Type:</span><span className="text-white">{config.engineType}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Engine Size:</span><span className="text-white">{config.engineSize}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Drive Type:</span><span className="text-white">{config.driveType}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Turbo:</span><span className="text-white">{config.turbo ? 'Yes' : 'No'}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Max Speed:</span><span className="text-white">{config.maxSpeed} km/h</span></div>
            <div className="flex justify-between"><span className="text-white/60">0–100 km/h:</span><span className="text-white">{config.zeroToHundred} s</span></div>
          </div>
        </div>

        <div className="bg-black/60 border border-white/10 rounded-xl p-4">
          <h3 className="text-[#007BFF] font-semibold mb-3">Exterior</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-white/60">Exterior Color:</span>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 rounded-full border border-white/20" style={{background: config.exteriorColor}}></span>
                <span className="text-white">{config.exteriorColor}</span>
              </div>
            </div>
            <div className="flex justify-between"><span className="text-white/60">Paint Finish:</span><span className="text-white">{config.paintFinish}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Roof Type:</span><span className="text-white">{config.roofType}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Spoiler:</span><span className="text-white">{config.spoiler}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Rims:</span><span className="text-white">{config.rims} {config.rimSize}"</span></div>
            <div className="flex justify-between"><span className="text-white/60">Tyres:</span><span className="text-white">{config.tyres}</span></div>
          </div>
        </div>

        <div className="bg-black/60 border border-white/10 rounded-xl p-4">
          <h3 className="text-[#007BFF] font-semibold mb-3">Interior & Tech</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-white/60">Upholstery:</span><span className="text-white">{config.upholstery}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Seat Type:</span><span className="text-white">{config.seatType}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Dashboard:</span><span className="text-white">{config.dashboardLayout}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Infotainment:</span><span className="text-white">{config.infotainment}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Wireless Charging:</span><span className="text-white">{config.wirelessCharging ? 'Yes' : 'No'}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Voice Assistant:</span><span className="text-white">{config.voiceAssistant ? 'Yes' : 'No'}</span></div>
          </div>
        </div>

        <div className="bg-black/60 border border-white/10 rounded-xl p-4">
          <h3 className="text-[#007BFF] font-semibold mb-3">Safety & Features</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-white/60">Airbags:</span><span className="text-white">{config.airbags}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Anti-theft:</span><span className="text-white">{config.antiTheft}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Crash SOS:</span><span className="text-white">{config.crashSOS ? 'Yes' : 'No'}</span></div>
            <div className="flex justify-between"><span className="text-white/60">TPMS:</span><span className="text-white">{config.tpms ? 'Yes' : 'No'}</span></div>
            <div className="flex justify-between"><span className="text-white/60">ISOFIX:</span><span className="text-white">{config.isofix ? 'Yes' : 'No'}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Tow Hitch:</span><span className="text-white">{config.towHitch ? 'Yes' : 'No'}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Roof Rack:</span><span className="text-white">{config.roofRack ? 'Yes' : 'No'}</span></div>
          </div>
        </div>
      </div>

      {/* Desktop Summary Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-black/60 border border-white/10 rounded-xl text-white">
          <tbody>
            <tr><td className="font-semibold">Body Style</td><td>{config.bodyStyle}</td></tr>
            <tr><td className="font-semibold">Base Variant</td><td>{config.baseVariant}</td></tr>
            <tr><td className="font-semibold">Budget</td><td>₹{config.budget?.toLocaleString()}</td></tr>
            <tr><td className="font-semibold">Transmission</td><td>{config.transmission}</td></tr>
            <tr><td className="font-semibold">Engine Type</td><td>{config.engineType}</td></tr>
            <tr><td className="font-semibold">Engine Size</td><td>{config.engineSize}</td></tr>
            <tr><td className="font-semibold">Drive Type</td><td>{config.driveType}</td></tr>
            <tr><td className="font-semibold">Turbo</td><td>{config.turbo ? 'Yes' : 'No'}</td></tr>
            <tr><td className="font-semibold">Max Speed</td><td>{config.maxSpeed} km/h</td></tr>
            <tr><td className="font-semibold">0–100 km/h</td><td>{config.zeroToHundred} s</td></tr>
            <tr><td className="font-semibold">EV Battery</td><td>{config.evBattery}</td></tr>
            <tr><td className="font-semibold">Fast Charging</td><td>{config.fastCharging ? 'Yes' : 'No'}</td></tr>
            <tr><td className="font-semibold">Range</td><td>{config.range} km</td></tr>
            <tr><td className="font-semibold">Exterior Color</td><td><span className="inline-block w-6 h-6 rounded-full mr-2 align-middle" style={{background: config.exteriorColor}}></span>{config.exteriorColor}</td></tr>
            <tr><td className="font-semibold">Paint Finish</td><td>{config.paintFinish}</td></tr>
            <tr><td className="font-semibold">Roof Type</td><td>{config.roofType}</td></tr>
            <tr><td className="font-semibold">Spoiler</td><td>{config.spoiler}</td></tr>
            <tr><td className="font-semibold">Rims</td><td>{config.rims} {config.rimSize}"</td></tr>
            <tr><td className="font-semibold">Tyres</td><td>{config.tyres}</td></tr>
            <tr><td className="font-semibold">Door Handles</td><td>{config.doorHandles}</td></tr>
            <tr><td className="font-semibold">Exhaust Style</td><td>{config.exhaustStyle}</td></tr>
            <tr><td className="font-semibold">Upholstery</td><td>{config.upholstery}</td></tr>
            <tr><td className="font-semibold">Seat Type</td><td>{config.seatType}</td></tr>
            <tr><td className="font-semibold">Ambient Lighting</td><td>{config.ambientLighting}</td></tr>
            <tr><td className="font-semibold">Dashboard Layout</td><td>{config.dashboardLayout}</td></tr>
            <tr><td className="font-semibold">Cabin Color Combo</td><td>{config.cabinColorCombo}</td></tr>
            <tr><td className="font-semibold">Steering</td><td>{config.steering}</td></tr>
            <tr><td className="font-semibold">Sunroof</td><td>{config.sunroof}</td></tr>
            <tr><td className="font-semibold">Infotainment</td><td>{config.infotainment}</td></tr>
            <tr><td className="font-semibold">Wireless Charging</td><td>{config.wirelessCharging ? 'Yes' : 'No'}</td></tr>
            <tr><td className="font-semibold">Connectivity</td><td>{config.connectivity.join(', ')}</td></tr>
            <tr><td className="font-semibold">Voice Assistant</td><td>{config.voiceAssistant ? 'Yes' : 'No'}</td></tr>
            <tr><td className="font-semibold">Smart Tech</td><td>{config.smartTech.join(', ')}</td></tr>
            <tr><td className="font-semibold">Airbags</td><td>{config.airbags}</td></tr>
            <tr><td className="font-semibold">Anti-theft</td><td>{config.antiTheft}</td></tr>
            <tr><td className="font-semibold">Crash SOS</td><td>{config.crashSOS ? 'Yes' : 'No'}</td></tr>
            <tr><td className="font-semibold">TPMS</td><td>{config.tpms ? 'Yes' : 'No'}</td></tr>
            <tr><td className="font-semibold">ISOFIX</td><td>{config.isofix ? 'Yes' : 'No'}</td></tr>
            <tr><td className="font-semibold">Tow Hitch</td><td>{config.towHitch ? 'Yes' : 'No'}</td></tr>
            <tr><td className="font-semibold">Roof Rack</td><td>{config.roofRack ? 'Yes' : 'No'}</td></tr>
            <tr><td className="font-semibold">Number Plate</td><td>{config.numberPlate}</td></tr>
            <tr><td className="font-semibold">Special Requests</td><td>{config.specialRequests}</td></tr>
          </tbody>
        </table>
      </div>

      <div className="text-xl md:text-2xl font-bold text-white mt-6 md:mt-8">Total Price: <span className="text-[#007BFF]">₹{price.toLocaleString()}</span></div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mt-6 md:mt-8">
        <button onClick={handleSave} className="bg-[#007BFF] hover:bg-[#0056CC] text-white px-4 md:px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 text-sm md:text-base">Save Configuration</button>
        <button onClick={handleDownload} className="bg-white/10 hover:bg-white/20 text-white px-4 md:px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 border border-white/20 text-sm md:text-base">Download PDF Summary</button>
        <button onClick={handleSubmit} className="bg-gradient-to-r from-[#007BFF] to-[#00D4FF] text-white px-4 md:px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 text-sm md:text-base">Submit for Build</button>
      </div>
    </div>
  );
};

export default Step8Summary;