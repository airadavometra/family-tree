import { TreeNode, TreeNodeDataFromJson } from "../types/tree";
import nodesData from "./nodes.json";
import nodesRelations from "./relations.json";

export const readNodesFromJson = (): TreeNode[] => {
  const nodeDataMap = Object.fromEntries(nodesData.map((nodeData) => [nodeData.id, nodeData]));

  const treeNodes: TreeNode[] = nodesRelations.map((node) => {
    const data = nodeDataMap[node.id];

    return {
      ...node,
      gender: data.gender,
      data: {
        ...data,
        fullName: getFullName(data),
      },
    } as TreeNode;
  });

  return treeNodes;
};

const getFullName = ({ firstName, lastName, patronym }: TreeNodeDataFromJson): string => {
  const full = [];

  if (lastName) full.push(lastName);
  if (firstName) full.push(firstName);
  if (patronym) full.push(patronym);

  return full.join(" ");
};
