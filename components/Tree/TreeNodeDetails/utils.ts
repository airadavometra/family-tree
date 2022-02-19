import { getTreeNodesMap } from "@/data";
import { RelationInfo, TreeNodeDataWithRelations, TreeNodeRelation } from "@/types/tree";

const nodesMap = getTreeNodesMap();

export const getMonthString = (month: number, day?: number) => {
  return day === undefined ? genitiveCaseMonths[month] : nominativeCaseMonths[month];
};
const nominativeCaseMonths: Record<number, string> = {
  1: "январь",
  2: "февраль",
  3: "март",
  4: "апрель",
  5: "май",
  6: "июнь",
  7: "июль",
  8: "август",
  9: "сентябрь",
  10: "октябрь",
  11: "ноябрь",
  12: "декабрь",
};
const genitiveCaseMonths: Record<number, string> = {
  1: "января",
  2: "февраля",
  3: "марта",
  4: "апреля",
  5: "мая",
  6: "июня",
  7: "июля",
  8: "августа",
  9: "сентября",
  10: "октября",
  11: "ноября",
  12: "декабря",
};

export const getDate = (year?: number, month?: number, day?: number) => {
  return year
    ? month
      ? day
        ? `${day} ${getMonthString(month)} ${year}`
        : `${getMonthString(month)} ${year}`
      : `${year}`
    : undefined;
};

const getTreeNodeRelationDetails = (relations: TreeNodeRelation[]): RelationInfo[] => {
  return relations.map((relation) => {
    return {
      id: relation.id,
      fullName: nodesMap[relation.id].data.fullName,
      type: relation.type,
      firstName: nodesMap[relation.id].data.firstName,
    };
  });
};
export const getTreeNodeDetails = (selectedNodeId?: string): TreeNodeDataWithRelations | undefined => {
  if (selectedNodeId === undefined) {
    return;
  }
  const selectedNode = nodesMap[selectedNodeId];
  const parents = getTreeNodeRelationDetails(selectedNode.parents as TreeNodeRelation[]);
  const children = getTreeNodeRelationDetails(selectedNode.children as TreeNodeRelation[]);
  const spouses = getTreeNodeRelationDetails(selectedNode.spouses as TreeNodeRelation[]);
  const siblings = getTreeNodeRelationDetails(selectedNode.siblings as TreeNodeRelation[]);
  return {
    ...selectedNode.data,
    parents,
    children,
    spouses,
    siblings,
  };
};
