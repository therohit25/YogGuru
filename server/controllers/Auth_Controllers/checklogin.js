module.exports = (req, res) => {
    if (req.session.user) {

        res.json({ "user": req.session.user }).status(200)
    }
    else {
        res.status(401)
    }
}