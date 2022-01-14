import type { NextPage } from "next";
import Link from "next/link";
import TreeNodeDetails from "../components/Tree/TreeNodeDetails/TreeNodeDetails";
import TreeWithNavigation from "../components/Tree/TreeWithNavigation/TreeWithNavigation";
import { TreeContextWrapper, useTreeRootId } from "../context/tree";
import s from "../styles/TreePage.module.css";

const TreePage: NextPage = () => {
  const { rootId } = useTreeRootId();

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
