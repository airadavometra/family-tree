import props from "../../data/props.json";

export const getNodesCount = (): number => {
  const nodesCount = props.length;

  return nodesCount;
};
