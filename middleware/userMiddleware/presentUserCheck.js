const {userService} = require('../../service');

module.exports = async (req, res, next) => {
    try {
        const {userID} = req.params;

        const foundUser = await userService.getById(userID);

        if (!foundUser) {
            throw new Error(`User id:${userID} is not present`)
        }

        req.user = foundUser;
        next();

    } catch (e) {
        res.status(400).json(e.message);
    }
};