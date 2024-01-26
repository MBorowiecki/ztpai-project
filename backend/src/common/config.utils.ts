import {
  CarBodyMaterial,
  CarBodyType,
  CarSegment
} from 'src/cars/entities/car.entity';

export const bestCylinderVolume = 400;
export const baseCylinderVolumeCost = 100;
export const baseCylinderVolumeWeight = 2;
export const engineCostMultiplier = 4;

export const carSegmentCostMultiplier: Record<CarSegment, number> = {
  A: 0.5,
  B: 0.75,
  C: 1,
  D: 1.25,
  E: 1.5,
  F: 1.75,
  S: 2,
  M: 2.25,
  J: 2.5
};
export const carBodyTypeCostMultiplier: Record<CarBodyType, number> = {
  Hatchback: 0.75,
  Sedan: 1,
  Coupe: 1.25,
  Convertible: 1.5,
  SUV: 1.75,
  Pickup: 2.25
};
export const carBodyMaterialCostMultiplier: Record<CarBodyMaterial, number> = {
  Steel: 1,
  Aluminium: 1.25,
  'Carbon Fiber': 1.5,
  Plastic: 0.75
};
export const baseCarPricePerMeter = 1000;
