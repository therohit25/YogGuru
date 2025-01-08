const adminroute = require('express').Router();
const adminlogin = require('../controllers/Auth_Controllers/adminlogin');
const getAllusers = require('../controllers/Auth_Controllers/getAllusers');
const removeUser = require('../controllers/Auth_Controllers/removeUser');
const AllOrders = require('../controllers/Order_Controllers/AllOrders');
const UpdateStatus = require('../controllers/Order_Controllers/UpdateStatus');
const removeOrder = require('../controllers/Order_Controllers/removeOrder');
const viewOrder = require('../controllers/Order_Controllers/viewOrder');
const addproduct = require('../controllers/Product_Controllers/addproduct');
const deleteProduct = require('../controllers/Product_Controllers/deleteProduct');
const updatequantity = require('../controllers/Product_Controllers/updatequantity');
const removeappointment = require('../controllers/YogaClass/removeappointment');
const adminauthentication = require('../middlewares/adminauthentication');


//Admin Routes
adminroute.post('/adminlogin', adminlogin)
adminroute.post('/addproducts', adminauthentication, addproduct)
adminroute.post('/updatequantity', adminauthentication, updatequantity)
adminroute.get('/getAllusers', adminauthentication, getAllusers)
adminroute.get('/AllOrders', adminauthentication, AllOrders)
adminroute.delete('/removeOrder', adminauthentication, removeOrder)
adminroute.post('/viewOrder', adminauthentication, viewOrder)
adminroute.delete('/removeUser', adminauthentication, removeUser)
adminroute.delete('/deleteProduct', adminauthentication, deleteProduct)
adminroute.delete('/removeappointment', adminauthentication, removeappointment)
adminroute.put('/updateStatus', adminauthentication, UpdateStatus)

module.exports = adminroute