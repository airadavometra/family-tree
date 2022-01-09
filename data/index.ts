import { TreeNode } from "../types/tree";
import { generateTreeNodes } from "./utils";

export const TREE_NODES: TreeNode[] = generateTreeNodes();
export const getTreeNodes = () => TREE_NODES;

const TREE_NODES_MAP = Object.fromEntries(
  TREE_NODES.map((node) => [node.id, node])
);
export const getTreeNodesMap = () => TREE_NODES_MAP;
