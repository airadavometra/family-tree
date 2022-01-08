import { Gender } from "relatives-tree/lib/types";
import props from "../../data/props.json";
import relations from "../../data/relations.json";
import { TreeNode } from "./types";

export const getTreeNodes = (): TreeNode[] => {
  const personPropsMap = Object.fromEntries(
    props.map((prop) => [prop.id, prop])
  );

  const treeNodes: TreeNode[] = relations.map((person) => {
    const props = personPropsMap[person.id];

    return {
      ...person,
      gender: getGender(props.gender),
      props,
    };
  });

  return treeNodes;
};

const getGender = (str: string) => (str === "m" ? "male" : "female") as Gender;
