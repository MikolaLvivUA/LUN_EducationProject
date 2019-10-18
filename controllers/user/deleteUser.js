const {userService} = require('../../service');
const {userValidators} = require('../../validators');

module.exports = async (req, res) => {
    try {
        const {userID} = req.params;
        const {id} = req.user;

        userValidators.userAccessValidator(userID, id);

        await userService.deleteUser(userID);

        res.json(`User id:${userID} has been deleted`)

    }catch (e) {
        res.status(403).json(e.message)
    }
};