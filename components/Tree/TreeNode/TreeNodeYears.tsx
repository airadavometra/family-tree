import { FC } from "react";
import s from "./TreeNode.module.css";

type TreeNodeYearsProps = {
  birthYear?: number;
  deathYear?: number;
};

export const TreeNodeYears: FC<TreeNodeYearsProps> = ({
  birthYear,
  deathYear,
}) => {
  if (!birthYear && !deathYear) {
    return null;
  }

  return (
    <div className={s.years}>
      {birthYear && <span className={s.birthYear}>{birthYear}</span>}
      {deathYear && (
        <>
          <span className={s.yearsDelimiter}>&nbsp;–&nbsp;</span>
          <span className={s.deathYear}>{deathYear}</span>
        </>
      )}
    </div>
  );
};
