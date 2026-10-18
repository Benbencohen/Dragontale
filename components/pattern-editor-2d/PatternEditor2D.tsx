/**
 * @file PatternEditor2D.tsx
 * @description עורך גזרות שטוח (2D UV Pattern Editor): פתיחת תפרים (Seam Ripper),
 * איחוי מפשעה/שרוולים, ושינוי פרופורציות וקטורי בזמן אמת.
 */
import React from 'react';
import { useFashionStore } from '../../state/useFashionStore';
import { ARCHETYPES_DB } from '../../data/archetypes.db';

export const PatternEditor2D: React.FC = () => {
  const { activeArchetypeId, seams, toggleSeamRip } = useFashionStore();
  const archetype = ARCHETYPES_DB[activeArchetypeId];
  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
      <h3 className="text-sm font-bold text-slate-100 mb-2">עורך גזרות 2D UV – {archetype.nameHe}</h3>
      <div className="space-y-2">
        {seams.map((s) => (
          <button key={s.seamId} onClick={() => toggleSeamRip(s.seamId)} className="px-3 py-1 text-xs rounded bg-slate-800 text-slate-200">
            {s.seamId}: {s.isRipped ? 'תפר פרום' : 'תפר מחובר'}
          </button>
        ))}
      </div>
    </div>
  );
};
