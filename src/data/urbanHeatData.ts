import {
  CityMeta,
  CityId,
  HeatTier,
  HeatTierInfo,
  GridCell,
  ZoneRisk,
  HeldOutMetric,
  ShapDriver,
  InterventionSpec,
  ScenarioPreset,
  SimulationResult,
  DataSourceSpec,
  AwsArchNode,
} from '../types/urbanHeat';

export const CITIES: CityMeta[] = [
  {
    id: 'new_delhi',
    name: 'New Delhi',
    state: 'National Capital Territory',
    isRealData: true,
    meanLst: 43.8,
    maxLst: 56.4,
    uhiIntensity: 8.0,
    hotspotAreaKm2: 374.8,
    totalCells: 5972,
    populationEst: '19.8M (Meta HRSL)',
    coordinates: [28.6139, 77.2090],
    bounds: {
      latMin: 28.40,
      latMax: 28.88,
      lngMin: 76.84,
      lngMax: 77.34,
    },
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    isRealData: true,
    meanLst: 34.2,
    maxLst: 45.1,
    uhiIntensity: 4.8,
    hotspotAreaKm2: 241.6,
    totalCells: 4890,
    populationEst: '12.4M (Meta HRSL)',
    coordinates: [19.0760, 72.8777],
    bounds: {
      latMin: 18.89,
      latMax: 19.27,
      lngMin: 72.77,
      lngMax: 73.02,
    },
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    isRealData: true,
    meanLst: 41.5,
    maxLst: 52.3,
    uhiIntensity: 6.9,
    hotspotAreaKm2: 289.4,
    totalCells: 4118,
    populationEst: '3.9M (Meta HRSL)',
    coordinates: [26.9124, 75.7873],
    bounds: {
      latMin: 26.75,
      latMax: 27.05,
      lngMin: 75.65,
      lngMax: 75.95,
    },
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    isRealData: true,
    meanLst: 31.8,
    maxLst: 41.2,
    uhiIntensity: 3.9,
    hotspotAreaKm2: 218.2,
    totalCells: 4701,
    populationEst: '10.5M (Meta HRSL)',
    coordinates: [12.9716, 77.5946],
    bounds: {
      latMin: 12.83,
      latMax: 13.14,
      lngMin: 77.45,
      lngMax: 77.74,
    },
  },
  // 16 Synthetic Preview Cities
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    state: 'Gujarat',
    isRealData: false,
    meanLst: 42.1,
    maxLst: 53.7,
    uhiIntensity: 6.5,
    hotspotAreaKm2: 260.0,
    totalCells: 3500,
    populationEst: '7.8M (Synthetic)',
    coordinates: [23.0225, 72.5714],
    bounds: { latMin: 22.9, latMax: 23.2, lngMin: 72.4, lngMax: 72.7 },
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    isRealData: false,
    meanLst: 39.8,
    maxLst: 49.5,
    uhiIntensity: 5.7,
    hotspotAreaKm2: 310.0,
    totalCells: 4200,
    populationEst: '9.4M (Synthetic)',
    coordinates: [17.3850, 78.4867],
    bounds: { latMin: 17.2, latMax: 17.5, lngMin: 78.3, lngMax: 78.6 },
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    isRealData: false,
    meanLst: 36.4,
    maxLst: 46.2,
    uhiIntensity: 4.5,
    hotspotAreaKm2: 225.0,
    totalCells: 3800,
    populationEst: '8.7M (Synthetic)',
    coordinates: [13.0827, 80.2707],
    bounds: { latMin: 12.9, latMax: 13.2, lngMin: 80.1, lngMax: 80.4 },
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    isRealData: false,
    meanLst: 35.8,
    maxLst: 45.9,
    uhiIntensity: 5.1,
    hotspotAreaKm2: 290.0,
    totalCells: 4100,
    populationEst: '14.2M (Synthetic)',
    coordinates: [22.5726, 88.3639],
    bounds: { latMin: 22.4, latMax: 22.7, lngMin: 88.2, lngMax: 88.5 },
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    isRealData: false,
    meanLst: 35.1,
    maxLst: 44.8,
    uhiIntensity: 4.6,
    hotspotAreaKm2: 240.0,
    totalCells: 3600,
    populationEst: '6.2M (Synthetic)',
    coordinates: [18.5204, 73.8567],
    bounds: { latMin: 18.4, latMax: 18.7, lngMin: 73.7, lngMax: 74.0 },
  },
  {
    id: 'surat',
    name: 'Surat',
    state: 'Gujarat',
    isRealData: false,
    meanLst: 37.9,
    maxLst: 47.6,
    uhiIntensity: 5.0,
    hotspotAreaKm2: 210.0,
    totalCells: 3200,
    populationEst: '6.0M (Synthetic)',
    coordinates: [21.1702, 72.8311],
    bounds: { latMin: 21.0, latMax: 21.3, lngMin: 72.7, lngMax: 73.0 },
  },
  {
    id: 'lucknow',
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    isRealData: false,
    meanLst: 41.2,
    maxLst: 51.0,
    uhiIntensity: 6.2,
    hotspotAreaKm2: 275.0,
    totalCells: 3700,
    populationEst: '3.6M (Synthetic)',
    coordinates: [26.8467, 80.9462],
    bounds: { latMin: 26.7, latMax: 27.0, lngMin: 80.8, lngMax: 81.1 },
  },
  {
    id: 'kanpur',
    name: 'Kanpur',
    state: 'Uttar Pradesh',
    isRealData: false,
    meanLst: 42.0,
    maxLst: 52.4,
    uhiIntensity: 6.7,
    hotspotAreaKm2: 260.0,
    totalCells: 3400,
    populationEst: '3.2M (Synthetic)',
    coordinates: [26.4499, 80.3319],
    bounds: { latMin: 26.3, latMax: 26.6, lngMin: 80.2, lngMax: 80.5 },
  },
  {
    id: 'nagpur',
    name: 'Nagpur',
    state: 'Maharashtra',
    isRealData: false,
    meanLst: 43.1,
    maxLst: 53.9,
    uhiIntensity: 7.1,
    hotspotAreaKm2: 280.0,
    totalCells: 3600,
    populationEst: '2.8M (Synthetic)',
    coordinates: [21.1458, 79.0882],
    bounds: { latMin: 21.0, latMax: 21.3, lngMin: 78.9, lngMax: 79.2 },
  },
  {
    id: 'indore',
    name: 'Indore',
    state: 'Madhya Pradesh',
    isRealData: false,
    meanLst: 40.5,
    maxLst: 50.8,
    uhiIntensity: 5.9,
    hotspotAreaKm2: 230.0,
    totalCells: 3100,
    populationEst: '2.5M (Synthetic)',
    coordinates: [22.7196, 75.8577],
    bounds: { latMin: 22.6, latMax: 22.9, lngMin: 75.7, lngMax: 76.0 },
  },
  {
    id: 'bhopal',
    name: 'Bhopal',
    state: 'Madhya Pradesh',
    isRealData: false,
    meanLst: 41.0,
    maxLst: 51.5,
    uhiIntensity: 6.0,
    hotspotAreaKm2: 240.0,
    totalCells: 3300,
    populationEst: '2.2M (Synthetic)',
    coordinates: [23.2599, 77.4126],
    bounds: { latMin: 23.1, latMax: 23.4, lngMin: 77.3, lngMax: 77.6 },
  },
  {
    id: 'patna',
    name: 'Patna',
    state: 'Bihar',
    isRealData: false,
    meanLst: 39.5,
    maxLst: 49.0,
    uhiIntensity: 5.4,
    hotspotAreaKm2: 215.0,
    totalCells: 2900,
    populationEst: '2.4M (Synthetic)',
    coordinates: [25.5941, 85.1376],
    bounds: { latMin: 25.4, latMax: 25.7, lngMin: 85.0, lngMax: 85.3 },
  },
  {
    id: 'vadodara',
    name: 'Vadodara',
    state: 'Gujarat',
    isRealData: false,
    meanLst: 40.2,
    maxLst: 50.1,
    uhiIntensity: 5.8,
    hotspotAreaKm2: 195.0,
    totalCells: 2700,
    populationEst: '2.1M (Synthetic)',
    coordinates: [22.3072, 73.1812],
    bounds: { latMin: 22.2, latMax: 22.5, lngMin: 73.0, lngMax: 73.3 },
  },
  {
    id: 'ludhiana',
    name: 'Ludhiana',
    state: 'Punjab',
    isRealData: false,
    meanLst: 41.8,
    maxLst: 52.1,
    uhiIntensity: 6.4,
    hotspotAreaKm2: 220.0,
    totalCells: 3000,
    populationEst: '1.9M (Synthetic)',
    coordinates: [30.9010, 75.8573],
    bounds: { latMin: 30.8, latMax: 31.1, lngMin: 75.7, lngMax: 76.0 },
  },
  {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    isRealData: false,
    meanLst: 42.5,
    maxLst: 53.0,
    uhiIntensity: 6.8,
    hotspotAreaKm2: 205.0,
    totalCells: 2800,
    populationEst: '1.8M (Synthetic)',
    coordinates: [27.1767, 78.0081],
    bounds: { latMin: 27.0, latMax: 27.3, lngMin: 77.9, lngMax: 78.2 },
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    isRealData: false,
    meanLst: 40.9,
    maxLst: 51.2,
    uhiIntensity: 6.1,
    hotspotAreaKm2: 185.0,
    totalCells: 2500,
    populationEst: '1.6M (Synthetic)',
    coordinates: [25.3176, 82.9739],
    bounds: { latMin: 25.2, latMax: 25.5, lngMin: 82.8, lngMax: 83.1 },
  },
];

