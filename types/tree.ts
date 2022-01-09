import { ExtNode, Node } from "relatives-tree/lib/types";

export type TreeExtNode = ExtNode & TreeNode;

export type TreeNode = Node & {
  props: TreeNodeGeneratedProps;
};

export type TreeNodeProps = Partial<{
  gender: string;
  maidenName: string;
  lastName: string;
  firstName: string;
  patronym: string;
  birthDate: TreeNodeDate;
  deathDate: TreeNodeDate;
}>;

export type TreeNodeGeneratedProps = TreeNodeProps & {
  fullName: string;
};

export type TreeNodeDate = number[];
