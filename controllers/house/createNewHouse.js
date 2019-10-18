const {houseService} = require('../../service');

module.exports = async (req, res) => {
    try {
        const {id} = req.user;
        const creatingData = req.body;

        const newHouse = await houseService.createHouse(id, creatingData);

        res.json(`house id:${newHouse.id} has been created`);
    }catch (e) {
        res.status(403).json(e.message);
    }
};