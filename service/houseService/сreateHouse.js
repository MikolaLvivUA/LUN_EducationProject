const dataBase = require('../../dataBase').getInstance();

module.exports = async (userID, creatingData) => {
    const HouseModel = dataBase.getModel('House');

    const {square, city, price} = creatingData;

    const newHouse = await HouseModel.create({
        user_id: userID,
        square,
        city,
        price
    });

    return newHouse && newHouse.dataValues;
};