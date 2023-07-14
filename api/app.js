const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const userRouter = require('./user-routes.js');
const adminRouter = require('./admin-routes.js');
const cognitoRouter= require('./cognito/cognito-routes.js')


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.json()) ;

// Configure Amplify
const { Amplify } = require('aws-amplify');

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_BrylzPIQn",
    userPoolWebClientId: "39rsuvtfgo83c32o8718iuqftg"
  }
})

// Configure Amplify
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAQZ3PILW22EEOVBCR',
  secretAccessKey: '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',
  region: "us-east-1",
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

