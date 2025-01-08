const checkadminlogin = require('../controllers/Auth_Controllers/checkadminlogin');
const checklogin = require('../controllers/Auth_Controllers/checklogin');

const loginroute = require('express').Router();


//Login Check Route
loginroute.get("/checklogin", checklogin);
loginroute.get("/checkadminlogin", checkadminlogin);


module.exports = loginroute;