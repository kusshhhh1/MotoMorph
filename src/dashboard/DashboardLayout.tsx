import React, { useState } from 'react';
import { ConfiguratorProvider } from './ConfiguratorContext';
import { stepNames, stepComponents } from './steps';
import Car3DPreview from './Car3DPreview';
import { Menu, X } from 'lucide-react';

interface DashboardLayoutProps {
  user: { id: number; name: string; email: string } | null;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, onLogout }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const StepComponent = stepComponents[currentStep];

  return (
    <ConfiguratorProvider>
      <div className="min-h-screen bg-black text-white font-['Poppins']">
        {/* Header */}
        <div className="bg-black/90 border-b border-white/10 p-4 md:p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              {/* Logo placeholder */}
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#007BFF] rounded-full flex items-center justify-center font-bold text-lg md:text-xl">M</div>
              <h1 className="text-lg md:text-2xl font-bold font-motomorph">Motomorph Configurator</h1>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <span className="text-white/70 text-sm md:text-base hidden sm:block">Welcome, {user?.name}!</span>
              <button 
                onClick={onLogout}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors flex items-center space-x-2 text-sm md:text-base"
              >
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Step Navigation */}
        <div className="md:hidden bg-black/50 border-b border-white/10 p-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {stepNames.map((step, idx) => (
              <button
                key={step}
                className={`px-3 py-2 rounded-full font-semibold transition-all duration-200 text-xs whitespace-nowrap flex-shrink-0 ${
                  idx === currentStep
                    ? 'bg-[#007BFF] text-white shadow-lg scale-105'
                    : 'bg-white/10 text-white/60 hover:bg-[#007BFF]/30'
                }`}
                onClick={() => setCurrentStep(idx)}
              >
                {step.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full min-h-[calc(100vh-120px)]">
          {/* Left: Configurator Steps */}
          <div className="w-full lg:w-1/2 bg-black/80 p-4 md:p-6 order-2 lg:order-1">
            {/* Desktop Step Tabs */}
            <div className="hidden md:flex space-x-2 mb-6 overflow-x-auto">
              {stepNames.map((step, idx) => (
                <button
                  key={step}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 text-sm whitespace-nowrap ${
                    idx === currentStep
                      ? 'bg-[#007BFF] text-white shadow-lg scale-105'
                      : 'bg-white/10 text-white/60 hover:bg-[#007BFF]/30'
                  }`}
                  onClick={() => setCurrentStep(idx)}
                >
                  {step}
                </button>
              ))}
            </div>

            {/* Step Content */}
            <div className="mt-4 md:mt-8 animate-fade-in">
              <StepComponent />
            </div>
          </div>

          {/* Right: 3D Car Preview */}
          <div className="w-full lg:w-1/2 bg-black/70 p-4 md:p-6 flex items-center justify-center min-h-[300px] md:min-h-[400px] order-1 lg:order-2">
            <div className="w-full h-[250px] md:h-[350px] rounded-2xl border border-[#007BFF]/30 shadow-2xl overflow-hidden bg-gradient-to-br from-[#222] to-[#111]">
              <Car3DPreview />
            </div>
          </div>
        </div>
      </div>
    </ConfiguratorProvider>
  );
};

export default DashboardLayout;