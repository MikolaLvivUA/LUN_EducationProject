const dataBase = require('../../dataBase').getInstance();

module.exports = async (email) => {
    const UserModel = dataBase.getModel('User');

    const findingUser = await UserModel.findOne({
        where: {
            email
        },
        attributes: ['id', 'password']
    });

    return findingUser && findingUser.dataValues;
};