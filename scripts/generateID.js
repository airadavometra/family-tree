const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

const props = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/props.json"), "utf-8")
);

for (const person of props) {
  if (!person.id) {
    person.id = v4().split("-")[0];
  }
}

fs.writeFileSync(
  path.join(__dirname, "./output/propsWithId.json"),
  JSON.stringify(props, null, 2)
);
