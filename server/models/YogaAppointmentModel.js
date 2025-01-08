const { mongoose } = require('../data/dbconfig');
const { ObjectId } = mongoose.Schema.Types
const YogaAppointmentSchema = mongoose.Schema({
    "Trainee":
        [
            {
                "TraineeInfo": {
                    type: ObjectId,
                    ref: "users",
                    required: true,
                },
                "Attendance": {
                    type: String,
                    default: "Due",
                    enum: ["Present", "Absent", "Due"]
                }
            },
        ]
    ,
    "Trainer": {
        type: ObjectId,
        ref: "users",
        required: true,
    },
    "AppointmentTime": {
        type: String,
        required: true,


    },


    Today: {
        type: String,

        default: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`
    }
});
const YogaAppointmentModel = mongoose.model('YogaAppointments', YogaAppointmentSchema);


module.exports = YogaAppointmentModel;