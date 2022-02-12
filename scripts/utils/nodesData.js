const { omitKeys } = require("./common.js");
const { getNodesWithFamilies } = require("./families.js");

const getNodesData = (transformedNodes, relationsMap) => {
  const nodes = transformedNodes.map((node) =>
    omitKeys(node, ["motherId", "fatherId", "stepMotherId", "stepFatherId", "spouseId"])
  );

  return getNodesWithFamilies(nodes, relationsMap);
};

module.exports = {
  getNodesData,
};