export const HEAT_TIERS: HeatTierInfo[] = [
  {
    tier: 'cool',
    label: 'Cool / Water',
    tempRange: '< 36°C',
    minTemp: 0,
    maxTemp: 36,
    color: '#3b6fe0',
    description: 'Bodies of water, thick canopy, agricultural perimeter.',
  },
  {
    tier: 'normal',
    label: 'Normal',
    tempRange: '36 – 39°C',
    minTemp: 36,
    maxTemp: 39,
    color: '#1f9d8a',
    description: 'Well-vegetated urban parks, peri-urban open land.',
  },
  {
    tier: 'moderate',
    label: 'Moderate',
    tempRange: '39 – 42°C',
    minTemp: 39,
    maxTemp: 42,
    color: '#2fa24f',
    description: 'Suburban residential, tree-lined avenues.',
  },
  {
    tier: 'elevated',
    label: 'Elevated',
    tempRange: '42 – 45°C',
    minTemp: 42,
    maxTemp: 45,
    color: '#f0be1a',
    description: 'Dense residential, paved commercial corridors.',
  },
  {
    tier: 'high',
    label: 'High Hotspot',
    tempRange: '45 – 48°C',
    minTemp: 45,
    maxTemp: 48,
    color: '#f48a1f',
    description: 'Mean + 1 std dev: Bare soil, industrial roofing, transport hubs.',
  },
  {
    tier: 'critical',
    label: 'Critical Hotspot',
    tempRange: '> 48°C',
    minTemp: 48,
    maxTemp: 70,
    color: '#e0301e',
    description: 'Mean + 2 std dev: Heavy impervious, asphalt yards, dark industrial slabs.',
  },
];

export function getTierFromLst(lst: number): HeatTier {
  if (lst < 36) return 'cool';
  if (lst < 39) return 'normal';
  if (lst < 42) return 'moderate';
  if (lst < 45) return 'elevated';
  if (lst < 48) return 'high';
  return 'critical';
}

export const HELD_OUT_METRICS: HeldOutMetric[] = [
  {
    cityId: 'new_delhi',
    cityName: 'New Delhi',
    pearsonR: 0.790,
    rmse: 2.397,
    bias: -1.917,
    baselineR: -0.306,
    conformalCoverage: 82,
    blockCvR: [0.91, 0.96],
    blockCvRmse: [0.92, 1.15],
  },
  {
    cityId: 'mumbai',
    cityName: 'Mumbai',
    pearsonR: 0.885,
    rmse: 3.513,
    bias: 0.123,
    baselineR: -0.687,
    conformalCoverage: 73,
    blockCvR: [0.93, 0.98],
    blockCvRmse: [0.88, 1.05],
  },
  {
    cityId: 'jaipur',
    cityName: 'Jaipur',
    pearsonR: 0.721,
    rmse: 3.613,
    bias: -3.165,
    baselineR: -0.273,
    conformalCoverage: 74,
    blockCvR: [0.88, 0.94],
    blockCvRmse: [0.98, 1.22],
  },
  {
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    pearsonR: 0.804,
    rmse: 3.909,
    bias: 3.697,
    baselineR: -0.486,
    conformalCoverage: 81,
    blockCvR: [0.89, 0.95],
    blockCvRmse: [0.94, 1.18],
  },
];

