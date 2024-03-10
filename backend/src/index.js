const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const {corsOptions} = require('./configs/cross')
const {errorHandlingMiddleware} = require('./app/middlewares/errorHandlingMiddlware');
const route = require('./routes');
const db = require('./configs/db');

const app = express();
const port = 3000;


//connect db
db.connect();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

// Middleware để xử lý method spoofing
app.use((req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method.toUpperCase();
    delete req.body._method;
  }
  next();
});

// app.use(express.static(path.join(__dirname, 'public/images')));

// app.engine('.hbs', engine({
//     extname: '.hbs',
//     helpers: {
//         sum: (a, b) => {
//           return a + b;
//         }
//     }
// }));
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'resources', 'views'));
//HTTP logger
app.use(morgan('combined'));

app.use(cors(corsOptions));

  
app.use(cookieParser());
app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
    })
  );
app.use(passport.initialize());
app.use(passport.session());

//routes init
route(app);

//Middleware xử lý lỗi tập trung
app.use(errorHandlingMiddleware)





app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


