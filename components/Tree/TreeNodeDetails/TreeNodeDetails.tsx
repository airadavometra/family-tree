import { FC } from "react";
import { useTree } from "../../../context/tree";
import { getTreeNodesMap } from "../../../data";
import { CloseIcon } from "../../../icons/CloseIcon";
import s from "./TreeNodeDetails.module.css";

const nodesMap = getTreeNodesMap();

const TreeNodeDetails: FC = () => {
  const { nodeDetailsId, closeNodeDetails } = useTree();

  if (!nodeDetailsId) return null;

  const {
    props: { fullName },
  } = nodesMap[nodeDetailsId];

  return (
    <div className={s.root}>
      <button className={s.closeButton} onClick={closeNodeDetails}>
        <CloseIcon className={s.closeIcon} />
      </button>
      <h2 className={s.name}>{fullName}</h2>
    </div>
  );
};

export default TreeNodeDetails;
