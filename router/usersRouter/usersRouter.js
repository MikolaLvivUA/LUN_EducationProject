const router = require('express').Router();

const {userMiddleware, tokenMiddleware} = require('../../middleware');
const {user} = require('../../controllers');

router.post('/', user.registerNewUser);
router.get(`/:userID`,
    userMiddleware.presentUserCheck,
    user.getUserById
);

router.get(`/:userID/houses`,
    user.getUserWithHouses
);

router.put('/:userID',
    tokenMiddleware.checkAccessTokenMiddleware,
    userMiddleware.presentUserCheck,
    user.updateUser
);

router.delete('/:userID',
    tokenMiddleware.checkAccessTokenMiddleware,
    userMiddleware.presentUserCheck,
    user.deleteUser
);

module.exports = router;