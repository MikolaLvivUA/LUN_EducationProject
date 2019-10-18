const dataBase = require('../../dataBase').getInstance();

module.exports = async (houseID, updateData) => {
    const HouseModel = dataBase.getModel('House');

    await HouseModel.update(updateData, {
        where: {
            id: houseID
        }
    })
};