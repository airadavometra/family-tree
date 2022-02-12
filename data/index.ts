import { TreeNode } from "@/types/tree";
import { readNodesFromJson } from "./utils";

const TREE_NODES: TreeNode[] = readNodesFromJson();
export const getTreeNodesArray = () => TREE_NODES;

const TREE_NODES_MAP = Object.fromEntries(TREE_NODES.map((node) => [node.id, node]));
export const getTreeNodesMap = () => TREE_NODES_MAP;
