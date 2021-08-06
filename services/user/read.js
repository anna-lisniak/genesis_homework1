const fs = require("fs");
const readUsers = () => JSON.parse(fs.readFileSync("./person.json").toString());

module.exports = readUsers;