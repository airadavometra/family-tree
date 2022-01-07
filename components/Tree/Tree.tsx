import dynamic from "next/dynamic";
import { FC } from "react";
import { ExtNode, Node } from "relatives-tree/lib/types";
import familyNodes from "./data/family.json";
import FamilyNode from "./FamilyNode/FamilyNode";
import s from "./Tree.module.css";
const ReactFamilyTree = dynamic(() => import("react-family-tree"), {
  ssr: false,
  loading: () => <p>Загружаем дерево...</p>,
});

const WIDTH = 70;
const HEIGHT = 80;

const nodes: Node[] = familyNodes as Node[];

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
        node={node}
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
