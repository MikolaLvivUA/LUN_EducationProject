const {houseService} = require('../../service');

module.exports = async (req, res, next) => {
    try {
        const {houseID} = req.params;

        const findingHouse = await houseService.getById(houseID);

        if (!findingHouse) {
            throw new Error(`Bad request`)
        }

        req.house = findingHouse;
        next();

    } catch (e) {
        res.status(400).json(e.message);
    }
};