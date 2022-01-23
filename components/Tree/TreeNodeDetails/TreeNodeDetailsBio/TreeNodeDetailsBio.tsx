import classNames from "classnames";
import { FC } from "react";
import { TreeNodeDetailsWithRelations } from "../../../../types/tree";
import BioRelationButtons from "../BioRelationButtons/BioRelationButtons";
import { getDate } from "../utils";
import s from "./TreeNodeDetailsBio.module.css";

type TreeNodeDetailsBioProps = TreeNodeDetailsWithRelations & {
  onRelationNodeClick: (id: string) => void;
};

export const TreeNodeDetailsBio: FC<TreeNodeDetailsBioProps> = ({
  id,
  birthYear,
  birthMonth,
  birthDay,
  deathYear,
  deathMonth,
  deathDay,
  birthPlace,
  deathPlace,
  parents,
  siblings,
  spouses,
  children,
  nationality,
  education,
  occupation,
  rewards,
  bio,
  onRelationNodeClick,
}) => {
  const birthDate = getDate(birthYear, birthMonth, birthDay);
  const deathDate = getDate(deathYear, deathMonth, deathDay);
  return (
    <div className={s.bioContainer}>
      <div className={classNames(s.bioGrid)}>
        {birthDate && (
          <>
            <span className={s.gridItemTitle}>Дата рождения</span>
            <span className={s.gridItemValue}>{birthDate}</span>
          </>
        )}
        {birthPlace && (
          <>
            <span className={s.gridItemTitle}>Место рождения</span>
            <span className={s.gridItemValue}>{birthPlace}</span>
          </>
        )}
        {deathDate && (
          <>
            <span className={s.gridItemTitle}>Дата смерти</span>
            <span className={s.gridItemValue}>{deathDate}</span>
          </>
        )}
        {deathPlace && (
          <>
            <span className={s.gridItemTitle}>Место смерти</span>
            <span className={s.gridItemValue}>{deathPlace}</span>
          </>
        )}
        {parents && parents.length > 0 && (
          <>
            <span className={s.gridItemTitle}>Родители</span>
            <div className={classNames(s.gridItemValue)}>
              <BioRelationButtons
                onClick={onRelationNodeClick}
                items={parents}
              />
            </div>
          </>
        )}
        {siblings && siblings.length > 0 && (
          <>
            <span className={s.gridItemTitle}>Братья и сестры</span>
            <div className={classNames(s.gridItemValue)}>
              <BioRelationButtons
                onClick={onRelationNodeClick}
                items={siblings}
              />
            </div>
          </>
        )}
        {spouses && spouses.length > 0 && (
          <>
            <span className={s.gridItemTitle}>
              {spouses.length > 1 ? "Супруги" : "Супруг(а)"}
            </span>
            <div className={classNames(s.gridItemValue)}>
              <BioRelationButtons
                onClick={onRelationNodeClick}
                items={spouses}
              />
            </div>
          </>
        )}
        {children && children.length > 0 && (
          <>
            <span className={s.gridItemTitle}>Дети</span>
            <div className={classNames(s.gridItemValue)}>
              <BioRelationButtons
                onClick={onRelationNodeClick}
                items={children}
              />
            </div>
          </>
        )}
        {nationality && (
          <>
            <span className={s.gridItemTitle}>Национальность</span>
            <span className={s.gridItemValue}>{nationality}</span>
          </>
        )}
        {education && (
          <>
            <span className={s.gridItemTitle}>Образование</span>
            <span className={s.gridItemValue}>{education}</span>
          </>
        )}
        {occupation && (
          <>
            <span className={s.gridItemTitle}>Профессия</span>
            <span className={s.gridItemValue}>{occupation}</span>
          </>
        )}
        {rewards && (
          <>
            <span className={s.gridItemTitle}>Награды</span>
            <span className={s.gridItemValue}>{rewards.join(", ")}</span>
          </>
        )}
      </div>
      {bio && <span className={classNames(s.rootItem)}>{bio}</span>}
    </div>
  );
};