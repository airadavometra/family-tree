import { FC } from "react";
import { TreeNodeDate } from "../../../types/tree";
import s from "./FamilyNode.module.css";

type FamilyNodeYearsProps = {
  birthDate?: TreeNodeDate;
  deathDate?: TreeNodeDate;
};

export const FamilyNodeYears: FC<FamilyNodeYearsProps> = ({
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
