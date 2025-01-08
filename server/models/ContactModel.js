const { mongoose } = require("../data/dbconfig");

const ContactSchema = mongoose.Schema({
    "Name": {
        type: String,
        required: true,
    },
    "Email": {
        type: String,
        required: true,
    },
    "Subject": {
        type: String,
        required: true,

    },

    "Comment": {
        type: String,
        required: true,
    },

    "Time": {
        type: Date,
        default: Date.now()

    }
})

const ContactModel = mongoose.model('contact', ContactSchema);

module.exports = ContactModel;