export const SHAP_DRIVERS: ShapDriver[] = [
  {
    feature: 'water_fraction',
    name: 'Water fraction',
    meanAbsShap: 1.23,
    direction: 'cools',
    unit: 'fraction (0–1)',
    description: 'ESA WorldCover water surface category; strong localized cooling influence in dry hot-season composites.',
  },
  {
    feature: 'ndbi',
    name: 'NDBI (built-up index)',
    meanAbsShap: 1.20,
    direction: 'heats',
    unit: 'normalized index (-1 to +1)',
    description: 'Copernicus Sentinel-2 Normalized Difference Built-up Index; thermal absorption from concrete, brick, and asphalt.',
  },
  {
    feature: 'temp_air_max',
    name: 'Max air temperature',
    meanAbsShap: 0.82,
    direction: 'heats',
    unit: '°C (ambient ERA5)',
    description: 'City-level Open-Meteo ERA5 scene-date maximum air temperature.',
  },
  {
    feature: 'mndwi',
    name: 'MNDWI (water index)',
    meanAbsShap: 0.57,
    direction: 'cools',
    unit: 'normalized index (-1 to +1)',
    description: 'Modified Normalized Difference Water Index; captures surface moisture and micro-wetland signatures.',
  },
  {
    feature: 'elevation',
    name: 'Elevation',
    meanAbsShap: 0.46,
    direction: 'cools',
    unit: 'meters (DEM GLO-30)',
    description: 'Copernicus GLO-30 terrain elevation; lapse-rate cooling and topographically exposed breezes.',
  },
  {
    feature: 'ndvi',
    name: 'NDVI (vegetation index)',
    meanAbsShap: 0.41,
    direction: 'cools',
    unit: 'normalized index (-1 to +1)',
    description: 'Copernicus Sentinel-2 Normalized Difference Vegetation Index; canopy evapotranspiration cooling.',
  },
  {
    feature: 'impervious_fraction',
    name: 'Impervious fraction',
    meanAbsShap: 0.38,
    direction: 'heats',
    unit: 'fraction (0–1)',
    description: 'ESA WorldCover 2021 impervious surface share within cell.',
  },
  {
    feature: 'tree_fraction',
    name: 'Tree cover fraction',
    meanAbsShap: 0.35,
    direction: 'cools',
    unit: 'fraction (0–1)',
    description: 'WorldCover 2021 tree canopy coverage.',
  },
  {
    feature: 'pop_density',
    name: 'Population density',
    meanAbsShap: 0.28,
    direction: 'heats',
    unit: 'persons / km²',
    description: 'Meta HRSL proxy for human density, anthropogenic heat, and built settlement density.',
  },
  {
    feature: 'slope',
    name: 'Terrain slope',
    meanAbsShap: 0.19,
    direction: 'cools',
    unit: 'degrees',
    description: 'Copernicus DEM slope angle.',
  },
];

export const INTERVENTIONS: InterventionSpec[] = [
  {
    id: 'tree_cover',
    name: 'Tree cover',
    coolingLow: -0.8,
    coolingHigh: -3.0,
    coolingMid: -1.9,
    yearsToEffect: 8,
    costPerCellLakh: 120,
    description: 'Urban forestry, native street trees, and pocket micro-forests. Evapotranspiration + shade.',
    targetMechanism: 'Evapotranspiration & canopy shading of surface radiation',
  },
  {
    id: 'cool_roofs',
    name: 'Cool roofs',
    coolingLow: -0.4,
    coolingHigh: -1.5,
    coolingMid: -0.95,
    yearsToEffect: 0,
    costPerCellLakh: 60,
    description: 'High-albedo reflective coatings & lime-wash on flat roofs in dense settlements.',
    targetMechanism: 'Solar reflectance (albedo > 0.70), immediate thermal barrier',
  },
  {
    id: 'shade_structures',
    name: 'Shade structures',
    coolingLow: -0.5,
    coolingHigh: -2.0,
    coolingMid: -1.25,
    yearsToEffect: 0,
    costPerCellLakh: 45,
    description: 'Canopies at bus transit stops, vendor clusters, pedestrian paths, and open markets.',
    targetMechanism: 'Direct blockage of downwelling solar irradiance',
  },
  {
    id: 'cool_pavements',
    name: 'Cool pavements',
    coolingLow: -0.3,
    coolingHigh: -1.2,
    coolingMid: -0.75,
    yearsToEffect: 1,
    costPerCellLakh: 80,
    description: 'Permeable light-coloured paving & reflective sealants on parking lots and plazas.',
    targetMechanism: 'Increased albedo and evaporative cooling through permeable matrix',
  },
  {
    id: 'cooling_centre',
    name: 'Cooling centre',
    coolingLow: 0.0,
    coolingHigh: 0.0,
    coolingMid: 0.0,
    yearsToEffect: 0,
    costPerCellLakh: 25,
    description: 'Community shelters, air-cooled public halls, hydration points, and medical kits.',
    targetMechanism: 'Access to safe indoor thermal refuge (does not reduce outdoor LST)',
  },
];

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'balanced',
    name: 'Balanced Heatwave Defense',
    description: 'Moderate mix of cool roofs on high hotspots with targeted transit shade and cooling centres.',
    intensities: {
      treeCover: 0.35,
      coolRoofs: 0.50,
      shadeStructures: 0.40,
      coolPavements: 0.25,
      coolingCentres: 0.40,
    },
    targetTiers: ['high', 'critical'],
  },
  {
    id: 'cool_roof_priority',
    name: 'Cool Roof Fast Track',
    description: 'Maximizes immediate relief on dense residential and informal roofing with low capital lag.',
    intensities: {
      treeCover: 0.15,
      coolRoofs: 0.85,
      shadeStructures: 0.30,
      coolPavements: 0.20,
      coolingCentres: 0.30,
    },
    targetTiers: ['elevated', 'high', 'critical'],
  },
  {
    id: 'maximum_tree_canopy',
    name: 'Long-Term Canopy Expansion',
    description: 'High investment in urban forestry and micro-forests along road buffers (8-year growth ramp).',
    intensities: {
      treeCover: 0.75,
      coolRoofs: 0.30,
      shadeStructures: 0.20,
      coolPavements: 0.30,
      coolingCentres: 0.20,
    },
    targetTiers: ['high', 'critical'],
  },
  {
    id: 'critical_hotspot_shield',
    name: 'Critical Hotspot Emergency Shield',
    description: 'Focuses 100% of resources exclusively on Tier 6 Critical Hotspot zones (>48°C) with maximum intervention.',
    intensities: {
      treeCover: 0.60,
      coolRoofs: 0.80,
      shadeStructures: 0.70,
      coolPavements: 0.50,
      coolingCentres: 0.80,
    },
    targetTiers: ['critical'],
  },
];

