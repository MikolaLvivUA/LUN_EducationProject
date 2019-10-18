const jwt = require('jsonwebtoken');
const {JWT_SECRET, JWT_REFRESH} = require('../config/keyWords');

module.exports = data => {
    const access_token = jwt.sign(data, JWT_SECRET, {expiresIn: '15m'});
    const refresh_token = jwt.sign({}, JWT_REFRESH, {expiresIn: '24h'});

    return {
        access_token,
        refresh_token
    }
};