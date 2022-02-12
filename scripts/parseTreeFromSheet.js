const { getTransformedNodesFromInputCsv } = require("./utils/transformInput.js");
const { writeToJson } = require("./utils/common.js");
const { getNodesData } = require("./utils/nodesData.js");
const { getRelations } = require("./utils/relations.js");
const { getAllFamilies } = require("./utils/families.js");

const PATH_TO_INPUT_CSV = "Узлы фамильного дерева - Люди.csv";

const parseTree = async () => {
  const inputTreeNodes = await getTransformedNodesFromInputCsv(PATH_TO_INPUT_CSV);
  const { relations, relationsMap } = getRelations(inputTreeNodes);
  const nodesData = getNodesData(inputTreeNodes, relationsMap);

  const families = getAllFamilies(nodesData);

  writeToJson(nodesData, "nodes");
  writeToJson(relations, "relations");
  writeToJson({ families }, "meta");
};

parseTree();
