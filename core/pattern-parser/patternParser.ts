/**
 * @file patternParser.ts
 * @description המרה דו-כיוונית בין גזרה דו-ממדית (2D UV Pattern Panels) למודל התלת-ממדי (3D Mesh).
 */

import { GarmentArchetype, SeamConnection } from '../../types/fashion.types';

export class PatternParser {
  public static buildInitialSeams(archetype: GarmentArchetype): SeamConnection[] {
    const seams: SeamConnection[] = [];
    const panels = archetype.panels2D;
    for (let i = 0; i < panels.length; i++) {
      for (const targetId of panels[i].defaultSeamTargets) {
        const pairKey = [panels[i].panelId, targetId].sort().join('__');
        if (!seams.some((s) => s.seamId === pairKey)) {
          seams.push({
            seamId: pairKey,
            panelA: panels[i].panelId,
            panelB: targetId,
            isRipped: false,
            tensionFactor: 1.0,
          });
        }
      }
    }
    return seams;
  }
}
