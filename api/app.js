const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const userRouter = require('./user-routes.js');
const adminRouter = require('./admin-routes.js');


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.json()) ;



// Cors middleware 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    next();
  });
  

app.use(userRouter)
app.use(adminRouter)




/***************************************************/
app.listen(3000,()=>{
    console.log("Server is listning on port 3000");
    console.log(process.env.DB_database);

    const pool = require('./dbService'); // Adjust the path to your db service file

// Attempt to acquire a connection from the pool
pool.getConnection((error, connection) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }

  console.log('Connected to the database!');
  
  // Release the connection back to the pool
  connection.release();
});
});