// Realistic 500m grid generator for New Delhi (16x16 window sample of central-east Delhi)
export function generateDelhiGridSample(): GridCell[] {
  const cells: GridCell[] = [];
  const baseLat = 28.52;
  const baseLng = 77.08;
  const stepLat = 0.0045; // ~500m
  const stepLng = 0.0051; // ~500m
  
  // Seed-based procedural values simulating real Landsat composite of Delhi
  for (let r = 0; r < 14; r++) {
    for (let c = 0; c < 14; c++) {
      const lat = baseLat + r * stepLat;
      const lng = baseLng + c * stepLng;
      
      // Distance from Yamuna river corridor (c ~ 11)
      const riverDist = Math.abs(c - 11);
      const isWater = riverDist === 0 && r > 2 && r < 11;
      
      // Ridge area (c ~ 3, r ~ 6)
      const ridgeDist = Math.sqrt(Math.pow(r - 6, 2) + Math.pow(c - 3, 2));
      const isGreen = ridgeDist < 2.5;

      // Industrial / Dense areas (Anand Parbat, Mayapuri, Okhla, Wazirpur)
      const isHotCore = (r > 8 && c > 5 && c < 10) || (r > 3 && r < 7 && c > 7 && c < 12);

      let lst: number;
      if (isWater) {
        lst = 33.2 + ((r * 7) % 5) * 0.4;
      } else if (isGreen) {
        lst = 37.8 + ((r + c) % 4) * 0.5;
      } else if (isHotCore) {
        lst = 48.6 + ((r * 13 + c * 17) % 11) * 0.7;
      } else {
        lst = 42.4 + ((r * 11 + c * 7) % 9) * 0.6;
      }

      const tier = getTierFromLst(lst);
      const zoneR = Math.floor(r / 4);
      const zoneC = Math.floor(c / 4);
      const zoneId = `Zone ${zoneR}-${zoneC}`;

      const population = Math.floor(3200 + ((r * 17 + c * 23) % 4500));
      const popDensityPct = Math.min(1.0, population / 7000);
      const greenDeficitPct = isWater ? 0.05 : isGreen ? 0.15 : Math.min(0.95, (lst - 34) / 20);
      const buildingDensityPct = isWater ? 0.0 : isGreen ? 0.2 : Math.min(0.9, (lst - 36) / 18);
      const waterFraction = isWater ? 0.75 : 0.02;
      const ndbi = (lst - 40) / 25;
      const ndvi = isGreen ? 0.65 : isWater ? 0.1 : Math.max(0.08, 0.45 - (lst - 36) / 30);
      const elevation = 210 + ((r + c) % 15) * 2;

      cells.push({
        id: `DEL-${r}-${c}`,
        r,
        c,
        lat,
        lng,
        lstObserved: parseFloat(lst.toFixed(1)),
        tier,
        population,
        popDensityPct,
        greenDeficitPct,
        buildingDensityPct,
        waterFraction,
        ndbi: parseFloat(ndbi.toFixed(2)),
        ndvi: parseFloat(ndvi.toFixed(2)),
        elevation,
        zoneId,
        suitability: {
          treeCover: isWater ? 0.0 : isGreen ? 0.4 : Math.max(0.1, 0.9 - buildingDensityPct * 0.8),
          coolRoofs: isWater ? 0.0 : Math.min(0.95, buildingDensityPct * 1.1),
          shadeStructures: isWater ? 0.0 : Math.min(0.85, popDensityPct * 0.9 + 0.1),
          coolPavements: isWater ? 0.0 : Math.min(0.8, (1 - greenDeficitPct) * 0.7 + 0.3),
          coolingCentre: isWater ? 0.0 : popDensityPct > 0.6 ? 0.9 : 0.4,
        },
      });
    }
  }
  return cells;
}

