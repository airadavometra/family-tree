import classNames from "classnames";
import { FC } from "react";
import { TreeExtNode } from "../types";
import s from "./FamilyNode.module.css";

interface Props {
  node: TreeExtNode;
  style?: React.CSSProperties;
}

const FamilyNode: FC<Props> = ({ style, node }) => {
  const { props, gender } = node;
  const { firstName, lastName, birthYear, deathYear } = props;

  return (
    <div style={style} className={s.root}>
      <div className={classNames(s.inner, s[gender])}>
        <div className={s.fullName}>
          <span className={s.firstName}>{firstName}</span>
          <span className={s.lastName}>{lastName}</span>
        </div>
        <div className={s.years}>
          <span className={s.birthYear}>{birthYear}</span>
          <span className={s.yearsDelimiter}>&nbsp;–&nbsp;</span>
          <span className={s.deathYear}>{deathYear}</span>
        </div>
      </div>
    </div>
  );
};

export default FamilyNode;
