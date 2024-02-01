const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/DatabaseConfig.js')
const app = express();
const session = require('express-session');
const path = require('path');
const http = require('http');
var https = require('https');

var cors = require('cors');
app.use(cors());


var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



  

  
const port = 8000;
app.listen(8000 || process.env.PORT, () => {
  console.log(`Server is listening on port ${port}`);
});

startRoutes();

function startRoutes(){
  app.use('/user',require('./Routers/userRouter.js'));
}