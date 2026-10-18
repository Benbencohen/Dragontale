/**
 * @file fashion.types.ts
 * @description הגדרות טיפוסים קפדניות (Strict TypeScript Interfaces) עבור מערכת הפאשן-טק הישראלית:
 * סימולציה פיזיקלית של בדים, תבניות היסטוריות ומגזריות, מנוע מתיחת גבולות ושרשרת אספקה.
 */

export type FabricId =
  | 'linen_galilee'
  | 'cotton_ata_drill'
  | 'cotton_jersey'
  | 'viscose_bamboo'
  | 'silk_bridal_tulle'
  | 'lace_chiffon_lycra'
  | 'gottex_spandex_lycra'
  | 'hasidic_wool_velvet_jacquard';

export type ArchetypeId =
  | 'ata_pioneer_khaki'
  | 'maskit_desert_couture'
  | 'israeli_bridal_mermaid'
  | 'gottex_resort_swim'
  | 'hasidic_strakes_bekishe'
  | 'modest_boho_maxi'
  | 'hightech_smart_casual';

export type EmbroideryTraditionId =
  | 'none'
  | 'yemenite_silk'
  | 'bedouin_negev'
  | 'palestinian_tatreez'
  | 'eastern_european_metallic'
  | 'gottex_chrysanthemum'
  | 'swarovski_bridal_crystal';

export type AnatomicalZone =
  | 'torso_upper'
  | 'pelvis_legs'
  | 'neck_shoulders_scarf'
  | 'full_body_drape'
  | 'asymmetric_avantgarde';

export type SourcingHubId = 'nahalat_binyamin_tlv' | 'rabbi_akiva_bnei_brak' | 'shenkar_cirtex_tech';

export type ClimateScenarioId =
  | 'coastal_humid_summer'
  | 'ac_sharp_transition'
  | 'short_israeli_winter'
  | 'jerusalem_evening_breeze'
  | 'negev_desert_dry';

export interface FabricPhysicsProperties {
  id: FabricId;
  nameHe: string;
  nameEn: string;
  category: 'natural_plant' | 'cellulose_regen' | 'protein_luxury' | 'synthetic_elastic' | 'heritage_heavy';
  arealWeightGsm: number;            // משקל בד בגרם למ"ר (GSM)
  drapeCoefficient: number;          // מקדם נפילה (0.0 נוקשה מאוד -> 1.0 נשפך וזורם)
  youngsModulusKPa: number;          // מודול אלסטיות / קשיחות מתיחה
  maxStretchRatio: number;           // יחס מתיחה מקסימלי (למשל 5.0 = 500% במנוע המורפינג)
  bendingRigidity: number;           // התנגדות לקיפול (0.0 רך -> 1.0 יציב ונוקשה)
  moistureWickingRate: number;       // קצב נידוף לחות (0-100)
  dryingSpeedIndex: number;          // מהירות התייבשות (0-100)
  breathabilityCFM: number;          // אווריריות ומעבר אוויר (0-100)
  thermalInsulationClo: number;      // בידוד תרמי (Clo)
  specularGloss: number;             // ברק טבעי (Specular: 0.0 מאט -> 1.0 מבריק)
  alphaOpacity: number;              // אטימות (1.0 אטום לחלוטין -> 0.15 רשת אשליה שקופה)
  surfaceRoughness: number;          // חספוס מיקרו-מבני (0.0 חלק -> 1.0 מחוספס)
  maxOrnamentLoadGramsPerSqm: number;// כושר נשיאת משקל עיטורים (חרוזים/סברובסקי/קטיפה) ללא קריסה
  washSofteningRate: number;         // קצב התרככות בכביסות (ייחודי לפשתן: 0.0 ללא שינוי -> 1.0 מתרכך מאוד)
  chlorineWaterResistance: number;   // עמידות למים וכלור (0-100)
  antiSkinClingIndex: number;        // מניעת הידבקות לעור בלחות גבוהה (0-100)
  costPerMeterILS: number;           // מחיר ממוצע למטר בש"ח
  primarySourcingHub: SourcingHubId;
  causalExplanationHe: string;       // הסיבתיות האקלימית/הלכתית/אידיאולוגית לשימוש בישראל
  colorHex: string;
  secondaryColorHex: string;
  textureMapPaths: {
    normal: string;
    roughness: string;
    bump: string;
    alpha?: string;
  };
}

