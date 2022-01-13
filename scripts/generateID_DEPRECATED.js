const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/nodes.json"), "utf-8")
);

for (const node of data) {
  if (!node.id) {
    const uuid = v4().split("-")[0];
    const { birthDate, firstName, lastName, maidenName, patronym, deathDate } =
      node;
    const birthYear = (birthDate && birthDate[0]) ?? "";
    const deathYear = (deathDate && deathDate[0]) ?? "";

    const parts = [];
    if (firstName) parts.push(firstName);
    if (lastName) parts.push(lastName);
    if (maidenName) parts.push(`(${maidenName})`);
    if (patronym) parts.push(patronym);
    if (birthYear) parts.push(`b:${birthYear}`);
    if (deathYear) parts.push(`d:${deathYear}`);
    parts.push(uuid);

    node.id = parts.join("_");
  }
}

fs.writeFileSync(
  path.join(__dirname, "./output/dataWithId.json"),
  JSON.stringify(data, null, 2)
);
