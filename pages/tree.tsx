import type { NextPage } from "next";
import TreeNodeDetails from "../components/Tree/TreeNodeDetails/TreeNodeDetails";
import TreeWithNavigation from "../components/Tree/TreeWithNavigation/TreeWithNavigation";
import { TreeContextWrapper } from "../context/tree";

const TreePage: NextPage = () => (
  <TreeContextWrapper>
    <TreeWithNavigation />
    <TreeNodeDetails />
  </TreeContextWrapper>
);

export default TreePage;
