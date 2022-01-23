import { getTreeNodesMap } from "../../data";
import nodes from "../../data/nodes.json";
import { TreeNode } from "../../types/tree";

export const getNodesCount = (): number => {
  const nodesCount = nodes.length;

  return nodesCount;
};

export const getTreeDepth = (): number => {
  const nodes = getTreeNodesMap();

  return maxDepth(nodes[1], nodes);
};
const maxDepth = (
  rootNode: TreeNode,
  nodes: { [k: string]: TreeNode }
): number => {
  if (rootNode == null) return 0;
  else {
    const depths: number[] = [];
    for (const childNodeInfo of rootNode.children) {
      const childNode = nodes[childNodeInfo.id];
      depths.push(maxDepth(childNode, nodes));
    }
    return Math.max(...depths, 0) + 1;
  }
};
