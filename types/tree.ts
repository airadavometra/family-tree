import { ExtNode, Node, RelType } from "relatives-tree/lib/types";

export type TreeExternalNode = ExtNode & TreeNode;

export type TreeNode = Node & {
  data: TreeNodeDerivedData;
};

export type TreeNodeDerivedData = TreeNodeData & {
  fullName: string;
};

export type TreeNodeData = {
  id: string;
  firstName: string;
} & Partial<{
  lastName: string;
  patronym: string;
  gender: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthPlace: string;
  deathYear: number;
  deathMonth: number;
  deathDay: number;
  deathPlace: string;
  nationality: string;
  education: string;
  occupation: string;
  rewards: string[];
  bio: string;
}>;
export type TreeNodeRelation = Readonly<{
  id: string;
  type: RelType;
}>;

export type RelationShortInfo = {
  id: string;
  fullName: string;
};

export type TreeNodeDetailsWithRelations = TreeNodeDerivedData & {
  parents: RelationShortInfo[];
  children: RelationShortInfo[];
  siblings: RelationShortInfo[];
  spouses: RelationShortInfo[];
};
