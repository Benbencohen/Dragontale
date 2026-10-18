/**
 * @file FabricInspector.tsx
 * @description בוחן מיקרו-מבנה של הבד, מונה כביסות (מדד התרככות פשתן) וסימולטור אקלים ולחות.
 */
import React from 'react';
import { useFashionStore } from '../../state/useFashionStore';
import { FABRICS_DB } from '../../data/fabrics.db';

export const FabricInspector: React.FC = () => {
  const { activeFabricId, morph, updateMorph } = useFashionStore();
  const fabric = FABRICS_DB[activeFabricId];
  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
      <h3 className="text-sm font-bold text-slate-100">{fabric.nameHe}</h3>
      <p className="text-xs text-slate-400 mt-1">{fabric.causalExplanationHe}</p>
      <input
        type="range"
        min={0}
        max={50}
        value={morph.washCount}
        onChange={(e) => updateMorph({ washCount: Number(e.target.value) })}
      />
    </div>
  );
};
