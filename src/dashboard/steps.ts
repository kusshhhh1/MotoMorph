import React from 'react';
import Step1BodyModel from './steps/Step1BodyModel';
import Step2EnginePerformance from './steps/Step2EnginePerformance';
import Step3Exterior from './steps/Step3Exterior';
import Step4Interior from './steps/Step4Interior';
import Step5Technology from './steps/Step5Technology';
import Step6Safety from './steps/Step6Safety';
import Step7AddOns from './steps/Step7AddOns';
import Step8Summary from './steps/Step8Summary';

export const stepNames = [
  'Select Body & Model',
  'Engine & Performance',
  'Exterior',
  'Interior',
  'Technology & Smart Features',
  'Safety',
  'Accessories & Add-Ons',
  'Summary',
];

export const stepComponents = [
  Step1BodyModel,
  Step2EnginePerformance,
  Step3Exterior,
  Step4Interior,
  Step5Technology,
  Step6Safety,
  Step7AddOns,
  Step8Summary
];