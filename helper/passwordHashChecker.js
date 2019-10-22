const bcrypt = require('bcrypt');

const CustomError = require('../error/CustomError');

module.exports = async (hashedPassword, password) => {

    let isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordCorrect) {
        throw new CustomError('User is not present', 404, 'authUser')
    }
};