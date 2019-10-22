const dataBase = require('../../dataBase').getInstance();

module.exports = (searchObject) => {
    const UserModel = dataBase.getModel('User');

    const user = UserModel.findOne({
        where: searchObject
    });

    return user && user.dataValues;
};