import { createContext, FC, useCallback, useContext, useState } from "react";

type NodeDetailsId = string | undefined;

type TreeContextValue = {
  nodeDetailsId: NodeDetailsId;
  openNodeDetails: (id: string) => void;
  closeNodeDetails: () => void;
};

const TreeContext = createContext<TreeContextValue | undefined>(undefined);

export const TreeContextWrapper: FC = ({ children }) => {
  const { nodeDetailsId, openNodeDetails, closeNodeDetails } = useNodeDetails();

  return (
    <TreeContext.Provider
      value={{
        nodeDetailsId,
        openNodeDetails,
        closeNodeDetails,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

const useNodeDetails = () => {
  const [nodeDetailsId, setNodeDetailsId] = useState<NodeDetailsId>();

  const openNodeDetails = useCallback(
    (id: NodeDetailsId) => setNodeDetailsId(id),
    []
  );

  const closeNodeDetails = useCallback(() => setNodeDetailsId(undefined), []);

  return {
    nodeDetailsId,
    openNodeDetails,
    closeNodeDetails,
  };
};

export const useTree = (): TreeContextValue => {
  const treeContextValue = useContext(TreeContext);

  if (!treeContextValue) {
    throw Error("useTree hook must be used inside TreeContext provider");
  }

  return treeContextValue;
};
