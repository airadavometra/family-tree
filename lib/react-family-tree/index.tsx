import { useNavigationContext } from "@/context/navigation";
import calcTree from "@/lib/relatives-tree";
import { ExtNode, Node } from "@/lib/relatives-tree/types";
import React, { useEffect } from "react";
import Connector from "./connector";

interface Props {
  nodes: ReadonlyArray<Node>;
  rootId: string;
  width: number;
  height: number;
  placeholders?: boolean;
  className?: string;
  renderNode: (node: ExtNode) => React.ReactNode;
}

export default React.memo<Props>(function ReactFamilyTree(props) {
  const { setRootCoords } = useNavigationContext();

  // @ts-ignore
  const data = calcTree(props.nodes, {
    rootId: props.rootId,
    placeholders: props.placeholders,
  });

  const width = props.width / 2;
  const height = props.height / 2;

  useEffect(() => {
    const x = (data.families[0].X ?? 0) * width;
    const y = (data.families[0].Y ?? 0) * height;
    setRootCoords({ x, y });
  }, [data]);

  return (
    <div
      className={props.className}
      style={{
        position: "relative",
        width: data.canvas.width * width,
        height: data.canvas.height * height,
      }}
    >
      {data.connectors.map((connector, idx) => (
        <Connector key={idx} connector={connector} width={width} height={height} />
      ))}
      {/* @ts-ignore */}
      {data.nodes.map(props.renderNode)}
    </div>
  );
});
