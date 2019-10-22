const fs = require('fs-extra');
const {resolve} = require('path');
const uuid = require('uuid').v1();

const {userService, emailService} = require('../../service');
const {passwordHasher} = require('../../helper');

module.exports = async (req, res) => {
    try {
        const creatingData = req.body;
        const [photo] = req.photos; //Our uploading photo
        const appRoot = global.appRoot; // our mainProject directory
        creatingData.password = await passwordHasher(creatingData.password);

        const registeredUser = await userService.registerUser(creatingData);

        const {id, email} = registeredUser;
        const photoDir = `user/${id}/photo`;//Path to our userPhoto Directory
        const photoExtension = photo.name.split('.').pop();
        const photoName = `${uuid}.${photoExtension}`;


        await fs.mkdirSync(resolve(appRoot, 'static', photoDir), {recursive: true});//create folders for user photo
        await photo.mv(resolve(appRoot, 'static', photoDir, photoName));//upload our photo to our userPhoto directory

        await userService.updateUser(id, {photo_path: `${photoDir}/${photoName}`});

        await emailService.sendEmail(email, 'Hello! Thanks for registering on our mega resource', 'HELLO FRIEND!');

        res.status(201).json(`Your user with id:${id} has been registered please login in`);

    }catch (e) {
        res.json(e.message).status(400);
    }
};