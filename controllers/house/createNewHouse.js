const fs = require('fs-extra');
const {resolve} = require('path');
const uuid = require('uuid').v1();

const {houseService} = require('../../service');

module.exports = async (req, res) => {
    try {
        const {id} = req.user;
        const creatingData = req.body;
        const photos = req.photos;
        const appRoot = global.appRoot;

        const newHouse = await houseService.createHouse(id, creatingData);

        const photoDir = `user/${id}/house/${newHouse.id}/photo`;

        await fs.mkdirSync(resolve(appRoot,'static', photoDir), {recursive: true});

        for (let i = 0; i < photos.length; i++) {
            const photoExtension = photos[i].name.split('.').pop();
            const photoName = `${uuid}.${photoExtension}`;

            await photos[i].mv(resolve(appRoot, 'static',photoDir, photoName));
            await houseService.uploadPhoto({house_id: newHouse.id, path: `${photoDir}/${photoName}`})
        }
        res.json(`house id:${newHouse.id} has been created`);
    }catch (e) {
        res.status(403).json(e.message);
    }
};