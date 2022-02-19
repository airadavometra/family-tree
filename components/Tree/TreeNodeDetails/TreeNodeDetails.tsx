import { useNodeSelectionContext } from "@/context/tree";
import { CloseIcon } from "@/icons/CloseIcon";
import { FC, useState } from "react";
import BioLink from "./BioLink/BioLink";
import BioNavItem from "./BioNavItem/BioNavItem";
import s from "./TreeNodeDetails.module.css";
import { TreeNodeDetailsBio } from "./TreeNodeDetailsBio/TreeNodeDetailsBio";
import { TreeNodeFamilies } from "./TreeNodeFamilies/TreeNodeFamilies";
import { getTreeNodeDetails } from "./utils";

const navigation = [
  { id: 1, title: "Биография" },
  { id: 2, title: "Галерея" },
  { id: 3, title: "Семьи" },
];

const TreeNodeDetails: FC = () => {
  const { hasSubTree, selectedNodeId, unselectNode, selectNode } = useNodeSelectionContext();
  const [selectedNavId, setSelectedNavId] = useState<number>(1);
  const nodeDetails = getTreeNodeDetails(selectedNodeId);

  if (!nodeDetails) return null;

  const tabContent =
    selectedNavId === 1 ? (
      <TreeNodeDetailsBio {...nodeDetails} onRelationNodeClick={(id) => selectNode(id)} />
    ) : selectedNavId === 2 ? (
      <>
        <span className={s.rootItem}>К сожалению, у нас пока нет фотографий этого человека.</span>
        <span className={s.rootItem}>
          Если вы хотите помочь и у вас есть фото, которые вы хотите добавить в галерею, пожалуйста,{" "}
          <BioLink
            href="https://wa.me/+79853522893?text=Здравствуйте!%20 Пишу%20насчет%20проекта%20ДРЕВО"
            text="напишите нам"
            newTab={true}
          />
          .
        </span>
      </>
    ) : (
      <TreeNodeFamilies {...nodeDetails} />
    );

  return (
    <div className={s.root}>
      <button className={s.closeButton} onClick={unselectNode}>
        <CloseIcon className={s.closeIcon} />
      </button>
      <div className={s.rootItem}>
        <h2 className={s.name}>{nodeDetails.fullName}</h2>
        {hasSubTree && (
          <span className={s.hasSubTreeNote}>
            В дереве видны не все предки. <br /> На вкладке Семьи можно посмотреть,
            <wbr /> от кого происходит {nodeDetails.firstName}.
          </span>
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
      {tabContent}
    </div>
  );
};

export default TreeNodeDetails;
