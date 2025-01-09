const express = require("express");
const app = new express();
const session = require("express-session");
const { config } = require("dotenv");
const cors = require("cors");
const guestroute = require("./routes/guest.route.js");
const userroute = require("./routes/user.route.js");
const adminroute = require("./routes/admin.route.js");
const yogaroute = require("./routes/yoga.route.js");
const loginroute = require("./routes/login.route.js");

config({
  path: "./data/config.env",
});

// Port

const port = process.env.PORT || 3004;

// setting up cors

app.use(
  cors({
    origin: [process.env.FRONTEND_URI, "http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Setting up session

app.use(
  session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60000 * 60 * 72,
    },
  })
);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

// Using Routes as a Middleware

app.use("/", guestroute);
app.use("/user", userroute);
app.use("/admin", adminroute);
app.use("/yoga", yogaroute);
app.use("/auth", loginroute);
app.use(express.static("public"));

// Listening on Port 3001
app.listen(port, (err, _) => {
  if (!err) console.error("Server Started on port " + port);
});
