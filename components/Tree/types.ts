import { ExtNode, Node } from "relatives-tree/lib/types";

export type TreeExtNode = ExtNode &
  Readonly<{
    props: {
      name: string;
    };
  }>;

export type TreeNode = Node &
  Readonly<{
    props: {
      name: string;
    };
  }>;
