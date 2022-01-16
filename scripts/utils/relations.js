const { pickKeys } = require("./common.js");

const getBloodRel = (id) => ({ type: "blood", id });
const getSpouseRel = (id) => ({ type: "married", id });

const addSpouse = (spouses = [], id) => {
  if (!spouses.find((rel) => rel.id === id)) {
    spouses.push(getSpouseRel(id));
  }

  return spouses;
};

const getRelations = (transformedNodes) => {
  const relNodes = transformedNodes.map((node) =>
    pickKeys(node, ["id", "motherId", "fatherId", "spouseId"])
  );
  const nodesMap = new Map(relNodes.map((node) => [node.id, { ...node }]));

  [...nodesMap.values()].forEach((node) => {
    const mother = nodesMap.get(node.motherId);
    const father = nodesMap.get(node.fatherId);
    const motherChildren = mother?.children ?? [];
    const motherSpouses = mother?.spouses ?? [];
    const fatherChildren = father?.children ?? [];
    const fatherSpouses = father?.spouses ?? [];

    // Parent Spouses
    if (father && mother) {
      if (!motherSpouses.find((rel) => rel.id === father.id)) {
        motherSpouses.push(getSpouseRel(father.id));
      }
      if (!fatherSpouses.find((rel) => rel.id === mother.id)) {
        fatherSpouses.push(getSpouseRel(mother.id));
      }
    }

    // Parents
    const parents = [];
    if (mother) parents.push(getBloodRel(mother.id));
    if (father) parents.push(getBloodRel(father.id));

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
    const newChild = getBloodRel(node.id);
    if (mother) {
      mother.children = [...motherChildren, newChild];
      mother.spouses = motherSpouses;
      nodesMap.set(mother.id, mother);
    }
    if (father) {
      father.children = [...fatherChildren, newChild];
      father.spouses = fatherSpouses;
      nodesMap.set(father.id, father);
    }
  });

  return [...nodesMap.values()].map((node) => {
    return {
      id: node.id,
      parents: node.parents ?? [],
      siblings: node.siblings ?? [],
      spouses: node.spouses ?? [],
      children: node.children ?? [],
    };
  });
};

module.exports = {
  getRelations,
};
