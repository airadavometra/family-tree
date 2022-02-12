const _ = require("lodash");

const getParents = (rel, relationsMap) => {
  return relationsMap.get(rel.id)?.parents ?? [];
};

// 1. -ь, -т, -ан , -о, -ц— не менять
// 2. -ий, -ая — заменять на -ие
// 3. У остальных обрезать с конца -а и добавлять -ы
const endsWith = (endings, word) => endings.some((ending) => word.endsWith(ending));
const getDeclinedLastName = (lastName) => {
  if (endsWith(["ая", "ий"], lastName)) {
    return `${lastName.slice(0, lastName.length - 2)}ие`;
  }
  if (endsWith(["в", "ва", "ин", "ина"], lastName)) {
    if (lastName.endsWith("а")) {
      return `${lastName.slice(0, lastName.length - 1)}ы`;
    }

    return `${lastName}ы`;
  }

  return lastName;
};

const getFamilyLastName = (rel, relationsMap) => {
  const node = relationsMap.get(rel.id);
  const lastName = node?.lastName ?? "";

  let name = "";

  if (!lastName) {
    const firstName = node?.firstName ?? "";
    const patronym = node?.patronym ?? "";
    name = `от (${[firstName, patronym].join(" ").trim()})`;
  } else {
    name = getDeclinedLastName(lastName);
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
        lastName: getFamilyLastName(parent, relationsMap),
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

const getAllFamilies = (nodesData) => {
  return _.uniqBy(
    nodesData.flatMap((n) => n.families),
    (f) => f.id
  ).sort((a, b) => a.lastName.localeCompare(b.lastName));
};

module.exports = {
  getNodesWithFamilies,
  getAllFamilies,
};
