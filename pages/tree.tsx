import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TreeNodeDetails from "../components/Tree/TreeNodeDetails/TreeNodeDetails";
import TreeWithNavigation from "../components/Tree/TreeWithNavigation/TreeWithNavigation";
import { NodeSelectionContextProvider, useUrlTreeRootId } from "../context/tree";
import { getTreeNodesMap } from "../data";
import s from "../styles/TreePage.module.css";

const TreePage: NextPage = () => {
  const [rootName, setRootName] = useState<string>();
  const router = useRouter();
  const { rootId } = useUrlTreeRootId();

  const treeNodesMap = getTreeNodesMap();

  useEffect(() => {
    if (rootId && treeNodesMap[rootId] !== undefined) {
      setRootName(treeNodesMap[rootId].data.fullName);
    } else {
      setRootName(treeNodesMap[1].data.fullName);
    }
  }, [rootId]);

  if (rootId && treeNodesMap[rootId] === undefined) {
    router.push("/404");
    return null;
  }

  return (
    <NodeSelectionContextProvider>
      <div className={s.absoluteContainer}>
        <div className={s.treeRootNameContainer}>
          <span className={s.treeRootTitle}>Корень дерева</span>
          <span className={s.treeRootName}>{rootName}</span>
        </div>
        {rootId && (
          <Link href="/tree">
            <a className={s.homeTreeLink}>К основному дереву</a>
          </Link>
        )}
      </div>

      <TreeWithNavigation />
      <TreeNodeDetails />
    </NodeSelectionContextProvider>
  );
};

export default TreePage;