export interface PatternPanel2D {
  panelId: string;
  nameHe: string;
  role: 'front_bodice' | 'back_bodice' | 'sleeve_left' | 'sleeve_right' | 'leg_left' | 'leg_right' | 'collar_lapel' | 'skirt_panel' | 'pocket_ext' | 'illusion_corset' | 'arch_back_seam';
  svgPath: string;
  uvBounds: { uMin: number; vMin: number; uMax: number; vMax: number };
  defaultSeamTargets: string[];
  canRipSeam: boolean;
}

export interface GarmentArchetype {
  id: ArchetypeId;
  nameHe: string;
  nameEn: string;
  era: string;
  foundersOrDesigners: string[];
  sociologicalSector: string;
  defaultFabricId: FabricId;
  defaultAnatomicalZone: AnatomicalZone;
  defaultEmbroidery: EmbroideryTraditionId;
  seasonCategory: 'summer_light' | 'winter_heavy' | 'bridal_couture' | 'all_season';
  baseFabricMeters: number;
  laborComplexityHours: number;
  ornamentWeightGrams: number;
  canonicalFeaturesHe: string[];
  historicalContextHe: string;
  panels2D: PatternPanel2D[];
  meshPresetConfig: {
    torsoScale: [number, number, number];
    skirtFlare: number;
    sleeveLength: number;
    sleeveWidth: number;
    collarHeight: number;
    inseamSplit: number;       // 0 = חצאית/שמלה, 1 = מכנסיים מפוצלים
    backArchSeams: boolean;    // שני חצאי קשתות בגב (קפוטה/בעקיטשע)
    frontButtonsCount: number; // למשל 6 כפתורים בקפוטה או 36 לולאות בסטראקעס
    transparencyZones: boolean;// משחקי שקיפות-אטימות (שמלות כלה)
  };
}

export interface SeamConnection {
  seamId: string;
  panelA: string;
  panelB: string;
  isRipped: boolean;           // האם התפר נפרם בכלי פתיחת התפרים
  customTargetPanel?: string;  // חיבור מחדש לא שגרתי (למשל שרוול קפוטה לשולי חצאית)
  tensionFactor: number;
}

export interface MorphParameters {
  targetAnatomicalZone: AnatomicalZone;
  inseamMergedToScarf: boolean;      // איחוי תפרים / פתיחת מפשעה להפיכת מכנס לצעיף/עליונית
  sleeveToHemStitched: boolean;      // חיבור שרוול לשולי חצאית
  elongationPercent: number;         // הארכה קיצונית (100% עד 500%)
  twistAngleDeg: number;             // פיתול ספירלי (-360 עד +360 מעלות)
  ruchedGatheringIntensity: number;  // כיווץ (Ruched/Gathering: 0 עד 1)
  volumeInflation: number;           // ניפוח נפחים אוונגרדי (0.5 עד 3.0)
  asymmetryShift: number;            // הזזה א-סימטרית (-1.0 עד 1.0)
  secondaryArchetypeId: ArchetypeId | null; // היברידיזציה של שתי תבניות (Mashup)
  mashupBlendRatio: number;          // יחס מיזוג בין התבניות (0.0 עד 1.0)
  secondaryFabricId: FabricId | null;
  washCount: number;                 // מונה כביסות (משפיע על התרככות הפשתן)
}

export interface PhysicsSimulationResult {
  effectiveStiffness: number;
  effectiveDrape: number;
  structuralCollapseRisk: number;    // 0-100%: האם הבד קורס תחת משקל העיטורים או הגזרה
  structuralStatus: 'stable' | 'flowing_drape' | 'high_tension_stretch' | 'collapsed_overload';
  statusMessageHe: string;
  gravitySagMeters: number;
  linenSoftnessBonus: number;
}
