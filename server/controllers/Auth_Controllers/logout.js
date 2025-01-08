module.exports = (req, res) => {
    req.session.user = null;
    req.session.destroy((err) => {


        res.json({ "msg": "logout failed" }).status(401)
    }
    );

}