const { omitKeys } = require("./common.js");

const getNodesData = (transformedNodes) => {
  return transformedNodes.map((node) =>
    omitKeys(node, [
      "motherId",
      "fatherId",
      "stepMotherId",
      "stepFatherId",
      "spouseId",
    ])
  );
};

module.exports = {
  getNodesData,
};
