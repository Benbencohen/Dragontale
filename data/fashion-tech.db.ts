/**
 * @file fashion-tech.db.ts
 * @description פרמטרים של קיימות ומנועי הפאשן-טק הישראליים:
 * Kornit Digital (DTG Apollo / Atlas MAX, Roll-to-Roll Presto MAX, PrintFactory),
 * Sonovia (אשפרה אולטרסונית דוחת-בקטריות), ו-Styletech (דוגמן וירטואלי AI).
 */

export interface KornitSystemSpec {
  id: 'none' | 'apollo_dtg' | 'atlas_max_dtg' | 'presto_max_r2r';
  nameHe: string;
  technologyType: 'Mass_Traditional' | 'DTG_Direct_To_Garment' | 'R2R_Roll_To_Roll';
  waterSavingPercent: number;
  ghgReductionPercent: number;
  overproductionWastePercent: number;
  setupCostPerRunILS: number;
  colorManagement: string;
  descriptionHe: string;
}

export const KORNIT_SYSTEMS_DB: Record<KornitSystemSpec['id'], KornitSystemSpec> = {
  none: {
    id: 'none',
    nameHe: 'ייצור המוני מסורתי במזרח אסיה (Mass Production)',
    technologyType: 'Mass_Traditional',
    waterSavingPercent: 0,
    ghgReductionPercent: 0,
    overproductionWastePercent: 25, // 25% מכלל הבגדים המיוצרים נזרקים כפסולת מבלי שנלבשו
    setupCostPerRunILS: 4500,
    colorManagement: 'צביעה רטובה ודפוס משי מסורתי (25% מצריכת הכימיקלים העולמית)',
    descriptionHe:
      'תעשיית הטקסטיל המסורתית אחראית ל-20% מזיהום המים הגלובלי, 28 ק"ג גזי חממה לכל ק"ג בגד ו-25% פסולת ייצור עודף.',
  },
  apollo_dtg: {
    id: 'apollo_dtg',
    nameHe: 'Kornit Apollo DTG (הדפסה ישירה על הבגד בתפוקה גבוהה)',
    technologyType: 'DTG_Direct_To_Garment',
    waterSavingPercent: 95,
    ghgReductionPercent: 82,
    overproductionWastePercent: 1.5,
    setupCostPerRunILS: 35,
    colorManagement: 'PrintFactory Color Engine (רכישת 2026) – ללא הגבלת צבעים',
    descriptionHe:
      'מערכת הדגל של קורנית דיגיטל לייצור Nearshore לפי דרישה (Print-on-Demand) ישירות על הבגד התפור במינימום מים.',
  },
  atlas_max_dtg: {
    id: 'atlas_max_dtg',
    nameHe: 'Kornit Atlas MAX DTG (הדפסת תלת-ממד ואפקטי XDi על בגדים)',
    technologyType: 'DTG_Direct_To_Garment',
    waterSavingPercent: 94,
    ghgReductionPercent: 80,
    overproductionWastePercent: 2.0,
    setupCostPerRunILS: 40,
    colorManagement: 'PrintFactory + XDi 3D Embroidery Simulation',
    descriptionHe:
      'הדפסה דיגיטלית תעשייתית המאפשרת הדמיית רקמה תלת-ממדית (תימנית/בדואית/חרציות) ללא הגבלת צבעים ורק לאחר רכישת הלקוח.',
  },
  presto_max_r2r: {
    id: 'presto_max_r2r',
    nameHe: 'Kornit Presto MAX (הדפסת Roll-to-Roll על גלילי בד)',
    technologyType: 'R2R_Roll_To_Roll',
    waterSavingPercent: 96,
    ghgReductionPercent: 85,
    overproductionWastePercent: 1.0,
    setupCostPerRunILS: 55,
    colorManagement: 'PrintFactory Smart Roll-to-Roll Calibration (כולל הדפסה לבנה על בדים כהים)',
    descriptionHe:
      'הדפסה יבשה בצעד אחד על גלילי פשתן, משי, ויסקוזה ולייקרה למעצבים עצמאיים ולבתי קוטור באפס שפכי צבע.',
  },
};

export const GLOBAL_POLLUTION_BASELINE = {
  ghgKgPerKgGarment: 28.0,            // 28 ק"ג גזי חממה לכל 1 ק"ג בגד בייצור מסורתי
  globalWaterPollutionSharePercent: 20,// 20% מזיהום המים הגלובלי
  globalGhgSharePercent: 10,           // 10% מפליטות גזי החממה והחנקן הדו-חמצני
  globalChemicalSharePercent: 25,      // 25% מצריכת הכימיקלים בעולם
  deadstockWastePercent: 25,           // 25% מהבגדים נזרקים מבלי שנלבשו מעולם
};
