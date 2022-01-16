import classNames from "classnames";
import Link from "next/link";
import { FC, useState } from "react";
import { useTree } from "../../../context/tree";
import { getTreeNodesMap } from "../../../data";
import { CloseIcon } from "../../../icons/CloseIcon";
import BioLink from "../../BioLink/BioLink";
import BioNavItem from "../../BioNavItem/BioNavItem";
import s from "./TreeNodeDetails.module.css";

const navigation = [
  { id: 1, title: "Биография" },
  { id: 2, title: "Галерея" },
];

const mapMonth = (month?: number, day?: number) => {
  switch (month) {
    case 1:
      return day === undefined ? "январь" : "января";
    case 2:
      return day === undefined ? "февраль" : "февраля";
    case 3:
      return day === undefined ? "март" : "марта";
    case 4:
      return day === undefined ? "апрель" : "апреля";
    case 5:
      return day === undefined ? "май" : "мая";
    case 6:
      return day === undefined ? "июнь" : "июня";
    case 7:
      return day === undefined ? "июль" : "июля";
    case 8:
      return day === undefined ? "август" : "августа";
    case 9:
      return day === undefined ? "сентябрь" : "сентября";
    case 10:
      return day === undefined ? "октябрь" : "октября";
    case 11:
      return day === undefined ? "ноябрь" : "ноября";
    case 12:
      return day === undefined ? "декабрь" : "декабря";
    default:
      return undefined;
  }
};

const getDate = (year?: number, month?: number, day?: number) => {
  const monthString = mapMonth(month, day);
  return year
    ? monthString
      ? day
        ? `${day} ${monthString} ${year}`
        : `${monthString} ${year}`
      : `${year}`
    : undefined;
};

const useTreeNodeDetails = (selectedNodeId?: string) => {
  if (selectedNodeId === undefined) {
    return;
  }
  const nodesMap = getTreeNodesMap();
  const selectedNode = nodesMap[selectedNodeId];
  const parents = selectedNode.parents.map((parent) => {
    return { id: parent.id, fullName: nodesMap[parent.id].data.fullName };
  });
  const children = selectedNode.children.map((child) => {
    return { id: child.id, fullName: nodesMap[child.id].data.fullName };
  });
  const spouses = selectedNode.spouses.map((spouse) => {
    return { id: spouse.id, fullName: nodesMap[spouse.id].data.fullName };
  });
  const siblings = selectedNode.siblings.map((sibling) => {
    return { id: sibling.id, fullName: nodesMap[sibling.id].data.fullName };
  });
  return {
    ...selectedNode.data,
    parents,
    children,
    spouses,
    siblings,
  };
};

