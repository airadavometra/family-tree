const csvToJson = require("csvtojson");
const { filterValues } = require("./common.js");
const path = require("path");

const TransformKeyMap = {
  id: "id",
  фамилия: "lastName",
  имя: "firstName",
  отчество: "patronym",
  пол: "gender",
  мать: "motherId",
  отец: "fatherId",
  мачеха: "stepMotherId",
  отчим: "stepFatherId",
  супруг: "spouseId",
  "Год свадьбы": "weddingYear",
  "Месяц свадьбы": "weddingMonth",
  "День свадьбы": "weddingDay",
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

const getTransformedNodesFromInputCsv = async (pathToInputCsv) => {
  const inputTreeNodes = await csvToJson().fromFile(
    path.join(__dirname, "../input", pathToInputCsv)
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
    .filter(({ firstName }) => firstName !== undefined)
    .sort((a, b) => a.birthYear - b.birthYear);
};

module.exports = {
  getTransformedNodesFromInputCsv,
};
