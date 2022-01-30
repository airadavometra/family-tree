import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import TreeNodeDetails from "../components/Tree/TreeNodeDetails/TreeNodeDetails";
import TreeWithNavigation from "../components/Tree/TreeWithNavigation/TreeWithNavigation";
import { NodeSelectionContextProvider, useUrlTreeRootId } from "../context/tree";
import { getTreeNodesMap } from "../data";
import s from "../styles/TreePage.module.css";

const TreePage: NextPage = () => {
  const router = useRouter();
  const { rootId } = useUrlTreeRootId();

  const treeNodesMap = getTreeNodesMap();

  if (rootId && treeNodesMap[rootId] === undefined) {
    router.push("/404");
    return null;
  }

  return (
    <NodeSelectionContextProvider>
      {rootId && (
        <Link href="/tree">
          <a className={s.homeTreeLink}>К основному дереву</a>
        </Link>
      )}
      <TreeWithNavigation />
      <TreeNodeDetails />
    </NodeSelectionContextProvider>
  );
};

export default TreePage;
