const dataBase = require('../../dataBase').getInstance();
const getById = require('./getById');

module.exports = async user_id => {
    const HouseModel = dataBase.getModel('House');
    const UserModel = dataBase.getModel('User');

    const houses = await HouseModel.findAll({
        where: {
            user_id
        }
    });

    const user = await UserModel.findByPk(user_id);

    user.dataValues.houses = houses;

    return user && user.dataValues;
};