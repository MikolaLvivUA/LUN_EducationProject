const dataBase = require('../../dataBase').getInstance();

module.exports = async registerData => {
    const UserModel = dataBase.getModel('User');
    const createdUser = await UserModel.create(registerData);

    return createdUser && createdUser.dataValues;
};