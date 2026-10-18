/**
 * @file App.tsx
 * @description קומפוננטת השורש המחברת בין סביבת התלת-ממד, עורך הגזרות הדו-ממדי,
 * בוחן הבדים ופאנל האנליטיקה ושרשרת האספקה.
 */
import React from 'react';
import { Workspace3D } from './components/workspace-3d/Workspace3D';
import { PatternEditor2D } from './components/pattern-editor-2d/PatternEditor2D';
import { FabricInspector } from './components/fabric-inspector/FabricInspector';
import { AnalyticsPanel } from './components/analytics-panel/AnalyticsPanel';

export default function App() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-slate-100 grid grid-cols-12 gap-4 p-4">
      <div className="col-span-3 space-y-4">
        <FabricInspector />
        <PatternEditor2D />
      </div>
      <div className="col-span-6">
        <Workspace3D />
      </div>
      <div className="col-span-3">
        <AnalyticsPanel />
      </div>
    </div>
  );
}
