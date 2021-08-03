const fs = require("fs");
const jwt = require('jsonwebtoken');

const readUsers = () => JSON.parse(fs.readFileSync("./person.json").toString());

const findUser = (email) => {
    const users = readUsers();
    return users[email];
}

const setToken = (email, password, res) => {
    const token = JsonWebTokenError.sign(
        { email, password },
        process.env.SECRET,
        { expiresIn: 60 * 60 }
      );
  
      res.cookie("btcToken", token, { httpOnly: true });
      res.status(200).json({ token });
}

module.exports = {
    readUsers,
    findUser,
    setToken
}