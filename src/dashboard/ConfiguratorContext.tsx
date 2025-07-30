import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CarConfig = {
  // Step 1
  bodyStyle: string;
  baseVariant: string;
  budget: number;
  transmission: string;
  // Step 2
  engineType: string;
  engineSize: string;
  driveType: string;
  turbo: boolean;
  maxSpeed: number;
  zeroToHundred: string;
  evBattery: string;
  fastCharging: boolean;
  range: number;
  // Step 3
  exteriorColor: string;
  paintFinish: string;
  roofType: string;
  spoiler: string;
  rims: string;
  rimSize: number;
  tyres: string;
  doorHandles: string;
  exhaustStyle: string;
  // Step 4
  upholstery: string;
  seatType: string;
  ambientLighting: string;
  dashboardLayout: string;
  cabinColorCombo: string;
  steering: string;
  sunroof: string;
  // Step 5
  infotainment: string;
  wirelessCharging: boolean;
  connectivity: string[];
  voiceAssistant: boolean;
  smartTech: string[];
  // Step 6
  airbags: number;
  antiTheft: string;
  crashSOS: boolean;
  tpms: boolean;
  isofix: boolean;
  // Step 7
  towHitch: boolean;
  roofRack: boolean;
  customLogo: File | null;
  numberPlate: string;
  specialRequests: string;
};

const defaultConfig: CarConfig = {
  bodyStyle: '',
  baseVariant: '',
  budget: 500000,
  transmission: '',
  engineType: '',
  engineSize: '',
  driveType: '',
  turbo: false,
  maxSpeed: 200,
  zeroToHundred: '',
  evBattery: '',
  fastCharging: false,
  range: 200,
  exteriorColor: '#007BFF',
  paintFinish: '',
  roofType: '',
  spoiler: '',
  rims: '',
  rimSize: 18,
  tyres: '',
  doorHandles: '',
  exhaustStyle: '',
  upholstery: '',
  seatType: '',
  ambientLighting: '',
  dashboardLayout: '',
  cabinColorCombo: '',
  steering: '',
  sunroof: '',
  infotainment: '',
  wirelessCharging: false,
  connectivity: [],
  voiceAssistant: false,
  smartTech: [],
  airbags: 2,
  antiTheft: '',
  crashSOS: false,
  tpms: false,
  isofix: false,
  towHitch: false,
  roofRack: false,
  customLogo: null,
  numberPlate: '',
  specialRequests: '',
};

const ConfiguratorContext = createContext<{
  config: CarConfig;
  setConfig: React.Dispatch<React.SetStateAction<CarConfig>>;
}>({
  config: defaultConfig,
  setConfig: () => {},
});

export const useConfigurator = () => useContext(ConfiguratorContext);

export const ConfiguratorProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<CarConfig>(defaultConfig);
  return (
    <ConfiguratorContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfiguratorContext.Provider>
  );
};