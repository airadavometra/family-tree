import { ExtNode, Node } from "relatives-tree/lib/types";

export type TreeExternalNode = ExtNode & TreeNode;

export type TreeNode = Node & {
  data: TreeNodeDerivedData;
};

export type TreeNodeData = Partial<{
  gender: string;
  maidenName: string;
  lastName: string;
  firstName: string;
  patronym: string;
  birthDate: TreeNodeDate;
  deathDate: TreeNodeDate;
}>;

export type TreeNodeDerivedData = TreeNodeData & {
  fullName: string;
};

export type TreeNodeDate = number[];
