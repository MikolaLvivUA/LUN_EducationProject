const {houseService} = require('../../service');
const {userValidators} = require('../../validators');

module.exports = async (req, res) => {
    try {
        const {houseID} = req.params;
        const updatingData = req.body;
        const {id} = req.user;
        const {user_id} = req.house;

        userValidators.userAccessValidator(user_id, id);

        await houseService.updateHouse(houseID, updatingData);

        res.redirect(`/houses/${houseID}`)
    } catch (e) {
        res.status(403).json(e.message);
    }
};