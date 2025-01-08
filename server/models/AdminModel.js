const { mongoose } = require('../data/dbconfig');

const AdminSchema = mongoose.Schema({
    "Username": {
        type: String,
        required: true,
    },
    "Password": {
        type: String,
        required: true,
    },
    "RegTime": {
        type: Date,
        default: Date.now()

    }
});
const AdminModel = mongoose.model('admins', AdminSchema);


module.exports = AdminModel;