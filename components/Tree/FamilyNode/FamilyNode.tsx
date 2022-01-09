import classNames from "classnames";
import { FC, memo, useCallback, useState } from "react";
import { TreeExtNode, TreeNodeDate } from "../../../types/tree";
import s from "./FamilyNode.module.css";

interface FamilyNodeProps {
  selectedNodeId?: string;
  node: TreeExtNode;
  style?: React.CSSProperties;
  onClick: (id: string) => void;
}

export default memo<FamilyNodeProps>(function FamilyNode({
  selectedNodeId,
  style,
  node,
  onClick,
}) {
  const { props, gender } = node;
  const { firstName, lastName, birthDate, deathDate } = props;

  return (
    <div style={style} className={s.root}>
      <div
        className={classNames(s.scaling, {
          [s.selected]: selectedNodeId === node.id,
        })}
      >
        <div
          onClick={() => onClick(node.id)}
          className={classNames(s.inner, s[gender])}
        >
          <div className={s.fullName}>
            <span className={s.firstName}>{firstName}</span>
            <span className={s.lastName}>{lastName}</span>
          </div>
          <FamilyNodeYears birthDate={birthDate} deathDate={deathDate} />
        </div>
      </div>
    </div>
  );
});

type FamilyNodeYearsProps = {
  birthDate?: TreeNodeDate;
  deathDate?: TreeNodeDate;
};
const FamilyNodeYears: FC<FamilyNodeYearsProps> = ({
  birthDate,
  deathDate,
}) => {
  if (!birthDate && !deathDate) {
    return null;
  }

  const birthYear = birthDate && birthDate[0];
  const deathYear = deathDate && deathDate[0];

  return (
    <div className={s.years}>
      {birthYear && <span className={s.birthYear}>{birthYear}</span>}
      <span className={s.yearsDelimiter}>&nbsp;–&nbsp;</span>
      {deathYear && <span className={s.deathYear}>{deathYear}</span>}
    </div>
  );
};
