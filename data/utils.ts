import { Gender } from "relatives-tree/lib/types";
import { TreeNode } from "../types/tree";
import nodesData from "./props.json";
import nodesRelations from "./relations.json";

export const generateTreeNodes = (): TreeNode[] => {
  const personPropsMap = Object.fromEntries(
    nodesData.map((prop) => [prop.id, prop])
  );

  const treeNodes: TreeNode[] = nodesRelations.map((person) => {
    const props = personPropsMap[person.id];

    return {
      ...person,
      gender: getGender(props.gender),
      props,
    } as TreeNode;
  });

  return treeNodes;
};

const getGender = (str: string) => (str === "m" ? "male" : "female") as Gender;
