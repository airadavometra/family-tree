import classNames from "classnames";
import { FC, memo, useState } from "react";
import { TreeExternalNode } from "../../../types/tree";
import s from "./TreeNode.module.css";
import { TreeNodeYears } from "./TreeNodeYears";
import { getTreeNodeStyleTransform } from "./utils";

interface TreeNodeProps {
  width: number;
  height: number;
  isSelected: boolean;
  node: TreeExternalNode;
  onClick: (id: string) => void;
}

const TreeNode: FC<TreeNodeProps> = ({
  isSelected,
  node,
  onClick,
  width,
  height,
}) => {
  const { data, gender } = node;
  const { firstName, lastName, birthYear, deathYear } = data;

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
          onClick={() => {
            onClick(node.id);
          }}
          onTouchStart={() => {
            onClick(node.id);
          }}
          className={classNames(s.inner, s[gender], {
            [s.floating]: isSelected || isMouseOver,
          })}
        >
          <div className={s.fullName}>
            <span className={s.firstName}>{firstName}</span>
            <span className={s.lastName}>{lastName}</span>
          </div>
          <TreeNodeYears birthYear={birthYear} deathYear={deathYear} />
        </div>
      </div>
    </div>
  );
};

export default memo(TreeNode);
