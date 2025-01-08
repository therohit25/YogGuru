const yogaassistant = require('../controllers/Assistant_Controller/yogaassistant');
const bookappointment = require('../controllers/YogaClass/bookappointment');
const getTrainers = require('../controllers/YogaClass/getTrainers');
const getappointments = require('../controllers/YogaClass/getappointments');
const getappointmentsTrainer = require('../controllers/YogaClass/getappointmentsTrainer');
const getbookings = require('../controllers/YogaClass/getbookings');
const updateattendance = require('../controllers/YogaClass/updateattendance');
const updateattendanceWithQR = require('../controllers/YogaClass/updateattendanceWithQR');
const authentication = require('../middlewares/authenticate');

const yogaroute = require('express').Router();

//Yoga Routes
yogaroute.get("/getTrainers", getTrainers)
yogaroute.post("/bookappointment", bookappointment)
yogaroute.get("/getappointments", getappointments)
yogaroute.get("/getappointmentsTrainer", getappointmentsTrainer)
yogaroute.get("/getbookings", getbookings)
yogaroute.put("/updateattendance", updateattendance)
yogaroute.get("/updateattendanceWithQR/:Trainee", authentication, updateattendanceWithQR)
yogaroute.post("/yogaassistant", yogaassistant)


module.exports = yogaroute