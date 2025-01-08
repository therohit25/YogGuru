const guestroute = require('express').Router();
const logIn = require('../controllers/Auth_Controllers/logIn');
const logout = require('../controllers/Auth_Controllers/logout');
const register = require('../controllers/Auth_Controllers/register');
const registerTrainer = require('../controllers/Auth_Controllers/registerTrainer');
const contact = require('../controllers/Contact_Controllers/contact');
const otherproduct = require('../controllers/Product_Controllers/otherproduct');
const Fetchproducts = require('../controllers/Product_Controllers/products.js');
const Fetchproduct = require('../controllers/Product_Controllers/product.js');



guestroute.post("/register", register);
guestroute.put("/register", registerTrainer);
guestroute.post("/login", logIn);
guestroute.get("/logout", logout);
guestroute.get("/products", Fetchproducts);
guestroute.get("/products/:ProductId", Fetchproduct);
guestroute.get("/otherprod/:ProductId", otherproduct)
guestroute.post("/contact", contact);


module.exports = guestroute