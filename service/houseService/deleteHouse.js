const dataBase = require('../../dataBase').getInstance();

module.exports = async id => {
    const HouseModel = dataBase.getModel('House');

    await HouseModel.destroy({
        where: {
            id
        }
    });
};