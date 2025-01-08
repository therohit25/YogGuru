const { mongoose } = require('../data/dbconfig');

const UserSchema = mongoose.Schema({
    "Name": {
        type: String,
        required: true,
    },
    "Email": {
        type: String,
        required: true,
    },
    "Password": {
        type: String,
        required: true,

    },
    "ContactNo": {
        type: Number,
        required: true,
    },
    "Address": {
        type: String,
        required: true,
    },

    "Role": {
        type: String,
        enum: ['Trainer', 'Trainee'],
        required: true
    },
    "YogaTime": {
        type: String,
    },
    "Specialization": {
        type: String,

    },
    "Mode": {
        type: String,
        enum: ['Online', 'Offline'],
    },
    "Certificate": {
        type: String,
    },

    "RegTime": {
        type: Date,
        default: Date.now()

    }
});
const UserModel = mongoose.model('users', UserSchema);


module.exports = UserModel;