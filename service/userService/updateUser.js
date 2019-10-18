const dataBase = require('../../dataBase').getInstance();

module.exports = async (userID, updateData) => {
    const UserModel = dataBase.getModel('User');

    await UserModel.update(updateData, {
        where: {
            id: userID
        }
    });
};