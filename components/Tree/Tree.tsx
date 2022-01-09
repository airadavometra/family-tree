import dynamic from "next/dynamic";
import { FC, useCallback, useState } from "react";
import { ExtNode } from "relatives-tree/lib/types";
import { useTree } from "../../context/tree";
import { getTreeNodes } from "../../data";
import { TreeExtNode } from "../../types/tree";
import FamilyNode from "./FamilyNode/FamilyNode";
import s from "./Tree.module.css";

const ReactFamilyTree = dynamic(() => import("react-family-tree"), {
  ssr: false,
  loading: () => <p>Загружаем дерево...</p>,
});

const WIDTH = 280;
const HEIGHT = 280;

const nodes = getTreeNodes();
const rootId = nodes[0].id;

const Tree: FC = () => {
  const { openNodeDetails, nodeDetailsId } = useTree();

  return (
    <ReactFamilyTree
      nodes={nodes}
      rootId={rootId}
      width={WIDTH}
      height={HEIGHT}
      className={s.root}
      renderNode={(node: ExtNode) => (
        <FamilyNode
          selectedNodeId={nodeDetailsId}
          key={node.id}
          node={node as TreeExtNode}
          onClick={openNodeDetails}
          style={{
            width: WIDTH,
            height: HEIGHT,
            transform: `translate(${node.left * (WIDTH / 2)}px, ${
              node.top * (HEIGHT / 2)
            }px)`,
          }}
        />
      )}
    />
  );
};

export default Tree;
