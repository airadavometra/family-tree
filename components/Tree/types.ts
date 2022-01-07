import { ExtNode, Node } from "relatives-tree/lib/types";

export type TreeExtNode = ExtNode & TreeNodeProps;

export type TreeNode = Node & TreeNodeProps;

export type TreeNodeProps = Readonly<{
  props: {
    firstName: string;
    lastName: string;
    birthYear: number;
    deathYear: number;
  };
}>;
