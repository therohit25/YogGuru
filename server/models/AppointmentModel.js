const { mongoose } = require('../data/dbconfig');
const { ObjectId } = mongoose.Schema.Types
const AppointmentSchema = mongoose.Schema({
    "Trainee": {
        type: ObjectId,
        ref: "users",
        required: true,
    },
    "Trainer": {
        type: ObjectId,
        ref: "users",
        required: true,
    },
    "AppointmentTime": {
        type: String,
        required: true,


    },
    "Attendance": {
        type: String,
        default: "Due",
        enum: ["Present", "Absent", "Due"]
    }
    ,
    Today: {
        type: Date,

        default: Date.now()
    }
});
const AppointmentModel = mongoose.model('Appointments', AppointmentSchema);


module.exports = AppointmentModel;