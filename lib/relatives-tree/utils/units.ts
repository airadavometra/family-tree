import { SIZE } from "../constants";
import type { Family, Node, Unit } from "../types";
import { prop } from "./index";

export const newUnit = (fid: number, nodes: readonly Node[], isChild = false): Unit => ({
  fid,
  child: isChild,
  nodes: [...nodes],
  pos: 0,
});

export const nodeIds = (unit: Unit): readonly string[] => unit.nodes.map(prop("id"));
export const nodeCount = (unit: Unit): number => unit.nodes.length;
export const hasChildren = (unit: Unit): boolean => unit.nodes.some((node) => node.children.length);
export const rightSide = (unit: Unit): number => unit.pos + nodeCount(unit) * SIZE;
const sortNodeIdsCb = (nodeIdA: string, nodeIdB: string) => +nodeIdA - +nodeIdB;
export const sameAs = (target: Unit) => (unit: Unit) =>
  // @ts-ignore
  nodeIds(target).sort(sortNodeIdsCb).join("") === nodeIds(unit).sort(sortNodeIdsCb).join("");
export const getUnitX = (family: Family, unit: Unit) => family.X + unit.pos;
export const unitsToNodes = (units: readonly Unit[]) => units.map(prop("nodes")).flat();

export const arrangeInOrder = (units: readonly Unit[]): void => {
  units.forEach((unit, idx, self) => (unit.pos = idx === 0 ? 0 : rightSide(self[idx - 1]!)));
};

export const correctUnitsShift = (units: readonly Unit[], shift: number) =>
  units.forEach((unit) => (unit.pos += shift));
