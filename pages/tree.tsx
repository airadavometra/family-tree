import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TreeNodeDetails from "../components/Tree/TreeNodeDetails/TreeNodeDetails";
import TreeWithNavigation from "../components/Tree/TreeWithNavigation/TreeWithNavigation";
import { TreeContextWrapper } from "../context/tree";
import s from "../styles/TreePage.module.css";

const TreePage: NextPage = () => {
  const router = useRouter();
  const [rootId, setRootId] = useState<string>();

  useEffect(() => {
    const { root } = router.query;
    const queryRootId = root
      ? Array.isArray(root)
        ? root[0]
        : root
      : undefined;
    if (queryRootId === undefined) {
      setRootId(undefined);
    } else {
      setRootId(queryRootId);
    }
  }, [rootId, router]);

  return (
    <TreeContextWrapper>
      {rootId && (
        <Link href="/tree">
          <a className={s.homeTreeLink}>Исходное дерево</a>
        </Link>
      )}
      <TreeWithNavigation rootId={rootId} />
      <TreeNodeDetails />
    </TreeContextWrapper>
  );
};

export default TreePage;
