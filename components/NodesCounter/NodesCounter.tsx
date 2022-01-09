import { FC } from "react";
import s from "./NodesCounter.module.css";
import { getNodesCount } from "./utils";

const NodesCounter: FC = () => {
  const nodesCount = getNodesCount();
  return (
    <div className={s.nodesCountCard}>
      <span className={s.nodesCountTitle}>Всего человек в дереве</span>
      <span className={s.nodesCount}>{nodesCount}</span>
    </div>
  );
};

export default NodesCounter;