export function computeZoneRisks(cells: GridCell[]): ZoneRisk[] {
  const zonesMap = new Map<string, GridCell[]>();
  cells.forEach((cell) => {
    if (!zonesMap.has(cell.zoneId)) {
      zonesMap.set(cell.zoneId, []);
    }
    zonesMap.get(cell.zoneId)!.push(cell);
  });

  const rawZones: {
    zoneId: string;
    name: string;
    cellCount: number;
    meanLst: number;
    p90Lst: number;
    population: number;
    meanPopDensity: number;
    meanGreenDeficit: number;
    meanBuildingDensity: number;
  }[] = [];

  zonesMap.forEach((zCells, zId) => {
    if (zCells.length < 3) return; // Drop edge slivers per spec
    const totalPop = zCells.reduce((acc, c) => acc + c.population, 0);
    const lsts = zCells.map((c) => c.lstObserved).sort((a, b) => a - b);
    const meanLst = lsts.reduce((a, b) => a + b, 0) / lsts.length;
    const p90Idx = Math.floor(lsts.length * 0.9);
    const p90Lst = lsts[Math.min(p90Idx, lsts.length - 1)];

    rawZones.push({
      zoneId: zId,
      name: `Analysis ${zId}`,
      cellCount: zCells.length,
      meanLst: parseFloat(meanLst.toFixed(1)),
      p90Lst: parseFloat(p90Lst.toFixed(1)),
      population: totalPop,
      meanPopDensity: zCells.reduce((a, c) => a + c.popDensityPct, 0) / zCells.length,
      meanGreenDeficit: zCells.reduce((a, c) => a + c.greenDeficitPct, 0) / zCells.length,
      meanBuildingDensity: zCells.reduce((a, c) => a + c.buildingDensityPct, 0) / zCells.length,
    });
  });

  // Compute percentile ranks across zones
  const rankArr = (arr: number[]) => {
    const sorted = [...arr].sort((a, b) => a - b);
    return arr.map((v) => {
      const idx = sorted.indexOf(v);
      return idx / Math.max(1, sorted.length - 1);
    });
  };

  const meanLstRanks = rankArr(rawZones.map((z) => z.meanLst));
  const p90LstRanks = rankArr(rawZones.map((z) => z.p90Lst));
  const popRanks = rankArr(rawZones.map((z) => z.population));
  const popDensityRanks = rankArr(rawZones.map((z) => z.meanPopDensity));
  const greenDeficitRanks = rankArr(rawZones.map((z) => z.meanGreenDeficit));
  const buildingDensityRanks = rankArr(rawZones.map((z) => z.meanBuildingDensity));

  const intermediate = rawZones.map((z, i) => {
    const hazard = 0.6 * meanLstRanks[i] + 0.4 * p90LstRanks[i];
    const exposure = popRanks[i];
    const vulnerability =
      0.5 * popDensityRanks[i] + 0.3 * greenDeficitRanks[i] + 0.2 * buildingDensityRanks[i];
    const rawRisk = hazard * exposure * vulnerability;
    return {
      ...z,
      hazardScore: parseFloat((hazard * 100).toFixed(1)),
      exposureScore: parseFloat((exposure * 100).toFixed(1)),
      vulnerabilityScore: parseFloat((vulnerability * 100).toFixed(1)),
      rawRisk,
    };
  });

  const maxRawRisk = Math.max(...intermediate.map((z) => z.rawRisk), 0.001);

  const finalZones: ZoneRisk[] = intermediate
    .map((z) => ({
      zoneId: z.zoneId,
      name: z.name,
      cellCount: z.cellCount,
      meanLst: z.meanLst,
      p90Lst: z.p90Lst,
      population: z.population,
      hazardScore: z.hazardScore,
      exposureScore: z.exposureScore,
      vulnerabilityScore: z.vulnerabilityScore,
      compositeRisk: parseFloat(((z.rawRisk / maxRawRisk) * 100).toFixed(1)),
      rank: 1,
    }))
    .sort((a, b) => b.compositeRisk - a.compositeRisk)
    .map((z, idx) => ({ ...z, rank: idx + 1 }));

  return finalZones;
}

export function simulateScenario(
  cells: GridCell[],
  intensities: {
    treeCover: number;
    coolRoofs: number;
    shadeStructures: number;
    coolPavements: number;
    coolingCentres: number;
  },
  targetTiers: HeatTier[]
): {
  cooledCells: (GridCell & { coolingEstimated: number; lstSimulated: number })[];
  summary: SimulationResult;
} {
  let totalCostLakh = 0;
  let peopleProtected = 0;
  let protectedCellsCount = 0;
  let weightedYears = 0;
  let treeCells = 0;
  let roofCells = 0;
  let shadeCells = 0;
  let paveCells = 0;
  let centreCells = 0;

  const cooledCells = cells.map((cell) => {
    if (!targetTiers.includes(cell.tier)) {
      return {
        ...cell,
        coolingEstimated: 0,
        lstSimulated: cell.lstObserved,
      };
    }

    // Tree cooling (scaled by survival rate 0.7 per spec)
    const treeCooling =
      Math.abs(INTERVENTIONS[0].coolingMid) *
      cell.suitability.treeCover *
      intensities.treeCover *
      0.7;
    // Cool roof
    const roofCooling =
      Math.abs(INTERVENTIONS[1].coolingMid) *
      cell.suitability.coolRoofs *
      intensities.coolRoofs;
    // Shade
    const shadeCooling =
      Math.abs(INTERVENTIONS[2].coolingMid) *
      cell.suitability.shadeStructures *
      intensities.shadeStructures;
    // Pave
    const paveCooling =
      Math.abs(INTERVENTIONS[3].coolingMid) *
      cell.suitability.coolPavements *
      intensities.coolPavements;

    // Total cooling combined (clamped so as not to exceed physical sanity)
    const netCooling = Math.min(3.8, treeCooling + roofCooling + shadeCooling + paveCooling);

    // Calculate costs
    const cellTreeCost = INTERVENTIONS[0].costPerCellLakh * intensities.treeCover * cell.suitability.treeCover;
    const cellRoofCost = INTERVENTIONS[1].costPerCellLakh * intensities.coolRoofs * cell.suitability.coolRoofs;
    const cellShadeCost = INTERVENTIONS[2].costPerCellLakh * intensities.shadeStructures * cell.suitability.shadeStructures;
    const cellPaveCost = INTERVENTIONS[3].costPerCellLakh * intensities.coolPavements * cell.suitability.coolPavements;
    const cellCentreCost = intensities.coolingCentres > 0.3 && cell.suitability.coolingCentre > 0.5 ? INTERVENTIONS[4].costPerCellLakh : 0;

    const cellCost = cellTreeCost + cellRoofCost + cellShadeCost + cellPaveCost + cellCentreCost;
    totalCostLakh += cellCost;

    if (intensities.treeCover > 0.2 && cell.suitability.treeCover > 0.3) treeCells++;
    if (intensities.coolRoofs > 0.2 && cell.suitability.coolRoofs > 0.3) roofCells++;
    if (intensities.shadeStructures > 0.2 && cell.suitability.shadeStructures > 0.3) shadeCells++;
    if (intensities.coolPavements > 0.2 && cell.suitability.coolPavements > 0.3) paveCells++;
    if (cellCentreCost > 0) centreCells++;

    // Threshold of 0.2°C to count as protected per spec
    if (netCooling >= 0.2) {
      peopleProtected += cell.population;
      protectedCellsCount++;
      weightedYears += (netCooling > 1.2 ? 6 : 2);
    }

    return {
      ...cell,
      coolingEstimated: parseFloat(netCooling.toFixed(2)),
      lstSimulated: parseFloat((cell.lstObserved - netCooling).toFixed(1)),
    };
  });

  const coolingMid =
    protectedCellsCount > 0
      ? cooledCells
          .filter((c) => c.coolingEstimated >= 0.2)
          .reduce((a, b) => a + b.coolingEstimated, 0) / protectedCellsCount
      : 0;

  const summary: SimulationResult = {
    coolingLow: parseFloat((coolingMid * 0.45).toFixed(1)),
    coolingMid: parseFloat(coolingMid.toFixed(1)),
    coolingHigh: parseFloat((coolingMid * 1.6).toFixed(1)),
    totalCostLakh: Math.round(totalCostLakh),
    totalCostCrore: parseFloat((totalCostLakh / 100).toFixed(1)),
    peopleProtected,
    protectedCellsCount,
    costPerPersonInr:
      peopleProtected > 0 ? Math.round((totalCostLakh * 100000) / peopleProtected) : 0,
    avgYearsToFullEffect:
      protectedCellsCount > 0 ? Math.round(weightedYears / protectedCellsCount) : 0,
    interventionBreakdown: {
      treeCoverCells: treeCells,
      coolRoofCells: roofCells,
      shadeStructureCells: shadeCells,
      coolPavementCells: paveCells,
      coolingCentreCells: centreCells,
    },
  };

  return { cooledCells, summary };
}

