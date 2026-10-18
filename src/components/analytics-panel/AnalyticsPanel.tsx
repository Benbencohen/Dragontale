/**
 * @file AnalyticsPanel.tsx
 * @description פאנל אנליטי: מנוע שרשרת אספקה (נחלת בנימין מול רבי עקיבא),
 * מחשבון תמחור ורווחיות גולמית, ומודול פאשן-טק וקיימות (Kornit, Sonovia, Styletech).
 */
import React from 'react';
import { useFashionStore } from '../../state/useFashionStore';
import { FABRICS_DB } from '../../data/fabrics.db';
import { SUPPLY_CHAIN_HUBS_DB } from '../../data/supply-chain.db';

export const AnalyticsPanel: React.FC = () => {
  const { activeFabricId } = useFashionStore();
  const fabric = FABRICS_DB[activeFabricId];
  const hub = SUPPLY_CHAIN_HUBS_DB[fabric.primarySourcingHub];
  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
      <h3 className="text-sm font-bold text-emerald-400">{hub.titleHe}</h3>
      <p className="text-xs text-slate-300 mt-1">{hub.commercialModelHe}</p>
    </div>
  );
};
