const { ProductModel } = require("../../models/ProductModel");
const multer = require("multer");
const path = require("path");
let savefilename = "";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    savefilename =
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const maxSize = 20 * 1000 * 1000;

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG and PNG images are allowed."));
    }
  },
}).single("image"); // Use 'image' as the fieldname to match your form input field name.

module.exports = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      ProductModel.create({
        ProductName: req.body.name,
        ProductImg: savefilename,
        ProductDes: req.body.description,
        ProductPrice: req.body.price,
        Quantity: req.body.quantity,
      })
        .then((result) => {
          res.json({ message: "Success" + result }).status(200);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });
};
