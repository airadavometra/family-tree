import { RelType } from "@/lib/relatives-tree/types";
import { RelationInfo } from "@/types/tree";
import { FC } from "react";
import s from "./BioRelationButtons.module.css";

export enum RelationType {
  Parents,
  Spouses,
  Children,
  Siblings,
}

type BioRelationButtonsProps = {
  relationType: RelationType;
  items: RelationInfo[];
  onClick: (id: string) => void;
};

const getName = (relationType: RelationType, relationInfo: RelationInfo, isLast: boolean) => {
  switch (relationType) {
    case RelationType.Parents: {
      if (relationInfo.type === RelType.adopted) {
        return isLast
          ? `${relationInfo.fullName} (приемный родитель)`
          : `${relationInfo.fullName} (приемный родитель), `;
      } else {
        return isLast ? relationInfo.fullName : `${relationInfo.fullName}, `;
      }
    }
    case RelationType.Children: {
      if (relationInfo.type === RelType.adopted) {
        return isLast
          ? `${relationInfo.firstName} (приемный ребенок)`
          : `${relationInfo.firstName} (приемный ребенок),`;
      } else {
        return isLast ? relationInfo.firstName : `${relationInfo.firstName},`;
      }
    }
    case RelationType.Siblings: {
      return isLast ? relationInfo.firstName : `${relationInfo.firstName},`;
    }
    case RelationType.Spouses: {
      if (relationInfo.type === RelType.divorced) {
        return isLast ? `${relationInfo.fullName} (разведены)` : `${relationInfo.fullName} (разведены),`;
      } else {
        return isLast ? relationInfo.fullName : `${relationInfo.fullName},`;
      }
    }
  }
};

const BioRelationButtons: FC<BioRelationButtonsProps> = ({ relationType, items, onClick }) => {
  return (
    <>
      {items.map((item, index) => (
        <button className={s.button} key={index} onClick={() => onClick(item.id)}>
          {getName(relationType, item, index === items.length - 1)}
        </button>
      ))}
    </>
  );
};

export default BioRelationButtons;
