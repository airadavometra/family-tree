import dynamic from "next/dynamic";
import { FC, memo } from "react";
import { ExtNode } from "relatives-tree/lib/types";
import { useNodeSelectionContext, useUrlTreeRootId } from "../../context/tree";
import { getTreeNodesArray } from "../../data";
import { TreeExternalNode } from "../../types/tree";
import s from "./Tree.module.css";
import TreeNode from "./TreeNode/TreeNode";

const ReactFamilyTree = dynamic(() => import("react-family-tree"), {
  ssr: false,
  loading: () => <p>Загружаем дерево...</p>,
});

const WIDTH = 280;
const HEIGHT = 280;

const nodes = getTreeNodesArray();

const Tree: FC = () => {
  const { selectNode, selectedNodeId } = useNodeSelectionContext();
  const { rootId } = useUrlTreeRootId();

  return (
    <ReactFamilyTree
      nodes={nodes}
      rootId={rootId ?? nodes[0].id}
      width={WIDTH}
      height={HEIGHT}
      className={s.root}
      renderNode={(node: ExtNode) => (
        <TreeNode
          isSelected={selectedNodeId === node.id}
          key={node.id}
          node={node as TreeExternalNode}
          onClick={selectNode}
          width={WIDTH}
          height={HEIGHT}
        />
      )}
    />
  );
};

export default memo(Tree);
