import { useNodeSelectionContext } from "@/context/tree";
import { CloseIcon } from "@/icons/CloseIcon";
import { FC, useState } from "react";
import BioLink from "./BioLink/BioLink";
import BioNavItem from "./BioNavItem/BioNavItem";
import s from "./TreeNodeDetails.module.css";
import { TreeNodeDetailsBio } from "./TreeNodeDetailsBio/TreeNodeDetailsBio";
import { getTreeNodeDetails } from "./utils";

const navigation = [
  { id: 1, title: "Биография" },
  { id: 2, title: "Галерея" },
];

const TreeNodeDetails: FC = () => {
  const { hasSubTree, selectedNodeId, unselectNode, selectNode } = useNodeSelectionContext();
  const [selectedNavId, setSelectedNavId] = useState<number>(1);
  const nodeDetails = getTreeNodeDetails(selectedNodeId);

  if (!nodeDetails) return null;

  return (
    <div className={s.root}>
      <button className={s.closeButton} onClick={unselectNode}>
        <CloseIcon className={s.closeIcon} />
      </button>
      <div className={s.rootItem}>
        <h2 className={s.name}>{nodeDetails.fullName}</h2>
        {hasSubTree ? (
          <BioLink
            className={s.hasSubTreeLink}
            href={`/tree?root=${nodeDetails.id}`}
            text="Есть скрытая ветка. Перейти к дереву"
          />
        ) : (
          <BioLink href={`/tree?root=${nodeDetails.id}`} text="Перейти к дереву" />
        )}
      </div>
      <nav className={s.rootItem}>
        {navigation.map((item, index) => (
          <BioNavItem
            key={index}
            id={item.id}
            text={item.title}
            isSelected={item.id === selectedNavId}
            onClick={setSelectedNavId}
          />
        ))}
      </nav>
      {selectedNavId === 1 ? (
        <TreeNodeDetailsBio {...nodeDetails} onRelationNodeClick={(id) => selectNode(id)} />
      ) : (
        <>
          <span className={s.rootItem}>К сожалению, у нас пока нет фотографий этого человека.</span>
          <span className={s.rootItem}>
            Если вы хотите помочь и у вас есть фото, которые вы хотите добавить в галерею, пожалуйста,{" "}
            <BioLink href="https://t.me/airadavometra" text="напишите нам" newTab={true} />.
          </span>
        </>
      )}
    </div>
  );
};

export default TreeNodeDetails;
