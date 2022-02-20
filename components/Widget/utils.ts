import { getFamiliesArray, getTreeNodesArray, getTreeNodesMap } from "@/data";
import { TreeNode } from "@/types/tree";

export const getNodesCount = (): number => {
  const nodes = getTreeNodesArray();

  return nodes.length;
};

export const getFamiliesCount = (): number => {
  const families = getFamiliesArray();

  return families.filter((family) => !family.lastName.startsWith("от (")).length;
};

export const getTreeDepth = (): number => {
  const nodes = getTreeNodesMap();

  return maxDepth(nodes[1], nodes);
};

const maxDepth = (rootNode: TreeNode, nodes: { [k: string]: TreeNode }): number => {
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
