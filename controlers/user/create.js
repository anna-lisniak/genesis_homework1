const savePersonToPublicFolder = require('../../services/user/save');
const jwt = require('jsonwebtoken');
const getUserPassword = require('../../services/user/getPassword');
const GLOBAL_CONSTANTS = require('../../constants');

const createUser = (req, res, next) => {
    const { body: { email, password } } = req;

    if (!email || !password) {
        res.status(404).send("You should provide email and password");
        return;
    }

    if (getUserPassword(email)) {
        res.status(404).send('User with this email already exist');
        return;
    }

    savePersonToPublicFolder({ email, password }, (err) => {
        if (err) {
            res.status(500).send('Internal server error');
            return;
        }

        const token = jwt.sign(
            { email, password },
            process.env.SECRET,
            { expiresIn: GLOBAL_CONSTANTS.TOKEN_EXPIRE_TIME }
        );

        res.cookie("btcToken", token, { httpOnly: true });
        res.status(200).json({ token });
    });
}

module.exports = createUser;