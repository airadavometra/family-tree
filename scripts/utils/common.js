const fs = require("fs");
const path = require("path");

const writeToJson = (data, name) => {
  fs.writeFileSync(
    path.join(__dirname, `../../data/${name}.json`),
    JSON.stringify(data, null, 2)
  );
};

const filterObject = (inputObj, cb) =>
  Object.keys(inputObj)
    .filter(cb)
    .reduce((obj, key) => {
      obj[key] = inputObj[key];
      return obj;
    }, {});

const omitKeys = (inputObj, keys) =>
  filterObject(inputObj, (key) => !keys.includes(key));
const pickKeys = (inputObj, keys) =>
  filterObject(inputObj, (key) => keys.includes(key));
const filterValues = (inputObj, value) =>
  filterObject(inputObj, (key) => inputObj[key] !== value);

module.exports = {
  writeToJson,
  omitKeys,
  pickKeys,
  filterValues,
};
