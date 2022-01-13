import { Gender } from "relatives-tree/lib/types";
import { TreeNode, TreeNodeData } from "../types/tree";
import nodesData from "./nodes.json";
import nodesRelations from "./relations.json";

export const generateTreeNodes = (): TreeNode[] => {
  const nodeDataMap = Object.fromEntries(
    nodesData.map((nodeData) => [nodeData.id, nodeData])
  );

  const treeNodes: TreeNode[] = nodesRelations.map((node) => {
    const data = nodeDataMap[node.id];

    return {
      ...node,
      gender: getGender(data.gender),
      data: {
        ...data,
        fullName: getFullName(data),
      },
    } as TreeNode;
  });

  return treeNodes;
};

const getFullName = ({
  firstName,
  lastName,
  maidenName,
  patronym,
}: TreeNodeData): string => {
  const full = [];

  if (lastName) full.push(lastName);
  if (maidenName) full.push(`(${maidenName})`);
  if (firstName) full.push(firstName);
  if (patronym) full.push(patronym);

  return full.join(" ");
};

const getGender = (str: string) => (str === "m" ? "male" : "female") as Gender;
