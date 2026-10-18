/**
 * @file clothSimulation.ts
 * @description מנוע סימולציה פיזיקלית של טקסטיל ואקלים:
 * מחשב קריסת בד תחת עומס עיטורים, התרככות פשתן בכביסות, ומדד נוחות תרמית ונידוף זיעה.
 */

import {
  FabricPhysicsProperties,
  GarmentArchetype,
  MorphParameters,
  PhysicsSimulationResult,
  ClimateScenarioId,
} from '../../types/fashion.types';
import { EMBROIDERY_PATTERNS_DB } from '../../data/archetypes.db';
import { CLIMATE_SCENARIOS_DB } from '../../data/supply-chain.db';

export class ClothPhysicsSimulator {
  public static evaluatePhysics(
    fabric: FabricPhysicsProperties,
    secondaryFabric: FabricPhysicsProperties | null,
    archetype: GarmentArchetype,
    morph: MorphParameters,
    embroideryId: keyof typeof EMBROIDERY_PATTERNS_DB
  ): PhysicsSimulationResult {
    const blend = secondaryFabric ? morph.mashupBlendRatio : 0;
    const washSofteningBonus =
      Math.min(1, morph.washCount / 30) * fabric.washSofteningRate * 0.35;

    const effectiveStiffness = Math.max(
      0.05,
      fabric.bendingRigidity * (1 - blend) +
        (secondaryFabric ? secondaryFabric.bendingRigidity * blend : 0) -
        washSofteningBonus * 0.6
    );

    const effectiveDrape = Math.min(
      1.0,
      fabric.drapeCoefficient * (1 - blend) +
        (secondaryFabric ? secondaryFabric.drapeCoefficient * blend : 0) +
        washSofteningBonus
    );

    const embroideryWeight = EMBROIDERY_PATTERNS_DB[embroideryId]?.addedWeightGrams || 0;
    const totalOrnamentLoad = archetype.ornamentWeightGrams + embroideryWeight;
    const maxCapacity =
      fabric.maxOrnamentLoadGramsPerSqm * (1 - blend) +
      (secondaryFabric ? secondaryFabric.maxOrnamentLoadGramsPerSqm * blend : 0);

    const stretchRatio = morph.elongationPercent / 100;
    const overloadRatio = (totalOrnamentLoad * stretchRatio * 0.65) / Math.max(100, maxCapacity);
    const structuralCollapseRisk = Math.min(100, Math.round(overloadRatio * 100));

    let structuralStatus: PhysicsSimulationResult['structuralStatus'] = 'stable';
    let statusMessageHe = 'הבד שומר על יציבות מבנית מאוזנת ביחס לגזרה ולמשקל העיטורים.';

    if (structuralCollapseRisk >= 82) {
      structuralStatus = 'collapsed_overload';
      statusMessageHe =
        'אזהרת קריסה מבנית! משקל העיטורים/הלולאות או הארכת היתר גבוהים מכושר הנשיאה של הבד.';
    } else if (stretchRatio > fabric.maxStretchRatio) {
      structuralStatus = 'high_tension_stretch';
      statusMessageHe = `מתח אלסטי קיצוני (${morph.elongationPercent}%): חריגה מסף המתיחה הטבעי של הסיב (${Math.round(
        fabric.maxStretchRatio * 100
      )}%).`;
    } else if (effectiveDrape > 0.78) {
      structuralStatus = 'flowing_drape';
      statusMessageHe = 'נפילה (Drape) זורמת ורכה על הגוף עם תנועת גלים אוורירית.';
    }

    const gravitySagMeters = Number(
      ((fabric.arealWeightGsm / 350) * (1 - effectiveStiffness) * stretchRatio * 0.18).toFixed(3)
    );

    return {
      effectiveStiffness: Number(effectiveStiffness.toFixed(2)),
      effectiveDrape: Number(effectiveDrape.toFixed(2)),
      structuralCollapseRisk,
      structuralStatus,
      statusMessageHe,
      gravitySagMeters,
      linenSoftnessBonus: Number((washSofteningBonus * 100).toFixed(1)),
    };
  }

  public static evaluateThermalComfort(
    fabric: FabricPhysicsProperties,
    climateId: ClimateScenarioId,
    sonoviaEnabled: boolean
  ) {
    const climate = CLIMATE_SCENARIOS_DB[climateId];
    const heatStressFactor = Math.max(0, (climate.tempCelsius - 22) * 2.4);
    const humidityPenalty =
      (climate.relativeHumidityPercent / 100) * (100 - fabric.antiSkinClingIndex) * 0.65;
    const insulationPenalty =
      climate.tempCelsius > 26 ? fabric.thermalInsulationClo * 55 : 0;

    const wickingBonus =
      (fabric.moistureWickingRate * 0.35 + fabric.breathabilityCFM * 0.35) *
      (sonoviaEnabled ? 1.12 : 1.0);

    const score = Math.max(
      5,
      Math.min(100, Math.round(50 + wickingBonus - heatStressFactor - humidityPenalty - insulationPenalty))
    );

    const hasSevereAlert =
      climate.tempCelsius >= 28 &&
      climate.relativeHumidityPercent >= 65 &&
      (fabric.thermalInsulationClo > 0.5 || fabric.breathabilityCFM < 65);

    return {
      comfortScore: score,
      hasSevereAlert,
      alertTextHe: hasSevereAlert
        ? `התרעה פיזיולוגית חמורה: בחרת ב-${fabric.nameHe} לתנאי ${climate.nameHe}. בדים אטומים/כבדים אלו חוסמים נידוף זיעה וגורמים לעומס חום והידבקות לעור!`
        : `התאמה אקלימית תקינה (${score}/100): הבד מאפשר ויסות תרמי ונידוף לחות בתנאי ${climate.nameHe}.`,
    };
  }
}
