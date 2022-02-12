import { ExtNode, Node, RelType } from "../lib/relatives-tree/types";

export type TreeNode = Node & {
  data: TreeNodeData;
};

export type TreeExternalNode = ExtNode & TreeNode;

export type TreeNodeDataFromJson = {
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
export type TreeNodeData = TreeNodeDataFromJson & {
  fullName: string;
};
export type TreeNodeRelation = Readonly<{
  id: string;
  type: RelType;
}>;

export type RelationShortInfo = {
  id: string;
  fullName: string;
};

export type TreeNodeDataWithRelations = TreeNodeData & {
  parents: RelationShortInfo[];
  children: RelationShortInfo[];
  siblings: RelationShortInfo[];
  spouses: RelationShortInfo[];
};
