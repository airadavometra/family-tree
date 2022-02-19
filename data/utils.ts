import { TreeNode, TreeNodeDataFromJson } from "@/types/tree";
import nodesData from "./nodes.json";
import nodesRelations from "./relations.json";
import families from "./meta.json";
import { Family } from "@/types/family";

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
        families: data.families.sort((a, b) => {
          if (a.lastName > b.lastName) {
            return 1;
          }
          if (a.lastName < b.lastName) {
            return -1;
          }
          return 0;
        }),
      },
    } as TreeNode;
  });
  return treeNodes;
};

export const readFamilies = (): Family[] => {
  return families.families.map((family) => ({ id: family.id, lastName: family.lastName }));
};

const getFullName = ({ firstName, lastName, patronym }: TreeNodeDataFromJson): string => {
  const full = [];

  if (lastName) full.push(lastName);
  if (firstName) full.push(firstName);
  if (patronym) full.push(patronym);

  return full.join(" ");
};
