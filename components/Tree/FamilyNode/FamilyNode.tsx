import { FC } from "react";
import { TreeExtNode } from "../types";
import s from "./FamilyNode.module.css";

interface Props {
  node: TreeExtNode;
  style?: React.CSSProperties;
}

const FamilyNode: FC<Props> = ({ style, node }) => {
  return (
    <div style={style} className={s.root}>
      <div className={s.inner}>{node.props.name}</div>
    </div>
  );
};

export default FamilyNode;
