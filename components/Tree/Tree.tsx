import { useNodeSelectionContext, useUrlTreeRootId } from "@/context/tree";
import { getTreeNodesArray } from "@/data";
import { TREE_NODE_SIZE } from "@/lib/react-family-tree/constants";
import { ExtNode } from "@/lib/relatives-tree/types";
import { TreeExternalNode } from "@/types/tree";
import dynamic from "next/dynamic";
import { FC, memo } from "react";
import s from "./Tree.module.css";
import TreeNode from "./TreeNode/TreeNode";

const ReactFamilyTree = dynamic(() => import("@/lib/react-family-tree"), {
  ssr: false,
  loading: () => <p>Загружаем дерево...</p>,
});

const nodes = getTreeNodesArray();

const Tree: FC = () => {
  const { selectNode, selectedNodeId } = useNodeSelectionContext();
  const { rootId } = useUrlTreeRootId();

  return (
    <ReactFamilyTree
      nodes={nodes}
      rootId={rootId ?? nodes[0].id}
      width={TREE_NODE_SIZE}
      height={TREE_NODE_SIZE}
      className={s.root}
      renderNode={(node: ExtNode) => (
        <TreeNode
          isSelected={selectedNodeId === node.id}
          key={node.id}
          node={node as TreeExternalNode}
          onClick={selectNode}
          width={TREE_NODE_SIZE}
          height={TREE_NODE_SIZE}
        />
      )}
    />
  );
};

export default memo(Tree);
