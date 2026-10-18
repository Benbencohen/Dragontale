/**
 * @file useFashionStore.ts
 * @description ניהול מצב גלובלי (Zustand Store) המסנכרן בין הקנבס התלת-ממדי,
 * עורך הגזרות הדו-ממדי, מנוע המורפינג, סימולטור האקלים ונתוני שרשרת האספקה והפאשן-טק.
 */

import { create } from 'zustand';
import {
  ArchetypeId,
  FabricId,
  EmbroideryTraditionId,
  ClimateScenarioId,
  MorphParameters,
  SeamConnection,
} from '../types/fashion.types';
import { ARCHETYPES_DB } from '../data/archetypes.db';
import { PatternParser } from '../core/pattern-parser/patternParser';
import { KornitSystemSpec } from '../data/fashion-tech.db';

export interface FashionStudioState {
  activeArchetypeId: ArchetypeId;
  activeFabricId: FabricId;
  activeEmbroideryId: EmbroideryTraditionId;
  activeClimateId: ClimateScenarioId;
  morph: MorphParameters;
  seams: SeamConnection[];
  kornitMode: KornitSystemSpec['id'];
  sonoviaUltrasonicEnabled: boolean;
  styletechVirtualAvatarMode: boolean;
  setArchetype: (id: ArchetypeId) => void;
  setFabric: (id: FabricId) => void;
  setEmbroidery: (id: EmbroideryTraditionId) => void;
  setClimate: (id: ClimateScenarioId) => void;
  updateMorph: (partial: Partial<MorphParameters>) => void;
  toggleSeamRip: (seamId: string) => void;
  applyRadicalPreset: (presetName: 'khaki_to_scarf' | 'bekishe_to_bridal' | 'gottex_maskit_hybrid') => void;
}

export const useFashionStore = create<FashionStudioState>((set) => ({
  activeArchetypeId: 'ata_pioneer_khaki',
  activeFabricId: 'cotton_ata_drill',
  activeEmbroideryId: 'none',
  activeClimateId: 'coastal_humid_summer',
  morph: {
    targetAnatomicalZone: 'pelvis_legs',
    inseamMergedToScarf: false,
    sleeveToHemStitched: false,
    elongationPercent: 100,
    twistAngleDeg: 0,
    ruchedGatheringIntensity: 0.1,
    volumeInflation: 1.0,
    asymmetryShift: 0,
    secondaryArchetypeId: null,
    mashupBlendRatio: 0,
    secondaryFabricId: null,
    washCount: 1,
  },
  seams: PatternParser.buildInitialSeams(ARCHETYPES_DB.ata_pioneer_khaki),
  kornitMode: 'apollo_dtg',
  sonoviaUltrasonicEnabled: true,
  styletechVirtualAvatarMode: true,

  setArchetype: (id) => {
    const arch = ARCHETYPES_DB[id];
    set({
      activeArchetypeId: id,
      activeFabricId: arch.defaultFabricId,
      activeEmbroideryId: arch.defaultEmbroidery,
      seams: PatternParser.buildInitialSeams(arch),
      morph: {
        targetAnatomicalZone: arch.defaultAnatomicalZone,
        inseamMergedToScarf: false,
        sleeveToHemStitched: false,
        elongationPercent: 100,
        twistAngleDeg: 0,
        ruchedGatheringIntensity: 0.1,
        volumeInflation: 1.0,
        asymmetryShift: 0,
        secondaryArchetypeId: null,
        mashupBlendRatio: 0,
        secondaryFabricId: null,
        washCount: 1,
      },
    });
  },
  setFabric: (id) => set({ activeFabricId: id }),
  setEmbroidery: (id) => set({ activeEmbroideryId: id }),
  setClimate: (id) => set({ activeClimateId: id }),
  updateMorph: (partial) =>
    set((state) => ({ morph: { ...state.morph, ...partial } })),
  toggleSeamRip: (seamId) =>
    set((state) => ({
      seams: state.seams.map((s) =>
        s.seamId === seamId ? { ...s, isRipped: !s.isRipped } : s
      ),
    })),
  applyRadicalPreset: (presetName) => {
    if (presetName === 'khaki_to_scarf') {
      set({
        activeArchetypeId: 'ata_pioneer_khaki',
        activeFabricId: 'cotton_ata_drill',
        morph: {
          targetAnatomicalZone: 'neck_shoulders_scarf',
          inseamMergedToScarf: true,
          sleeveToHemStitched: false,
          elongationPercent: 210,
          twistAngleDeg: 145,
          ruchedGatheringIntensity: 0.48,
          volumeInflation: 1.35,
          asymmetryShift: 0.25,
          secondaryArchetypeId: null,
          mashupBlendRatio: 0,
          secondaryFabricId: null,
          washCount: 8,
        },
      });
    } else if (presetName === 'bekishe_to_bridal') {
      set({
        activeArchetypeId: 'hasidic_strakes_bekishe',
        activeFabricId: 'lace_chiffon_lycra',
        activeEmbroideryId: 'swarovski_bridal_crystal',
        morph: {
          targetAnatomicalZone: 'asymmetric_avantgarde',
          inseamMergedToScarf: false,
          sleeveToHemStitched: true,
          elongationPercent: 165,
          twistAngleDeg: -65,
          ruchedGatheringIntensity: 0.62,
          volumeInflation: 1.45,
          asymmetryShift: -0.3,
          secondaryArchetypeId: 'israeli_bridal_mermaid',
          mashupBlendRatio: 0.55,
          secondaryFabricId: 'silk_bridal_tulle',
          washCount: 0,
        },
      });
    } else if (presetName === 'gottex_maskit_hybrid') {
      set({
        activeArchetypeId: 'gottex_resort_swim',
        activeFabricId: 'gottex_spandex_lycra',
        activeEmbroideryId: 'yemenite_silk',
        morph: {
          targetAnatomicalZone: 'full_body_drape',
          inseamMergedToScarf: false,
          sleeveToHemStitched: false,
          elongationPercent: 140,
          twistAngleDeg: 35,
          ruchedGatheringIntensity: 0.35,
          volumeInflation: 1.5,
          asymmetryShift: 0.15,
          secondaryArchetypeId: 'maskit_desert_couture',
          mashupBlendRatio: 0.65,
          secondaryFabricId: 'hasidic_wool_velvet_jacquard',
          washCount: 3,
        },
      });
    }
  },
}));
