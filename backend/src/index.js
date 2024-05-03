const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const multer = require("multer");
const upload = multer();
require("./configs/passport");
const { corsOptions } = require("./configs/cross");
const {
  errorHandlingMiddleware,
} = require("./app/middlewares/errorHandlingMiddlware");
const { APIs_VI } = require("./routes/v1");
const db = require("./configs/db");
const { ADMIN_API } = require("./routes/admin");

const app = express();
const port = 3000;

//connect db
db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(express.static(path.join(__dirname, "./uploads/images")));

// Middleware để xử lý method spoofing
app.use((req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method.toUpperCase();
    delete req.body._method;
  }
  next();
});

//HTTP logger
app.use(morgan("combined"));

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Router
app.use("/v1", APIs_VI);
app.use("/admin", ADMIN_API);

//Middleware xử lý lỗi tập trung
app.use(errorHandlingMiddleware);

if (env.BUILD_MODE === "production") {
  app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
  });
} else {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
