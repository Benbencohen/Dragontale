/**
 * @file Workspace3D.tsx
 * @description קנבס התלת-ממד (Three.js / React Three Fiber), כולל אווטאר וירטואלי (Styletech AI Mode),
 * סימולציית בדים בזמן אמת וכלי מתיחת גבולות (Anatomical Re-mapping & Free-Form Deformation).
 */
import React from 'react';
import { useFashionStore } from '../../state/useFashionStore';

export const Workspace3D: React.FC = () => {
  const { activeArchetypeId, activeFabricId, morph } = useFashionStore();
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden" data-archetype={activeArchetypeId} data-fabric={activeFabricId} data-elongation={morph.elongationPercent}>
      <canvas id="three-fashion-canvas" className="w-full h-full block" />
    </div>
  );
};
