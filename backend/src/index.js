const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const {engine} = require('express-handlebars');
const session = require('express-session');


const route = require('./routes');
const db = require('./config/db');

const app = express();
const port = 3000;


//connect db
db.connect();

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

// Middleware để xử lý method spoofing
app.use((req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method.toUpperCase();
    delete req.body._method;
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public/images')));

app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => {
          return a + b;
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
//HTTP logger
app.use(morgan('combined'));
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', // Cho phép tất cả các yêu cầu từ địa chỉ này
    credentials: true, // Cho phép chia sẻ cookie và dữ liệu xác thực qua các miền
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
  
  
app.use(cookieParser());
app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
    })
  );


//routes init
route(app);





app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


