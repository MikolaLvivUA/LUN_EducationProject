const dataBase = require('../../dataBase').getInstance();

module.exports = async id => {
    const HouseModel = dataBase.getModel('House');
    const house = await HouseModel.findByPk(id);

    return house && house.dataValues;

};