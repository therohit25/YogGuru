const UserModel = require("../../models/UserModel")
const multer = require('multer');
const path = require('path');
let savefilename = ""
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/certificates");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        savefilename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const maxSize = 20 * 1000 * 1000;

const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only JPEG and PNG images are allowed."));
        }
    }
}).single('certificate'); //
module.exports = async (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {

            UserModel.updateOne({ "_id": req.body.uid }, { $set: { "Certificate": savefilename, "YogaTime": req.body.datetime, "Specialization": req.body.specialization } })
                .then((result) => {
                    res.json({ message: "Success" + result }).status(200);
                }).catch(err => {
                    res.status(500).json({ Error: `Error while Registering Trainer : ${err.message}` });
                });
        }
    });
}