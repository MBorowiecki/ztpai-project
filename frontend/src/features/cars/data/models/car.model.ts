import { Engine } from 'features/engines/data/models/engine.models';

export enum CarBodyType {
  HATCHBACK = 'Hatchback',
  SEDAN = 'Sedan',
  COUPE = 'Coupe',
  CONVERTIBLE = 'Convertible',
  SUV = 'SUV',
  PICKUP = 'Pickup'
}

export enum CarBodyMaterial {
  STEEL = 'Steel',
  ALUMINIUM = 'Aluminium',
  CARBON_FIBER = 'Carbon Fiber',
  PLASTIC = 'Plastic'
}

export enum CarSegment {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  S = 'S',
  M = 'M',
  J = 'J'
}

export interface Car {
  id: number;
  name: string;
  body_type: CarBodyType;
  number_of_seats: number;
  car_body_material: CarBodyMaterial;
  cost: number;
  car_segment: CarSegment;
  in_production: boolean;
  length: string;
  user: {
    id: number;
  };
  engine?: Engine;
}

export interface UpdateCar {
  id: number;
  name?: string;
  body_type?: CarBodyType;
  number_of_seats?: number;
  car_body_material?: CarBodyMaterial;
  cost?: number;
  car_segment?: CarSegment;
  in_production?: boolean;
  length?: number;
  userId: string;
  engineId?: number;
}

export interface NewCar {
  name: string;
  body_type: CarBodyType;
  number_of_seats: number;
  car_body_material: CarBodyMaterial;
  car_segment: CarSegment;
  length: number;
  userId: string;
  engineId?: number | string;
  in_production?: boolean;
}
