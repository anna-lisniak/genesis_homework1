const readUsers = require("./read");
const fs = require("fs");

const savePersonToPublicFolder = ({ email, password }, callback) => {
    const users = readUsers();
    console.log("readUsers");

    fs.writeFile('./person.json', JSON.stringify({
        ...users,
        [email]: password
    }), callback);
}

module.exports = savePersonToPublicFolder;