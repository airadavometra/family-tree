const getBloodRel = (id, type = "blood") => ({ type, id });
const getSpouseRel = (id) => ({ type: "married", id });

const addSpouse = (spouses = [], id = "") => {
  if (!spouses.find((rel) => rel.id === id)) {
    spouses.push(getSpouseRel(id));
  }

  return spouses;
};

const updateChildren = ({ nodesMap, node, parent, isStepParent = false }) => {
  if (parent) {
    const relType = isStepParent ? "adopted" : "blood";
    const newChild = getBloodRel(node.id, relType);
    const parentChildren = parent.children ?? [];
    parent.children = [...parentChildren, newChild];
    nodesMap.set(parent.id, parent);
  }
};

const getRelations = (transformedNodes) => {
  const nodesMap = new Map(transformedNodes.map((node) => [node.id, { ...node }]));

  [...nodesMap.values()].forEach((node) => {
    const mother = nodesMap.get(node.motherId);
    const father = nodesMap.get(node.fatherId);
    const stepMother = nodesMap.get(node.stepMotherId);
    const stepFather = nodesMap.get(node.stepFatherId);
    const motherChildren = mother?.children ?? [];

    // Parents
    const parents = [];
    if (mother) parents.push(getBloodRel(mother.id));
    if (father) parents.push(getBloodRel(father.id));
    if (stepMother) parents.push(getBloodRel(stepMother.id, "adopted"));
    if (stepFather) parents.push(getBloodRel(stepFather.id, "adopted"));

    // Siblings
    const siblings = [...motherChildren];
    if (mother) {
      for (const { id } of siblings) {
        const sibling = nodesMap.get(id);
        sibling.siblings = sibling.siblings.concat(getBloodRel(node.id));
      }
    }

    // Update current node
    const currentNode = nodesMap.get(node.id);
    currentNode.parents = parents;
    currentNode.siblings = siblings;
    // Own spouses
    if (node.spouseId) {
      currentNode.spouses = addSpouse(currentNode.spouses, node.spouseId);

      const spouseNode = nodesMap.get(node.spouseId);
      spouseNode.spouses = addSpouse(spouseNode.spouses, node.id);
      nodesMap.set(spouseNode.id, spouseNode);
    }

    nodesMap.set(node.id, currentNode);

    // Update parents
    updateChildren({ nodesMap, node, parent: mother });
    updateChildren({ nodesMap, node, parent: father });
    updateChildren({ nodesMap, node, parent: stepMother, isStepParent: true });
    updateChildren({ nodesMap, node, parent: stepFather, isStepParent: true });
  });

  const relations = [...nodesMap.values()].map((node) => {
    return {
      id: node.id,
      parents: node.parents ?? [],
      siblings: node.siblings ?? [],
      spouses: node.spouses ?? [],
      children: node.children ?? [],
    };
  });

  return {
    relations,
    relationsMap: nodesMap,
  };
};

module.exports = {
  getRelations,
};
