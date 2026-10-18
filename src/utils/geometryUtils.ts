/**
 * @file geometryUtils.ts
 * @description פונקציות עזר לחישובים גיאומטריים, ייצוא קובצי OBJ וייצוא מפרט טכני (Tech-Pack JSON).
 */
import { Vertex3D } from '../core/morph-engine/morphEngine';

export function exportVerticesToOBJ(vertices: Vertex3D[], garmentName: string): string {
  const lines = [`# Israeli Fashion-Tech 3D CAD Export: ${garmentName}`];
  for (const v of vertices) {
    lines.push(`v ${v.x.toFixed(4)} ${v.y.toFixed(4)} ${v.z.toFixed(4)}`);
    lines.push(`vt ${v.u.toFixed(4)} ${v.v.toFixed(4)}`);
  }
  return lines.join('\n');
}
