const {userService} = require('../../service');

module.exports = async (req, res) => {
    try {
        const {userID} = req.params;
        const foundUser = await userService.getUserWithHouses(userID);

        if (!foundUser) {
            throw new Error(`User id:${userID} is not present`)
        }

        res.json(foundUser);
    } catch (e) {
        res.status(400).json(e.message);
    }
};