// Optimization implementation per spec:
// benefit = |cooling_mid| * hazard_weight * ((1 - lambda) + lambda * vulnerable_people_weight)
export function runBudgetOptimizer(
  cells: GridCell[],
  budgetCrore: number,
  lambda: number
): {
  efficiencyPlan: {
    spentCrore: number;
    peopleProtected: number;
    avgCooling: number;
    costPerPerson: number;
    mix: Record<string, number>;
  };
  equityPlan: {
    spentCrore: number;
    peopleProtected: number;
    avgCooling: number;
    costPerPerson: number;
    mix: Record<string, number>;
  };
  selectedPlan: {
    spentCrore: number;
    peopleProtected: number;
    avgCooling: number;
    costPerPerson: number;
    mix: Record<string, number>;
  };
} {
  const budgetLakh = budgetCrore * 100;

  const solveForLambda = (lVal: number) => {
    // Score each cell for benefit per cost
    const cellScores = cells.map((c) => {
      const hazardWeight = (c.lstObserved - 35) / 20;
      const vulnWeight = (c.popDensityPct * 0.5 + c.greenDeficitPct * 0.3 + c.buildingDensityPct * 0.2);
      const peopleWeight = (c.population / 7000) * vulnWeight;

      // best intervention for this cell
      let chosenIntervention = 'cool_roofs';
      let costLakh = 60;
      let cooling = 0.95;

      if (lVal > 0.6 && c.population > 4500 && c.suitability.treeCover > 0.4) {
        chosenIntervention = 'tree_cover';
        costLakh = 120;
        cooling = 1.9;
      } else if (c.suitability.coolRoofs > 0.6) {
        chosenIntervention = 'cool_roofs';
        costLakh = 60;
        cooling = 0.95;
      } else if (c.suitability.shadeStructures > 0.5) {
        chosenIntervention = 'shade_structures';
        costLakh = 45;
        cooling = 1.25;
      }

      const benefit = cooling * Math.max(0.2, hazardWeight) * ((1 - lVal) + lVal * peopleWeight);
      const roi = benefit / costLakh;

      return {
        cell: c,
        chosenIntervention,
        costLakh,
        cooling,
        benefit,
        roi,
        people: c.population,
      };
    });

    cellScores.sort((a, b) => b.roi - a.roi);

    let spent = 0;
    let people = 0;
    let totalCool = 0;
    let count = 0;
    const mix: Record<string, number> = {
      tree_cover: 0,
      cool_roofs: 0,
      shade_structures: 0,
      cool_pavements: 0,
      cooling_centre: 0,
    };

    // Dedicated cooling centre allocation (15% per spec)
    const centreBudget = budgetLakh * 0.15;
    let centreSpent = 0;
    cellScores.forEach((item) => {
      if (
        centreSpent + 25 <= centreBudget &&
        item.cell.suitability.coolingCentre > 0.5 &&
        item.cell.popDensityPct > 0.5
      ) {
        centreSpent += 25;
        mix.cooling_centre++;
      }
    });

    const remainingBudget = budgetLakh - centreSpent;
    for (const item of cellScores) {
      if (spent + item.costLakh <= remainingBudget) {
        spent += item.costLakh;
        people += item.people;
        totalCool += item.cooling;
        count++;
        mix[item.chosenIntervention] = (mix[item.chosenIntervention] || 0) + 1;
      }
    }

    const totalSpentCrore = parseFloat(((spent + centreSpent) / 100).toFixed(1));
    const avgCooling = count > 0 ? parseFloat((totalCool / count).toFixed(1)) : 0;
    const costPerPerson = people > 0 ? Math.round(((spent + centreSpent) * 100000) / people) : 0;

    return {
      spentCrore: totalSpentCrore,
      peopleProtected: people,
      avgCooling,
      costPerPerson,
      mix,
    };
  };

  return {
    efficiencyPlan: solveForLambda(0.0),
    equityPlan: solveForLambda(1.0),
    selectedPlan: solveForLambda(lambda),
  };
}

