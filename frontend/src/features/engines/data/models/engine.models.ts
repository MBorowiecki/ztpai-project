export interface NewEngine {
  name: string;
  cylinders: number;
  capacity: string;
  weight: number;
  power: string;
  userId: number;
}

export interface EngineValuationResponse {
  valuation: number;
  powerCoefficient: number;
}

export interface Engine {
  id: number;
  name: string;
  cylinders: number;
  power: number;
  capacity: number;
  cost: number;
  weight: number;
  userId: number;
  in_production: boolean;
}
