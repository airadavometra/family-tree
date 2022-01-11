import { createContext, FC, useCallback, useContext, useState } from "react";

type NodeId = string;

type TreeContextValue = {
  selectedNodeId?: NodeId;
  selectNode: (id: NodeId) => void;
  unselectNode: () => void;
};

const TreeContext = createContext<TreeContextValue | undefined>(undefined);

export const TreeContextWrapper: FC = ({ children }) => {
  const { selectedNodeId, selectNode, unselectNode } = useNodeSelection();

  return (
    <TreeContext.Provider
      value={{
        selectedNodeId,
        selectNode,
        unselectNode,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

const useNodeSelection = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<NodeId>();

  const selectNode = useCallback((id: NodeId) => setSelectedNodeId(id), []);

  const unselectNode = useCallback(() => setSelectedNodeId(undefined), []);

  return {
    selectedNodeId,
    selectNode,
    unselectNode,
  };
};

export const useTree = (): TreeContextValue => {
  const treeContextValue = useContext(TreeContext);

  if (!treeContextValue) {
    throw Error("useTree hook must be used inside TreeContext provider");
  }

  return treeContextValue;
};