const TreeNodeDetails: FC = () => {
  const { selectedNodeId, unselectNode } = useTree();
  const [selectedNavId, setSelectedNavId] = useState<number>(1);
  const nodeDetails = useTreeNodeDetails(selectedNodeId);
  const birthDate = getDate(
    nodeDetails?.birthYear,
    nodeDetails?.birthMonth,
    nodeDetails?.birthDay
  );
  const deathDate = getDate(
    nodeDetails?.deathYear,
    nodeDetails?.deathMonth,
    nodeDetails?.deathDay
  );

  if (!selectedNodeId) return null;

  return nodeDetails ? (
    <div className={s.root}>
      <button className={s.closeButton} onClick={unselectNode}>
        <CloseIcon className={s.closeIcon} />
      </button>
      <div className={s.rootItem}>
        <h2 className={s.name}>{nodeDetails.fullName}</h2>
        <BioLink
          href={`/tree?root=${selectedNodeId}`}
          text="Перейти к дереву"
        />
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
        <>
          <div className={classNames(s.bioGrid, s.rootItem)}>
            {birthDate && (
              <>
                <span className={s.gridItemTitle}>Дата рождения</span>
                <span className={s.gridItemValue}>{birthDate}</span>
              </>
            )}
            {nodeDetails.birthPlace && (
              <>
                <span className={s.gridItemTitle}>Место рождения</span>
                <span className={s.gridItemValue}>
                  {nodeDetails.birthPlace}
                </span>
              </>
            )}
            {deathDate && (
              <>
                <span className={s.gridItemTitle}>Дата смерти</span>
                <span className={s.gridItemValue}>{deathDate}</span>
              </>
            )}
            {nodeDetails.deathPlace && (
              <>
                <span className={s.gridItemTitle}>Место смерти</span>
                <span className={s.gridItemValue}>
                  {nodeDetails.deathPlace}
                </span>
              </>
            )}
            {nodeDetails.parents && nodeDetails.parents.length > 0 && (
              <>
                <span className={s.gridItemTitle}>Родители</span>
                <div className={classNames(s.gridItemValue)}>
                  {nodeDetails.parents.map((parent, index) => (
                    <BioLink
                      key={index}
                      href={`/tree?root=${parent.id}`}
                      text={
                        index === nodeDetails.parents.length - 1
                          ? parent.fullName
                          : `${parent.fullName}, `
                      }
                    />
                  ))}
                </div>
              </>
            )}
            {nodeDetails.siblings && nodeDetails.siblings.length > 0 && (
              <>
                <span className={s.gridItemTitle}>Братья и сестры</span>
                <div className={classNames(s.gridItemValue)}>
                  {nodeDetails.siblings.map((sibling, index) => (
                    <BioLink
                      key={index}
                      href={`/tree?root=${sibling.id}`}
                      text={
                        index === nodeDetails.siblings.length - 1
                          ? sibling.fullName
                          : `${sibling.fullName}, `
                      }
                    />
                  ))}
                </div>
              </>
            )}
            {nodeDetails.spouses && nodeDetails.spouses.length > 0 && (
              <>
                <span className={s.gridItemTitle}>
                  {nodeDetails.spouses.length > 1 ? "Супруги" : "Супруг(а)"}
                </span>
                <div className={classNames(s.gridItemValue)}>
                  {nodeDetails.spouses.map((spouse, index) => (
                    <BioLink
                      key={index}
                      href={`/tree?root=${spouse.id}`}
                      text={
                        index === nodeDetails.spouses.length - 1
                          ? spouse.fullName
                          : `${spouse.fullName}, `
                      }
                    />
                  ))}
                </div>
              </>
            )}
            {nodeDetails.children && nodeDetails.children.length > 0 && (
              <>
                <span className={s.gridItemTitle}>Дети</span>
                <div className={classNames(s.gridItemValue)}>
                  {nodeDetails.children.map((child, index) => (
                    <BioLink
                      key={index}
                      href={`/tree?root=${child.id}`}
                      text={
                        index === nodeDetails.children.length - 1
                          ? child.fullName
                          : `${child.fullName}, `
                      }
                    />
                  ))}
                </div>
              </>
            )}
            {nodeDetails.nationality && (
              <>
                <span className={s.gridItemTitle}>Национальность</span>
                <span className={s.gridItemValue}>
                  {nodeDetails.nationality}
                </span>
              </>
            )}
            {nodeDetails.education && (
              <>
                <span className={s.gridItemTitle}>Образование</span>
                <span className={s.gridItemValue}>{nodeDetails.education}</span>
              </>
            )}
            {nodeDetails.occupation && (
              <>
                <span className={s.gridItemTitle}>Профессия</span>
                <span className={s.gridItemValue}>
                  {nodeDetails.occupation}
                </span>
              </>
            )}
            {nodeDetails.rewards && (
              <>
                <span className={s.gridItemTitle}>Награды</span>
                <span className={s.gridItemValue}>
                  {nodeDetails.rewards.join(", ")}
                </span>
              </>
            )}
          </div>
          {nodeDetails.bio && (
            <span className={classNames(s.rootItem)}>{nodeDetails.bio}</span>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
};

export default TreeNodeDetails;
