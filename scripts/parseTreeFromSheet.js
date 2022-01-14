const fs = require("fs");
const path = require("path");
const csvToJson = require("csvtojson");

const writeToJson = (data, name) => {
  fs.writeFileSync(
    path.join(__dirname, `../data/${name}.json`),
    JSON.stringify(data, null, 2)
  );
};

const omitKeys = (inputObj, keys) =>
  Object.keys(inputObj)
    .filter((key) => !keys.includes(key))
    .reduce((obj, key) => {
      obj[key] = inputObj[key];
      return obj;
    }, {});

const pickKeys = (inputObj, keys) =>
  Object.keys(inputObj)
    .filter((key) => keys.includes(key))
    .reduce((obj, key) => {
      obj[key] = inputObj[key];
      return obj;
    }, {});

const filterValues = (inputObj, value) =>
  Object.keys(inputObj)
    .filter((key) => inputObj[key] !== value)
    .reduce((obj, key) => {
      obj[key] = inputObj[key];
      return obj;
    }, {});

const TransformKeyMap = {
  id: "id",
  фамилия: "lastName",
  имя: "firstName",
  отчество: "patronym",
  пол: "gender",
  мать: "motherId",
  отец: "fatherId",
  супруг: "spouseId",
  "Год рождения": "birthYear",
  "Месяц рождения": "birthMonth",
  "День рождения": "birthDay",
  "Город рождения": "birthPlace",
  "Год смерти": "deathYear",
  "Месяц смерти": "deathMonth",
  "День смерти": "deathDay",
  "Город смерти": "deathPlace",
  Национальность: "nationality",
  Образование: "education",
  Профессия: "occupation",
  Награды: "rewards",
  Биография: "bio",
};

const getOutKey = (key) => {
  for (const [inKey, outKey] of Object.entries(TransformKeyMap)) {
    if (new RegExp(inKey, "i").test(key)) return outKey;
  }
};

const getGender = (str) => (str === "м" ? "male" : "female");

const getTransformedNodesFromInputCsv = async () => {
  const inputTreeNodes = await csvToJson().fromFile(
    path.join(__dirname, "./input/Узлы фамильного дерева - Люди.csv")
  );

  const inputTreeNodesWithDefinedValues = inputTreeNodes.map((node) =>
    filterValues(node, "")
  );

  return inputTreeNodesWithDefinedValues
    .map((node) => {
      return Object.fromEntries(
        Object.entries(node).map(([key, value]) => {
          const outKey = getOutKey(key);
          if (outKey === "gender") {
            value = getGender(value);
          } else if (
            [
              "birthYear",
              "birthMonth",
              "birthDay",
              "deathYear",
              "deathMonth",
              "deathDay",
            ].includes(outKey)
          ) {
            value = Number(value);
          }

          return [outKey, value];
        })
      );
    })
    .filter(({ firstName }) => firstName !== undefined);
};

const getNodesData = (transformedNodes) => {
  return transformedNodes.map((node) =>
    omitKeys(node, ["motherId", "fatherId", "spouseId"])
  );
};

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

const parseTree = async () => {
  const inputTreeNodes = await getTransformedNodesFromInputCsv();
  const nodesData = getNodesData(inputTreeNodes);
  const relations = getRelations(inputTreeNodes);
  writeToJson(nodesData, "nodes");
  writeToJson(relations, "relations");
};

parseTree();
