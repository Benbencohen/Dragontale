/**
 * @file morphEngine.ts
 * @description מנוע "מתיחת גבולות" וטרנספורמציה רדיקלית (Deconstruction & Morphing Engine).
 * מבצע חישוב ורטקסים (Vertex Deformation), שינוי ייעוד אנטומי (כמו מכנס חאקי -> צעיף פיסולי),
 * פתיחת ואיחוי תפרים (Seam Ripper & Stitcher), פיתול (Twist), כיווץ (Ruched) והיברידיזציה של תבניות.
 */

import {
  GarmentArchetype,
  MorphParameters,
  FabricPhysicsProperties,
} from '../../types/fashion.types';

export interface Vertex3D {
  x: number;
  y: number;
  z: number;
  u: number;
  v: number;
  panelId: string;
}

export class RadicalMorphEngine {
  /**
   * מפעיל דפורמציה טופולוגית ופיזיקלית על קואורדינטות ה-Mesh התלת-ממדי בזמן אמת
   */
  public static deformVertex(
    baseVertex: Vertex3D,
    archetype: GarmentArchetype,
    secondaryArchetype: GarmentArchetype | null,
    fabric: FabricPhysicsProperties,
    morph: MorphParameters,
    rippedSeamsCount: number
  ): { x: number; y: number; z: number } {
    let { x, y, z, u, v } = baseVertex;

    // 1. מיזוג תבניות (Cross-Cultural Mashup)
    const blend = secondaryArchetype ? morph.mashupBlendRatio : 0;
    const effectiveFlare =
      archetype.meshPresetConfig.skirtFlare * (1 - blend) +
      (secondaryArchetype ? secondaryArchetype.meshPresetConfig.skirtFlare * blend : 0);

    // 2. התרככות פשתן בכביסות (Linen Wash Softening Index)
    const washSofteningBonus =
      Math.min(1, morph.washCount / 30) * fabric.washSofteningRate * 0.35;
    const effectiveDrape = Math.min(1, fabric.drapeCoefficient + washSofteningBonus);

    // 3. שינוי ייעוד אנטומי (Anatomical Re-mapping: למשל מכנס "אתא" -> צעיף פיסולי סביב הצוואר)
    if (morph.inseamMergedToScarf || morph.targetAnatomicalZone === 'neck_shoulders_scarf') {
      const wrapAngle = u * Math.PI * 2.4 + v * 1.8;
      const torusRadius = 0.42 + 0.16 * Math.sin(v * Math.PI * 3);
      x = Math.cos(wrapAngle) * torusRadius * (1 + 0.25 * morph.volumeInflation);
      z = Math.sin(wrapAngle) * torusRadius * (1 + 0.25 * morph.volumeInflation);
      y = 0.65 + (v - 0.5) * 0.55 - effectiveDrape * 0.18 * Math.pow(u - 0.5, 2);
    } else if (morph.targetAnatomicalZone === 'asymmetric_avantgarde') {
      x += (v - 0.5) * 0.38;
      y += Math.sin(u * Math.PI * 2) * 0.22;
    }

    // 4. חיבור שרוול לשולי חצאית (Seam Ripper & Unconventional Re-Stitching)
    if (morph.sleeveToHemStitched && baseVertex.panelId.includes('sleeve')) {
      y -= 0.85;
      x *= 1.35;
    }

    // 5. פתיחת תפרים (Seam Ripper): התבדרות של פנלים פרומים
    if (rippedSeamsCount > 0) {
      const seamSpread = rippedSeamsCount * 0.08 * (u > 0.5 ? 1 : -1);
      x += seamSpread * (1 - v * 0.5);
      z += Math.sin(u * Math.PI * 4) * rippedSeamsCount * 0.04;
    }

    // 6. הארכה קיצונית (Free-Form Elongation: עד 500%)
    const stretchMultiplier = Math.max(0.5, morph.elongationPercent / 100);
    y *= stretchMultiplier;

    // 7. ניפוח נפחים ו-flare של חצאית/גלימה
    const radialDist = Math.sqrt(x * x + z * z) || 0.001;
    const lowerFactor = Math.max(0, 0.5 - y);
    const inflationScale =
      morph.volumeInflation * (1 + lowerFactor * effectiveFlare * 0.9);
    x *= inflationScale;
    z *= inflationScale;

    // 8. פיתול טופולוגי (Twist)
    if (Math.abs(morph.twistAngleDeg) > 0.1) {
      const rad = ((morph.twistAngleDeg * Math.PI) / 180) * (y + 1.0) * 0.5;
      const cosT = Math.cos(rad);
      const sinT = Math.sin(rad);
      const nx = x * cosT - z * sinT;
      const nz = x * sinT + z * cosT;
      x = nx;
      z = nz;
    }

    // 9. כיווץ (Ruched / Gathering) וגלי נפילה פיזיקליים (Drape Waves)
    if (morph.ruchedGatheringIntensity > 0.01 || effectiveDrape > 0.4) {
      const waveFreq = 12 + Math.round(morph.ruchedGatheringIntensity * 18);
      const gatherAmp =
        morph.ruchedGatheringIntensity * 0.09 + effectiveDrape * 0.04 * lowerFactor;
      const angle = Math.atan2(z, x);
      const wave = Math.sin(angle * waveFreq + y * 8.0) * gatherAmp;
      x += (x / radialDist) * wave;
      z += (z / radialDist) * wave;
    }

    // 10. הזזה א-סימטרית וכבידה לפי משקל הבד
    x += morph.asymmetryShift * 0.35 * (1 - v);
    const gravitySag = (fabric.arealWeightGsm / 400) * (1 - fabric.bendingRigidity) * 0.22;
    y -= gravitySag * (1 - v);

    return { x, y, z };
  }
}
