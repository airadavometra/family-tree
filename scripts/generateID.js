const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

const props = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/props.json"), "utf-8")
);

for (const person of props) {
  if (!person.id) {
    const id = v4().split("-")[0];
    const { birthDate } = person;
    const birthYear = (birthDate && birthDate[0]) ?? "";
    person.id = `${person.firstName}-${birthYear}-${id}`;
  }
}

fs.writeFileSync(
  path.join(__dirname, "./output/propsWithId.json"),
  JSON.stringify(props, null, 2)
);
