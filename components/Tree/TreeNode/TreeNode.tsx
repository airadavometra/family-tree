import classNames from "classnames";
import { FC, memo, useState } from "react";
import { TreeExtNode } from "../../../types/tree";
import s from "./TreeNode.module.css";
import { TreeNodeYears } from "./TreeNodeYears";
import { getTreeNodeStyleTransform } from "./utils";

interface TreeNodeProps {
  width: number;
  height: number;
  isSelected: boolean;
  node: TreeExtNode;
  onClick: (id: string) => void;
}

const TreeNode: FC<TreeNodeProps> = ({
  isSelected,
  node,
  onClick,
  width,
  height,
}) => {
  const { props, gender } = node;
  const { firstName, lastName, birthDate, deathDate } = props;

  const [isMouseOver, setMouseOver] = useState(false);

  return (
    <div
      style={{
        width: width,
        height: height,
        transform: getTreeNodeStyleTransform(node, width, height),
      }}
      className={s.root}
    >
      <div
        className={classNames(s.scalingWrapper, {
          [s.selected]: isSelected,
        })}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        <div
          onClick={() => onClick(node.id)}
          className={classNames(s.inner, s[gender], {
            [s.floating]: isSelected || isMouseOver,
          })}
        >
          <div className={s.fullName}>
            <span className={s.firstName}>{firstName}</span>
            <span className={s.lastName}>{lastName}</span>
          </div>
          <TreeNodeYears birthDate={birthDate} deathDate={deathDate} />
        </div>
      </div>
    </div>
  );
};

export default memo(TreeNode);
