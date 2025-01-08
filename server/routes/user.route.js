const userroute = require('express').Router();

const authentication = require("../middlewares/authenticate");
const Fetchcarts = require('../controllers/Cart_Controllers/carts.js');
const Insertcart = require('../controllers/Cart_Controllers/insertcart.js');
const Updatecart = require('../controllers/Cart_Controllers/updatecart.js');
const Removeproduct = require('../controllers/Cart_Controllers/removeproduct.js');
const Emptycart = require('../controllers/Cart_Controllers/emptycart.js');
const order = require('../controllers/Order_Controllers/order');
const myorders = require('../controllers/Order_Controllers/myorders');
const OnlineOrder = require('../controllers/Order_Controllers/OnlineOrder');
const updateProfile = require('../controllers/Profile_Controllers/updateProfile');


//User Routes
userroute.get("/carts", authentication, Fetchcarts);
userroute.post("/insertcart", authentication, Insertcart);
userroute.put("/updatecart", authentication, Updatecart)
userroute.delete("/removeproduct", authentication, Removeproduct)
userroute.post("/order", authentication, order)
userroute.delete("/emptycart", authentication, Emptycart)
userroute.get("/myorders", authentication, myorders)
userroute.post("/OnlineOrder", authentication, OnlineOrder)
userroute.put("/updateProfile", authentication, updateProfile)


module.exports = userroute