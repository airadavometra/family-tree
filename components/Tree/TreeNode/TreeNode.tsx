import { TreeExternalNode } from "@/types/tree";
import classNames from "classnames";
import { FC, memo, useState } from "react";
import s from "./TreeNode.module.css";
import { TreeNodeYears } from "./TreeNodeYears";
import { getTreeNodeStyleTransform } from "./utils";

interface TreeNodeProps {
  width: number;
  height: number;
  isSelected: boolean;
  node: TreeExternalNode;
  onClick: (id: string, hasSubTree?: boolean) => void;
}

const TreeNode: FC<TreeNodeProps> = ({ isSelected, node, onClick, width, height }) => {
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
        <button
          onClick={() => {
            onClick(node.id, node.hasSubTree);
          }}
          className={classNames(s.inner, s[gender], {
            [s.animated]: isSelected || isMouseOver,
            [s.hasSubtree]: node.hasSubTree,
          })}
        >
          <div className={s.fullName}>
            <span className={s.firstName}>{firstName}</span>
            <span className={s.lastName}>{lastName}</span>
          </div>
          <TreeNodeYears birthYear={birthYear} deathYear={deathYear} />
        </button>
      </div>
    </div>
  );
};

export default memo(TreeNode);
