const {houseService} = require('../../service');
const {userValidators} = require('../../validators');

module.exports = async (req, res) => {
    try {
        const {houseID} = req.params;
        const {id} = req.user;
        const {user_id} = req.house;

        userValidators.userAccessValidator(user_id, id);

        await houseService.deleteHouse(houseID);

        res.json(`House id:${houseID} has been deleted`)
    } catch (e) {
        res.status(403).json(e.message);
    }
};