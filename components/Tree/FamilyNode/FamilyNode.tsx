import classNames from "classnames";
import { FC } from "react";
import { TreeExtNode, TreeNodeDate } from "../types";
import s from "./FamilyNode.module.css";

interface FamilyNodeProps {
  node: TreeExtNode;
  style?: React.CSSProperties;
}

const FamilyNode: FC<FamilyNodeProps> = ({ style, node }) => {
  const { props, gender } = node;
  const { firstName, lastName, birthDate, deathDate } = props;

  return (
    <div style={style} className={s.root}>
      <div className={classNames(s.inner, s[gender])}>
        <div className={s.fullName}>
          <span className={s.firstName}>{firstName}</span>
          <span className={s.lastName}>{lastName}</span>
        </div>
        <FamilyNodeYears birthDate={birthDate} deathDate={deathDate} />
      </div>
    </div>
  );
};

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

export default FamilyNode;
