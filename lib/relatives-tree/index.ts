import { inChildDirection } from "./children";
import { connectors } from "./connectors";
import { inMiddleDirection } from "./middle";
import { placeholders } from "./middle/placeholders";
import { inParentDirection } from "./parents";
import Store from "./store";
import type { Node, Options, RelData } from "./types";
import { pipe } from "./utils";
import { correctPositions } from "./utils/correctPositions";
import { getCanvasSize } from "./utils/getCanvasSize";
import { getExtendedNodes } from "./utils/getExtendedNodes";

const calcFamilies = pipe(inMiddleDirection, inParentDirection, inChildDirection, correctPositions);

const calcTree = (nodes: readonly Node[], options: Options): RelData => {
  const store = new Store(nodes, options.rootId);
  if (options.placeholders) placeholders(store);

  const families = calcFamilies(store).familiesArray;

  return {
    families: families,
    canvas: getCanvasSize(families),
    nodes: getExtendedNodes(families),
    connectors: connectors(families),
  };
};

export default calcTree;
