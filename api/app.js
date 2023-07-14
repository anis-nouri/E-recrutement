const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const userRouter = require('./user-routes.js');
const adminRouter = require('./admin-routes.js');
const cognitoRouter= require('./cognito/cognito-routes.js')

const config = require('./config');



app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.json()) ;

// Configure Amplify
const { Amplify } = require('aws-amplify');

Amplify.configure({
  Auth: {
    region: config.AWS_REGION,
    userPoolId: config.USER_POOL_ID,
    userPoolWebClientId: config.USER_POOL_APP_CLIENT_ID
  }
})

// Configure Amplify
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_secret_ACCESS_KEY,
  region: config.REGION
});





// Cors middleware 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    next();
  });
  

app.use(userRouter)
app.use(adminRouter)
app.use(cognitoRouter);



/***************************************************/
app.listen(3000,()=>{
console.log("Server is listning on port 3000");

});

