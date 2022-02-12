import { TreeExternalNode } from "@/types/tree";

export const getTreeNodeStyleTransform = (node: TreeExternalNode, width: number, height: number) =>
  `translate(${node.left * (width / 2)}px, ${node.top * (height / 2)}px)`;
