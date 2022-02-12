const getParents = (rel, relationsMap) => {
  return relationsMap.get(rel.id)?.parents ?? [];
};

const getLastName = (rel, relationsMap) => {
  const node = relationsMap.get(rel.id);
  const lastName = node?.lastName ?? "";

  let name = lastName;

  if (!lastName) {
    const firstName = node?.firstName ?? "";
    const patronym = node?.patronym ?? "";
    name = `от (${[firstName, patronym].join(" ").trim()})`;
  }

  return name;
};

const getFamilies = (node, relationsMap) => {
  const families = [];

  const parents = getParents(node, relationsMap);

  // Корень, выходим сразу
  if (parents.length === 0) {
    return families;
  }

  const queue = [...parents];

  while (queue.length > 0) {
    const parent = queue.shift();
    const parentParents = getParents(parent, relationsMap);

    if (parentParents.length === 0) {
      families.push({
        id: parent.id,
        lastName: getLastName(parent, relationsMap),
      });
    } else {
      queue.push(...parentParents);
    }
  }

  return families;
};

const getNodesWithFamilies = (nodes, relationsMap) => {
  return nodes.map((node) => {
    const families = getFamilies(node, relationsMap);

    return {
      ...node,
      families,
      isFamilyRoot: families.length === 0,
    };
  });
};

module.exports = {
  getNodesWithFamilies,
};
