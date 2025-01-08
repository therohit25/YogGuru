module.exports = (req, res) => {
    if (req.session.admin) {

        res.json({ "admin": req.session.admin }).status(200)
    }
    else {
        res.status(401)
    }
}