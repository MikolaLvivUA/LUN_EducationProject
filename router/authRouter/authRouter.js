const router = require('express').Router();

const {authMiddleware} = require('../../middleware');
const {auth} = require('../../controllers');

router.post('/',authMiddleware.checkLoginValidity , auth.userLogin);

module.exports = router;