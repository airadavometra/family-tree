import { FC } from "react";
import { ExtNode } from "relatives-tree/lib/types";
import s from "./FamilyNode.module.css";

interface Props {
  node: ExtNode;
  style?: React.CSSProperties;
}

const FamilyNode: FC<Props> = ({ style }) => {
  return (
    <div style={style} className={s.root}>
      <div className={s.inner}>Node</div>
    </div>
  );
};

export default FamilyNode;
