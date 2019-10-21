const {FILES_PARAMS_CHECK} = require('../../constant');
const CustomError = require('../../error/CustomError');
module.exports = (req, res, next) => {

    req.photos = [];

    if (!req.files) { //if we dont't have photo we go next!
        next()
    }

    const files = Object.values(req.files);//return array with our files

    for (let i = 0; i < files.length; i++) {
        const {mimetype, size, name} = files[i];

        if (FILES_PARAMS_CHECK.PHOTO_MIMETYPES.includes(mimetype)) {

            if (FILES_PARAMS_CHECK.MAX_PHOTO_SIZE < size) { //check does our upload photo has correct correct size
                return next(new CustomError(`Max photo size is ${FILES_PARAMS_CHECK.MAX_PHOTO_SIZE / (1024 * 1024)}mb`, 400,
                    'photoFileChecker'))
            }

            req.photos.push(files[i])

        } else {
             next(new CustomError(`File ${name} is not valid`, 400, 'photoFileChecker')); //if our mimetype is not valid
        }

    }
    next()
};



