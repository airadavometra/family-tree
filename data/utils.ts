import { Gender } from "relatives-tree/lib/types";
import { TreeNode, TreeNodeProps } from "../types/tree";
import nodesData from "./nodes.json";
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
      props: {
        ...props,
        fullName: getFullName(props),
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
}: TreeNodeProps): string => {
  const full = [];

  if (lastName) full.push(lastName);
  if (maidenName) full.push(`(${maidenName})`);
  if (firstName) full.push(firstName);
  if (patronym) full.push(patronym);

  return full.join(" ");
};

const getGender = (str: string) => (str === "m" ? "male" : "female") as Gender;
