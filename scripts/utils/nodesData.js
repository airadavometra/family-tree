const { omitKeys } = require("./common.js");

const getNodesData = (transformedNodes) => {
  return transformedNodes.map((node) =>
    omitKeys(node, ["motherId", "fatherId", "spouseId"])
  );
};

module.exports = {
  getNodesData,
};
