import { useUrlTreeRootId } from "@/context/tree";
import { TreeNodeDataWithRelations } from "@/types/tree";
import classNames from "classnames";
import { FC } from "react";
import s from "./TreeNodeFamilies.module.css";

type TreeNodeFamiliesProps = TreeNodeDataWithRelations;

export const TreeNodeFamilies: FC<TreeNodeFamiliesProps> = ({ families, fullName }) => {
  const { rootId } = useUrlTreeRootId();

  return families.length ? (
    <div className={s.familyLinksContainer}>
      <span className={s.familyLinksTitle}>{`${fullName} является потомком семей:`}</span>
      {families.map((family) => {
        if (rootId === family.id) {
          return (
            <span className={classNames(s.selectedFamily, s.familyItem)}>{`${family.lastName} – открыта сейчас`}</span>
          );
        } else {
          return (
            <a href={`/tree?root=${family.id}`} className={classNames(s.familyLink, s.familyItem)}>
              {family.lastName}
            </a>
          );
        }
      })}
    </div>
  ) : (
    <span className={s.familyLinksTitle}>{`${fullName} является корнем и не имеет других веток.`}</span>
  );
};
