import { DEFAULT_ROOT_ID } from "@/constants/tree";
import { useRouter } from "next/router";
import { createContext, FC, useCallback, useContext, useState } from "react";

type NodeSelectionContextValue = {
  hasSubTree?: boolean;
  selectedNodeId?: string;
  selectNode: (id: string, hasSubTree?: boolean) => void;
  unselectNode: () => void;
};

const NodeSelectionContext = createContext<NodeSelectionContextValue | undefined>(undefined);

export const NodeSelectionContextProvider: FC = ({ children }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>();
  const [hasSubTree, setHasSubTree] = useState<boolean>();
  const selectNode = useCallback((id: string, hasSubTree?: boolean) => {
    setHasSubTree(hasSubTree);
    setSelectedNodeId(id);
  }, []);
  const unselectNode = useCallback(() => {
    setHasSubTree(undefined);
    setSelectedNodeId(undefined);
  }, []);

  return (
    <NodeSelectionContext.Provider value={{ hasSubTree, selectedNodeId, selectNode, unselectNode }}>
      {children}
    </NodeSelectionContext.Provider>
  );
};

export const useUrlTreeRootId = () => {
  const router = useRouter();
  const { root } = router.query;
  const rootId = root ? (Array.isArray(root) ? root[0] : root) : DEFAULT_ROOT_ID;

  return {
    rootId,
  };
};

export const useNodeSelectionContext = (): NodeSelectionContextValue => {
  const nodeSelectionContextValue = useContext(NodeSelectionContext);

  if (!nodeSelectionContextValue) {
    throw Error("useNodeSelectionContext hook must be used inside NodeSelectionContext provider");
  }

  return nodeSelectionContextValue;
};
