export type CityId = 
  | 'new_delhi' 
  | 'mumbai' 
  | 'jaipur' 
  | 'bengaluru'
  | 'ahmedabad'
  | 'hyderabad'
  | 'chennai'
  | 'kolkata'
  | 'pune'
  | 'surat'
  | 'lucknow'
  | 'kanpur'
  | 'nagpur'
  | 'indore'
  | 'bhopal'
  | 'patna'
  | 'vadodara'
  | 'ludhiana'
  | 'agra'
  | 'varanasi';

export interface CityMeta {
  id: CityId;
  name: string;
  state: string;
  isRealData: boolean;
  meanLst: number;
  maxLst: number;
  uhiIntensity: number;
  hotspotAreaKm2: number;
  totalCells: number;
  populationEst: string;
  coordinates: [number, number];
  bounds: {
    latMin: number;
    latMax: number;
    lngMin: number;
    lngMax: number;
  };
}

export type HeatTier = 'cool' | 'normal' | 'moderate' | 'elevated' | 'high' | 'critical';

export interface HeatTierInfo {
  tier: HeatTier;
  label: string;
  tempRange: string;
  minTemp: number;
  maxTemp: number;
  color: string;
  description: string;
}

export interface GridCell {
  id: string;
  r: number;
  c: number;
  lat: number;
  lng: number;
  lstObserved: number;
  tier: HeatTier;
  population: number;
  popDensityPct: number;
  greenDeficitPct: number;
  buildingDensityPct: number;
  waterFraction: number;
  ndbi: number;
  ndvi: number;
  elevation: number;
  zoneId: string;
  suitability: {
    treeCover: number;
    coolRoofs: number;
    shadeStructures: number;
    coolPavements: number;
    coolingCentre: number;
  };
}

export interface ZoneRisk {
  zoneId: string;
  name: string;
  cellCount: number;
  meanLst: number;
  p90Lst: number;
  population: number;
  hazardScore: number;
  exposureScore: number;
  vulnerabilityScore: number;
  compositeRisk: number;
  rank: number;
}

export interface HeldOutMetric {
  cityId: CityId;
  cityName: string;
  pearsonR: number;
  rmse: number;
  bias: number;
  baselineR: number;
  conformalCoverage: number;
  blockCvR: [number, number];
  blockCvRmse: [number, number];
}

export interface ShapDriver {
  feature: string;
  name: string;
  meanAbsShap: number;
  direction: 'heats' | 'cools';
  unit: string;
  description: string;
}

export interface InterventionSpec {
  id: string;
  name: string;
  coolingLow: number;
  coolingHigh: number;
  coolingMid: number;
  yearsToEffect: number;
  costPerCellLakh: number;
  description: string;
  targetMechanism: string;
}

export interface ScenarioPreset {
  id: string;
  name: string;
  description: string;
  intensities: {
    treeCover: number;
    coolRoofs: number;
    shadeStructures: number;
    coolPavements: number;
    coolingCentres: number;
  };
  targetTiers: HeatTier[];
}

export interface SimulationResult {
  coolingLow: number;
  coolingMid: number;
  coolingHigh: number;
  totalCostLakh: number;
  totalCostCrore: number;
  peopleProtected: number;
  protectedCellsCount: number;
  costPerPersonInr: number;
  avgYearsToFullEffect: number;
  interventionBreakdown: {
    treeCoverCells: number;
    coolRoofCells: number;
    shadeStructureCells: number;
    coolPavementCells: number;
    coolingCentreCells: number;
  };
}

export interface DataSourceSpec {
  name: string;
  source: string;
  resolution: string;
  temporalWindow: string;
  license: string;
  derivedFeatures: string[];
  caveats: string;
}

export interface AwsArchNode {
  id: string;
  name: string;
  service: string;
  category: 'online' | 'daily' | 'pipeline' | 'operations';
  samResource: string;
  role: string;
  sourceModule: string;
  status: 'designed' | 'validated' | 'addition' | 'deployed';
  details: string;
}