export const DATA_SOURCES: DataSourceSpec[] = [
  {
    name: 'Landsat 8/9 Collection 2 Level-2',
    source: 'USGS Earth Resources Observation and Science (EROS) Center',
    resolution: '30m thermal infrared (TIR band 10), block-averaged to 500m UTM grid',
    temporalWindow: 'Hot-season windows: April to June 2024, 2025, and 2026 (< 20% cloud cover)',
    license: 'Public Domain / Open Data Policy',
    derivedFeatures: ['lst_c (surface temperature target in °C calibrated with official USGS scale and offset)'],
    caveats:
      'Per-pixel multi-scene median. Land-surface temperature is NOT ambient air temperature and NOT personal human heat stress.',
  },
  {
    name: 'Copernicus Sentinel-2 Level-2A',
    source: 'Copernicus European Space Agency (ESA)',
    resolution: '10m–20m multispectral bands warped to 500m UTM grid',
    temporalWindow: 'Cloud-free hot-season composites concurrent with Landsat scene windows',
    license: 'Copernicus Free and Open License',
    derivedFeatures: ['ndvi (vegetation index)', 'ndbi (built-up index)', 'mndwi (water surface index)'],
    caveats:
      'Indices capture ground reflectance characteristics, not causal cooling physics. Optical sensor resolution differs from Landsat thermal band.',
  },
  {
    name: 'ESA WorldCover 2021',
    source: 'European Space Agency (ESA) WorldCover Consortium',
    resolution: '10m global land cover warped to 500m cell area fractions',
    temporalWindow: 'Baseline year 2021',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    derivedFeatures: [
      'impervious_fraction',
      'tree_fraction',
      'vegetation_fraction',
      'bare_soil_fraction',
      'water_fraction',
      'green_deficit',
    ],
    caveats:
      'WorldCover 2021 predates the 2024–2026 Landsat thermal composite; subsequent urban expansion or demolition between 2021 and 2026 is unreflected.',
  },
  {
    name: 'Copernicus DEM GLO-30',
    source: 'Copernicus Space Component Data Access (CSCDA)',
    resolution: '30m digital elevation model',
    temporalWindow: 'Static global terrain surface',
    license: 'Copernicus Data Policy (Free and Open Use)',
    derivedFeatures: ['elevation (meters asl)', 'slope (degrees)'],
    caveats:
      'Terrain elevation provides environmental and breeze context; it is not a direct measure of human heat vulnerability.',
  },
  {
    name: 'OpenStreetMap (OSM)',
    source: 'OpenStreetMap Contributors',
    resolution: 'Vector point of interest and highway line geometries',
    temporalWindow: 'Queried via Overpass API (October 2026 extraction)',
    license: 'Open Database License (ODbL) 1.0',
    derivedFeatures: ['cooling_spots (community halls, parks, fountains)', 'building_density (optional)'],
    caveats:
      'Cooling facility inventories are incomplete due to Overpass API rate-limiting (Delhi 5,399, Mumbai 2,351, Jaipur 895, Bengaluru 998). Building footprints disabled by default.',
  },
  {
    name: 'Meta High Resolution Settlement Layer (HRSL)',
    source: 'Meta Data for Good / Columbia CIESIN',
    resolution: '30m population density rasters block-aggregated to 500m cells',
    temporalWindow: 'Recent census-calibrated population projections',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    derivedFeatures: ['population (cell count)', 'pop_density_pct (exposure percentile)'],
    caveats:
      'Total population density functions strictly as an exposure proxy; v1 does NOT include disaggregated age structure (infants/elderly), income, or informal settlement indicators.',
  },
  {
    name: 'Open-Meteo Archive & Forecast',
    source: 'Open-Meteo API (ECMWF ERA5 & GFS numerical models)',
    resolution: 'Grid point weather archive & 3-day forecast',
    temporalWindow: 'Scene-date historical meteorological archive + daily operational 06:00 IST forecast',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    derivedFeatures: [
      'air_temp_max',
      'relative_humidity',
      'wind_speed',
      'solar_radiation',
      'heat_index',
      'wet_bulb_temp',
    ],
    caveats:
      'With only four training cities, weather variables represent city-level constants rather than spatial gradients within the city.',
  },
];

export const AWS_NODES: AwsArchNode[] = [
  {
    id: 's3_frontend',
    name: 'Frontend S3 + CloudFront',
    service: 'Amazon S3 & CloudFront (OAC)',
    category: 'online',
    samResource: 'FrontendBucket & FrontendDistribution',
    role: 'HTTPS edge delivery of static React 19 single-page application with single-page routing fallbacks.',
    sourceModule: 'infra/template.yaml (CloudFront OAC, S3 Origin)',
    status: 'designed',
    details: 'Private S3 origin, SigV4 restricted access, CloudFront TLS certificate.',
  },
  {
    id: 'http_api',
    name: 'API Gateway (HTTP API)',
    service: 'Amazon API Gateway v2',
    category: 'online',
    samResource: 'HttpApi',
    role: 'Public RESTful entry point, throttled at 10 req/s with burst 20, exposes X-Model-Version & X-Data-Date headers.',
    sourceModule: 'infra/template.yaml',
    status: 'designed',
    details: 'CORS configured for designated frontend domain and local preview ports.',
  },
  {
    id: 'lambda_api',
    name: 'FastAPI Lambda Function',
    service: 'AWS Lambda (Container Image)',
    category: 'online',
    samResource: 'ApiFunction (2048 MB, 29s timeout)',
    role: 'Runs FastAPI app via Mangum handler. Bundles in-image Parquet tables and XGBoost model artifacts.',
    sourceModule: 'api/lambda_handler.py, infra/Dockerfile',
    status: 'designed',
    details: 'Memory sized to hold 19,681 cells and point/quantile estimators in RAM.',
  },
  {
    id: 'dynamo_plans',
    name: 'DynamoDB Plans Table',
    service: 'Amazon DynamoDB',
    category: 'online',
    samResource: 'PlansTable (On-Demand billing)',
    role: 'Stores plan lifecycle state (draft -> approved -> implemented) with complete append-only audit trail.',
    sourceModule: 'api/store.py',
    status: 'designed',
    details: 'Document stored as serialized JSON string to circumvent float conversion issues.',
  },
  {
    id: 'dynamo_reports',
    name: 'DynamoDB Reports Table',
    service: 'Amazon DynamoDB',
    category: 'online',
    samResource: 'ReportsTable (On-Demand billing)',
    role: 'Stores anonymous citizen reports (no_shade, no_water, very_hot, cool_spot) snapped to 500m grid cell ID.',
    sourceModule: 'api/store.py',
    status: 'designed',
    details: 'No exact latitude/longitude stored to protect citizen privacy.',
  },
  {
    id: 'bedrock_agent',
    name: 'Amazon Bedrock + Guardrails',
    service: 'Amazon Bedrock & Bedrock Guardrails',
    category: 'online',
    samResource: 'HeatGuardrail & BedrockModelId',
    role: 'Heat Officer language model drafts bilingual briefs in English and Hindi behind content and safety guardrails.',
    sourceModule: 'agent/heat_officer.py (Strands Agents SDK)',
    status: 'designed',
    details: 'Temperature 0.2. Guardrail blocks medical diagnosis and directs urgent calls to 112/108.',
  },
  {
    id: 'eventbridge_cron',
    name: 'EventBridge Daily Schedule',
    service: 'Amazon EventBridge Scheduler',
    category: 'daily',
    samResource: 'Daily (EventBridge rule)',
    role: 'Fires cron(0 6 * * ? *) in Asia/Kolkata timezone to trigger morning heat risk recomputation.',
    sourceModule: 'infra/template.yaml',
    status: 'designed',
    details: 'Runs every day at 06:00 IST before municipal work shifts commence.',
  },
  {
    id: 'lambda_refresh',
    name: 'Refresh Forecast Lambda',
    service: 'AWS Lambda (Container Image)',
    category: 'daily',
    samResource: 'RefreshFunction (1536 MB, 300s timeout)',
    role: 'Pulls Open-Meteo 3-day forecast, computes heat index, recalculates ward risk, writes JSON to S3.',
    sourceModule: 'lambdas/refresh_forecast/app.py',
    status: 'designed',
    details: 'Isolates city failures so one city outage does not interrupt others.',
  },
  {
    id: 'polly_audio',
    name: 'Amazon Polly (Hindi Audio)',
    service: 'Amazon Polly',
    category: 'daily',
    samResource: 'Polly SynthesizeSpeech API',
    role: 'Synthesizes neural Hindi spoken advisory (voice: Kajal, hi-IN) and writes MP3 to S3 for mobile streaming.',
    sourceModule: 'lambdas/refresh_forecast/app.py',
    status: 'designed',
    details: 'Audio files expire via S3 30-day lifecycle rule.',
  },
  {
    id: 'sns_alerts',
    name: 'SNS Alert Topic (Public)',
    service: 'Amazon SNS',
    category: 'daily',
    samResource: 'AlertTopic',
    role: 'Sends morning heat alert emails to verified subscribers when city risk tier reaches Orange or Red.',
    sourceModule: 'lambdas/refresh_forecast/app.py',
    status: 'designed',
    details: 'Includes top 5 risk wards, safety advice text, and pre-signed 7-day link to audio.',
  },
  {
    id: 'cloudwatch_ops',
    name: 'CloudWatch Metrics & Alarms',
    service: 'Amazon CloudWatch',
    category: 'operations',
    samResource: 'CloudWatch Dashboard & 2 Alarms',
    role: 'Monitors API p95 latency, Lambda error rates (alert >= 5 errors in 5 min), and daily refresh job status.',
    sourceModule: 'infra/template.yaml',
    status: 'designed',
    details: 'Uses CloudWatch Embedded Metric Format (EMF) to log metrics without extra API overhead.',
  },
  {
    id: 'aws_budgets',
    name: 'AWS Monthly Cost Budget',
    service: 'AWS Budgets',
    category: 'operations',
    samResource: 'MonthlyBudget (default $25 USD)',
    role: 'Enforces cost guardrail with email alert triggered at 80% of forecast monthly spend.',
    sourceModule: 'infra/template.yaml',
    status: 'designed',
    details: 'Serverless scale-to-zero keeps idle stack cost under $1–2/month.',
  },
];

