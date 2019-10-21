const dataBase = require('../../dataBase').getInstance();

module.exports = async (path) => {
    const HousePhotoModel = dataBase.getModel('HousePhoto');

    await HousePhotoModel.create(path);
};