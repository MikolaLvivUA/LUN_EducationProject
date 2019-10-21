const CustomError = require('../../error/CustomError');

module.exports = (req, res, next) => {
    const photos = req.photos;

    if(photos.length > 1) {
        return (new CustomError(`You can't upload more than one userPhotos`, 400, 'checkNumberOfUserPhoto'))
    }

    next()
};