export const AI_OFFICER_SAMPLE_BRIEF = {
  city: 'New Delhi',
  zone: 'Zone 2-1 (East Delhi / Anand Vihar corridor)',
  rank: 1,
  compositeRisk: 96.4,
  hazardScore: 94.2,
  exposureScore: 98.1,
  vulnerabilityScore: 89.5,
  population: 68400,
  meanLst: 47.9,
  p90Lst: 51.4,
  forecastMaxTemp: 42.4,
  forecastHeatIndex: 45.1,
  alertLevel: 'Orange',
  source: 'template' as 'bedrock' | 'template',
  numbersVerified: true,
  fallbackNote: 'Rendered using deterministic verified template brief (Bedrock unconfigured in local preview environment).',
  englishText:
    'Zone 2-1 ranks 1st in New Delhi for composite heat risk with a score of 96.4/100, driven by an extreme mean surface temperature of 47.9°C and 68,400 exposed residents. Today is an Orange Alert day with forecast temperatures reaching 42.4°C and a heat index of 45.1°C. Under the proposed municipal plan (Rs 120 lakh), priority actions are: (1) 25 cool roof installations on dense tenements (estimated cooling -0.9°C to -1.5°C, Rs 60 lakh); (2) 4 roadside transit shade structures at Anand Vihar bus bays (Rs 45 lakh); and (3) a community cooling centre at Shakarpur community hall (Rs 25 lakh). Nearest water points are located at East Delhi bus terminal (180m) and Mother Dairy park (320m). Avoid direct sun between 12:00 and 15:00. For emergency medical distress call 112 or 108.',
  hindiText:
    'जोन 2-1 समग्र ताप जोखिम में नई दिल्ली में 96.4/100 स्कोर के साथ पहले स्थान पर है, जिसका कारण 47.9 डिग्री सेल्सियस का अत्यधिक औसत सतह तापमान और 68,400 निवासी हैं। आज 42.4 डिग्री सेल्सियस और 45.1 डिग्री हीट इंडेक्स के साथ ऑरेंज अलर्ट है। प्रस्तावित 120 लाख रुपये की योजना में तीन मुख्य कार्य हैं: (1) घनी बस्तियों में 25 कूल रूफ (अनुमानित शीतलन -0.9 से -1.5°C, 60 लाख रु.); (2) आनंद विहार बस स्टैंड पर 4 छायादार शेड (45 लाख रु.); और (3) शकरपुर कम्युनिटी हॉल में एक शीतलन केंद्र (25 लाख रु.)। निकटतम पेयजल केंद्र आनंद विहार टर्मिनल (180 मीटर) और मदर डेयरी पार्क (320 मीटर) में हैं। दोपहर 12 से 3 बजे तक धूप से बचें। आपातकाल में 112 या 108 पर संपर्क करें।',
  vettedFacts: [
    { label: 'Ward Rank', value: '1 of 16 zones', verified: true },
    { label: 'Composite Risk Score', value: '96.4 / 100', verified: true },
    { label: 'Exposed Population', value: '68,400 residents', verified: true },
    { label: 'Mean Surface Temp (LST)', value: '47.9 °C', verified: true },
    { label: 'Forecast Maximum Ambient Temp', value: '42.4 °C', verified: true },
    { label: 'Forecast Heat Index', value: '45.1 °C', verified: true },
    { label: 'Action 1: Cool Roofs Cost', value: 'Rs 60.0 lakh', verified: true },
    { label: 'Action 2: Shade Structures Cost', value: 'Rs 45.0 lakh', verified: true },
    { label: 'Action 3: Cooling Centre Cost', value: 'Rs 25.0 lakh', verified: true },
    { label: 'Emergency Referral Numbers', value: '112 / 108', verified: true },
  ],
};
