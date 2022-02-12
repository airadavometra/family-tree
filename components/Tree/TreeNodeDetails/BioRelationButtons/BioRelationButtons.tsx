import { RelationShortInfo } from "@/types/tree";
import { FC } from "react";
import s from "./BioRelationButtons.module.css";

type BioRelationButtonsProps = {
  items: RelationShortInfo[];
  onClick: (id: string) => void;
};

const BioRelationButtons: FC<BioRelationButtonsProps> = ({ items, onClick }) => {
  return (
    <>
      {items.map((item, index) => (
        <button className={s.button} key={index} onClick={() => onClick(item.id)}>
          {index === items.length - 1 ? item.fullName : `${item.fullName}, `}
        </button>
      ))}
    </>
  );
};

export default BioRelationButtons;
