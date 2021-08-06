const readUsers = require('./read');

const getUserPassword = (email) => {
    const users = readUsers();
    return users[email];
}

module.exports = getUserPassword;