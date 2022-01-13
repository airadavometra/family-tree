import nodes from "../../data/nodes.json";

export const getNodesCount = (): number => {
  const nodesCount = nodes.length;

  return nodesCount;
};
