import { ExtNode, Node } from "relatives-tree/lib/types";

export type TreeExtNode = ExtNode & TreeNodeProps;

export type TreeNode = Node & TreeNodeProps;

export type TreeNodeProps = Readonly<{
  props: Partial<{
    gender: string;
    maidenName: string;
    lastName: string;
    firstName: string;
    patronym: string;
    birthDate: TreeNodeDate;
    deathDate: TreeNodeDate;
  }>;
}>;

export type TreeNodeDate = number[];
