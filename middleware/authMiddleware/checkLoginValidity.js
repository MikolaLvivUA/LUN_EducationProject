const {authService} = require('../../service');
const {tokenCreator} = require('../../helper');

module.exports = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const findingUser = await authService.userAuthService(email, password);

        if (!findingUser) {
            throw new Error('Incorrect password or email')
        }

        const tokens = tokenCreator(findingUser);

        req.tokens = tokens;
        next()

    } catch (e) {
        res.status(403).json(e.message);
    }
};