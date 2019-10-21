const router = require('express').Router();

const {houseMiddleware, tokenMiddleware, filesMiddleware} = require('../../middleware');
const {house} = require('../../controllers');

router.post('/',
    tokenMiddleware.checkAccessTokenMiddleware,
    filesMiddleware.checkFileMiddleware,
    house.createNewHouse
);

router.get(`/:houseID`,
    houseMiddleware.presentHouseCheck,
    house.getHouseById
);

router.put('/:houseID',
    tokenMiddleware.checkAccessTokenMiddleware,
    houseMiddleware.presentHouseCheck,
    house.updateHouse
);

router.delete('/:houseID',
    tokenMiddleware.checkAccessTokenMiddleware,
    houseMiddleware.presentHouseCheck,
    house.houseDelete
);

module.exports = router;