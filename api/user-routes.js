const express = require("express");
const { requireAuth } = require ('./authMiddleware');
const pool = require ('./dbService');
var md5 = require('md5');
var jwt = require('jsonwebtoken');


// GET OFFERS
const router = express.Router();

router.post('/', (req,res)=>{
    pool.query('select * from offer', (err, result, fields) => {
        if (err){
            return console.log(err);
        }
    res.send(result);
    })
})


// Get Requirements
router.post('/offerdetail/:id',requireAuth,(req,res)=>{
    pool.query('select * from requirements where offer_id =  ' + req.params.id , (err, result, fields) => {
        if (err){
            return console.log(err);
        }
    res.send(result);
    })
})

//signup
router.post('/signup', (req , res, next) => {
    try {
    pool.query("select  * from user where user_email = '"+ req.body.user_email + "'" , (request, result, fields) => {
        if (result.length === 0 ){
            const hashed_password = md5(req.body.user_pwd.toString());
            pool.query('INSERT INTO user (user_name, user_email, user_pwd, user_phone) VALUES (?,?,?,?)',[req.body.user_name, req.body.user_email, hashed_password, req.body.user_phone],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({status: 'error'});
                } else {
                    let token = jwt.sign({ data: result }, 'zeus secret')
                    res.send({ status: 1, data: result, token : token });
                }
            }
            );
            console.log(req.body);
    
        }else{
            
            res.status(200).json({status: "email exist"});
        }
        

    })
    }catch(error){
        res.send({ status: 0, error: error });
    }
    
})


//login 
router.post('/login', (req , res , next) => {
    try{
        const hashed_password = md5(req.body.user_pwd.toString());
        pool.query('SELECT * FROM user WHERE user_email = ? AND user_pwd = ? ', [req.body.user_email,hashed_password ], (err, result, fields)=>{
            if (result.length === 0 ){
                res.status(200).json({status: "password or email incorrect"});
            }else {  
            if(err){
                res.send({ status: 0, data: err });
            }else{
                let token = jwt.sign({ data: result }, 'zeus secret')
                res.send({ status: 1, data: result, token: token });
                }
            }
        }
        );

    }catch(error){
        res.send({status: 0, error: error });
    }
})

//Get test
var c =[];
router.post('/application/:id',requireAuth,(req,res)=>{
    pool.query('select test_id from offer where offer_id =  ' + req.params.id , (error, result, fields) => {
        if (error){
            return console.log(error);
        }
        pool.query('select * from test where test_id =' + result[0].test_id, (err , test) => {
            if(err){
                return console.log(err);
            }
            pool.query('select * from questions where test_id =' + result[0].test_id, (err , ques) => {
                if(err){
                    return console.log(err);
                }
                for (let i = 0; i < ques.length; i++){
                    console.log(i)
                    pool.query('select * from choices where q_id =' + ques[i].q_id, (err , choice) => {
                        if(err){
                            return console.log(err);
                        }
                        c = c.concat(choice);
                        
                        if (i==ques.length - 1){
                            res.send ({"test": test, "questions": ques, "choices": c});
                            c= [];
                        }
                        
                    })
                   
                }
            })
           
        })
        
    })  
    
})
// save application 
router.post('/application/:id/apply', requireAuth,(request,result) => {
    try{
        pool.query('select * from application where user_id = ? and offer_id = ? ', [request.body.app.user_id, request.body.app.offer_id], (err,res) =>{
            if (res.length != 0){
                result.status(200).json({status: "application exist"});
            }else{
                pool.query('INSERT INTO application (cv, score, user_id, offer_id) VALUES (?,?,?,?)', [request.body.app.cv,request.body.app.score,request.body.app.user_id,request.body.app.offer_id],
                (error) =>{
                    if (error) {
                        console.error(error);
                        result.status(500).json({status: 'error'});
                    } else {
                        result.status(200).json({status: "application saved"});
                    }

                });
            }
        })

    }catch(error){
        result.send({status: 0, error: error });

    } 
});

//Verify the application exist

router.post('/verify', (request, result) => {
    pool.query('select * from application where user_id = ? and offer_id = ? ', [request.body.user_id, request.body.offer_id], (err,res) => {
        if (res.length != 0){
            result.status(200).json({status: "application exist"});
        }
    })
})

// modify profile
router.post('/editprofile',(req , res, next) => {
    try {
    pool.query("select  * from user where user_email = '"+ req.body.user_email + "'" , (request, result, fields) => {
        if (result.length === 0 ||  result[0].user_email === req.body.user_email) { 
            const hashed_password = md5(req.body.user_pwd.toString());
            pool.query('UPDATE user SET user_name = ?, user_email = ?, `user_pwd` = ?, user_phone = ?, user_photo= ? WHERE user.user_id = ?',[req.body.user_name, req.body.user_email, hashed_password, req.body.user_phone,req.body.user_photo,req.body.user_id],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({status: 'error'});
                } else {
                    
                    res.send({ status: 1, data: result});
                }
            }
            );
            console.log(req.body);
    
        }else{
            res.status(200).json({status: "email exist"});
        }
        

    })
    }catch(error){
        res.send({ status: 0, error: error });
    }
    
})
// get results
router.post('/results',requireAuth,(request,result,next) => {
    try {
        pool.query ("select accepted, interv_id,score,user_id,offer_id from application where user_id = ? ", [request.body.user_id], (err,res,fields)=>{
            if (err){
                return console.log(err);
            }
        result.send(res);
        });

    }catch(error){
        result.send({ status: 0, error: error });
        
    }
});
// get interview details
router.post('/results/:id',(request,result,next)=>{
    try{
        pool.query('select * from interview where interv_id =  ' + request.params.id , (err, res, fields) => {
            if (err){
                return console.log(err);
            }
        result.send(res);
        })

    }catch(error){
        result.send({ status: 0, error: error });

    }

});


/********************************************* */
module.exports = router