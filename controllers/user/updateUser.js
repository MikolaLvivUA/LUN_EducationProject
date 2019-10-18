const {userService} = require('../../service');
const {userValidators} = require('../../validators');

module.exports = async (req, res) => {
    try {
        const {userID} = req.params;
        const updatingData = req.body;
        const {id} = req.user;

        userValidators.userAccessValidator(userID, id);

        await userService.updateUser(userID, updatingData);

        res.redirect(`/users/${userID}`)
    } catch (e) {
        res.status(403).json(e.message);
    }
};