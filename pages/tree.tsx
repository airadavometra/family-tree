import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import TreeNodeDetails from "../components/Tree/TreeNodeDetails/TreeNodeDetails";
import TreeWithNavigation from "../components/Tree/TreeWithNavigation/TreeWithNavigation";
import { TreeContextWrapper, useTreeRootId } from "../context/tree";
import { getTreeNodesMap } from "../data";
import s from "../styles/TreePage.module.css";

const TreePage: NextPage = () => {
  const router = useRouter();
  const { rootId } = useTreeRootId();

  const treeNodesMap = getTreeNodesMap();

  if (rootId && treeNodesMap[rootId] === undefined) {
    router.push("/404");
    return null;
  }

  return (
    <TreeContextWrapper>
      {rootId && (
        <Link href="/tree">
          <a className={s.homeTreeLink}>Исходное дерево</a>
        </Link>
      )}
      <TreeWithNavigation />
      <TreeNodeDetails />
    </TreeContextWrapper>
  );
};

export default TreePage;
