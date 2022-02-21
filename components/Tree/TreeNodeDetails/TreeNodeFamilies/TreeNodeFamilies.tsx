import { useUrlTreeRootId } from "@/context/tree";
import { TreeNodeDataWithRelations } from "@/types/tree";
import classNames from "classnames";
import { FC } from "react";
import s from "./TreeNodeFamilies.module.css";

type TreeNodeFamiliesProps = TreeNodeDataWithRelations;

export const TreeNodeFamilies: FC<TreeNodeFamiliesProps> = ({ families, fullName }) => {
  const { rootId } = useUrlTreeRootId();

  return families.length > 0 ? (
    <>
      <span className={s.familyLinksTitle}>{`${fullName} является потомком семей:`}</span>
      <div className={s.familyLinksContainer}>
        {families.map((family) => {
          if (rootId === family.id) {
            return (
              <span
                key={family.id}
                className={classNames(s.selectedFamily, s.familyItem)}
              >{`${family.lastName} – открыта сейчас`}</span>
            );
          } else {
            return (
              <a key={family.id} href={`/tree?root=${family.id}`} className={classNames(s.familyLink, s.familyItem)}>
                {family.lastName}
              </a>
            );
          }
        })}
      </div>
    </>
  ) : (
    <span className={s.familyLinksTitle}>{`${fullName} является корнем и не имеет других веток.`}</span>
  );
};
