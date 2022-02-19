import { Family } from "@/types/family";
import { TreeNode } from "@/types/tree";
import { readFamilies, readNodesFromJson } from "./utils";

const TREE_NODES: TreeNode[] = readNodesFromJson();
export const getTreeNodesArray = () => TREE_NODES;

const TREE_NODES_MAP = Object.fromEntries(TREE_NODES.map((node) => [node.id, node]));
export const getTreeNodesMap = () => TREE_NODES_MAP;

const FAMILIES: Family[] = readFamilies();
export const getFamiliesArray = () => FAMILIES;

const FAMILIES_MAP = Object.fromEntries(FAMILIES.map((family) => [family.id, family]));
export const getFamiliesMap = () => FAMILIES_MAP;
