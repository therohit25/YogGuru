const adminauthentication = (req, res, next) => {

    if (req.session.admin) {

        next()
    }

}
module.exports = adminauthentication