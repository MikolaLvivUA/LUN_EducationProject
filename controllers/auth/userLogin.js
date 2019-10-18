module.exports= (req, res) => {
    try {
        const token = req.tokens;
        res.json(token);

    }catch (e) {
        res.json(e.message)
    }
};