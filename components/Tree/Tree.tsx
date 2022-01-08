import dynamic from "next/dynamic";
import { FC } from "react";
import { ExtNode } from "relatives-tree/lib/types";
import FamilyNode from "./FamilyNode/FamilyNode";
import s from "./Tree.module.css";
import { TreeExtNode, TreeNode } from "./types";
import { getTreeNodes } from "./utils";
const ReactFamilyTree = dynamic(() => import("react-family-tree"), {
  ssr: false,
  loading: () => <p>Загружаем дерево...</p>,
});

const WIDTH = 280;
const HEIGHT = 280;

const nodes: TreeNode[] = getTreeNodes();

const rootId = nodes[0].id;

const Tree: FC = () => (
  <ReactFamilyTree
    nodes={nodes}
    rootId={rootId}
    width={WIDTH}
    height={HEIGHT}
    className={s.root}
    renderNode={(node: ExtNode) => (
      <FamilyNode
        key={node.id}
        node={node as TreeExtNode}
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

export default Tree;
