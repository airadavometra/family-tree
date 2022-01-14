import Link from "next/link";
import { FC } from "react";
import { useTree } from "../../../context/tree";
import { getTreeNodesMap } from "../../../data";
import { CloseIcon } from "../../../icons/CloseIcon";
import s from "./TreeNodeDetails.module.css";

const nodesMap = getTreeNodesMap();

const TreeNodeDetails: FC = () => {
  const { selectedNodeId, unselectNode } = useTree();

  if (!selectedNodeId) return null;

  const {
    data: { fullName },
  } = nodesMap[selectedNodeId];

  return (
    <div className={s.root}>
      <button className={s.closeButton} onClick={unselectNode}>
        <CloseIcon className={s.closeIcon} />
      </button>
      <h2 className={s.name}>{fullName}</h2>
      <Link href={`/tree?root=${selectedNodeId}`}>
        <a className={s.link}>Дерево этого человека</a>
      </Link>
    </div>
  );
};

export default TreeNodeDetails;
