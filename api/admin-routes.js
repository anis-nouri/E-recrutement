const express = require("express");
const pool = require ('./dbService');
var md5 = require('md5');
var jwt = require('jsonwebtoken');
const  { requireAuth }= require('./AdminAuthMideleware')

const router = express.Router();


const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "da429355",
  apiSecret: "n2Qk8KPFilNjGjYn"
})



//Login

router.post('/admin', (req , res , next) => {
    try{
        const hashed_password = md5(req.body.admin_pwd.toString());
        pool.query('SELECT * FROM admin WHERE admin_name = ? AND admin_pwd = ? ', [req.body.admin_name,hashed_password ], (err, result, fields)=>{
            if (result.length === 0 ){
                res.status(200).json({status: "password or email incorrect"});
            }else {  
            if(err){
                res.send({ status: 0, data: err });
            }else{
                let token = jwt.sign({ data: result }, 'cronus secret')
                res.send({ status: 1, data: result, token: token });
                }
            }
        }
        );

    }catch(error){
        res.send({status: 0, error: error });
    }
})

//Get all offers 
router.post('/offers', (req,res)=>{
    pool.query('select * from offer', (err, result, fields) => {
        if (err){
            return console.log(err);
        }
    res.send(result);
    })
})

// Get Requirements
router.post('/editoffer/:id',requireAuth,(req,res)=>{
    pool.query('select * from requirements where offer_id =  ' + req.params.id , (err, result, fields) => {
        if (err){
            return console.log(err);
        }
    res.send(result);
    })
})

// Update offer
router.post('/editoffer',(req , res, next) => {
    try {
    pool.query("select  * from offer where offer_id= '"+ req.body.offer_id + "'" , (request, result, fields) => {
            pool.query('UPDATE offer SET offer_title = ?, offer_details = ?, `salary` = ? WHERE offer.offer_id = ?',[req.body.offer_title, req.body.offer_details, req.body.salary, req.body.offer_id],
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
    })
    }catch(error){
        res.send({ status: 0, error: error });
    }
    
})
// Update requirement
router.post('/editreq',(req , res, next) => {
    try {
            pool.query('UPDATE requirements SET req_title = ?, requirement = ? WHERE requirements.req_id = ?',[req.body.req_title, req.body.requirement, req.body.req_id],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({status: 'error'});
                } else {
                    
                    res.send({ status: 1});
                }
            }
            );
            console.log(req.body);
    }catch(error){
        res.send({ status: 0, error: error });
    }
})

//Add Requirement
router.post('/addreq', (req,res,next)=>{
    try{
        pool.query('insert into requirements (req_title, requirement,offer_id) values (?,?,?)',[req.body.req_title,req.body.requirement,req.body.offer_id],(error) => {
            if (error) {
                console.error(error);
                res.status(500).json({status: 'error'});
            } else {
                
                res.send({ status: 1});
            }
        })

    }catch(error){
        res.send({status: 0, error: error});
    }
})

//Delete requirement
router.post('/deletereq',(req,res,next)=>{
    try{
        pool.query('DELETE FROM `requirements` WHERE `requirements`.`req_id` = ? ',[req.body.req_id], (error)=>{
            if (error) {
                console.error(error);
                res.status(500).json({status: 'error'});
            } else {
                
                res.send({ status: 1});
            }

        });

    }catch(error){
        res.send({status: 0 , error: error});
    }
})
//Delete offer
router.delete('/deleteoffer/:id',(req,res,next)=>{
    try{
        pool.query('DELETE FROM `offer` WHERE `offer`.`offer_id` = ? ',[req.params.id], (error)=>{
            if (error) {
                console.error(error);
                res.status(500).json({status: 'error'});
            } else {
                
                res.send({ status: 1});
            }

        });

    }catch(error){
        res.send({status: 0 , error: error});
    }
})
// Add offer
router.post('/addoffer',(req,res)=>{
    pool.query("insert into offer  (offer_title, offer_details,salary) values (?,?,?)",[req.body.offer_title ,req.body.offer_details,req.body.salary], (error)=>{
        if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
        } else {
            
            res.send({ status: 1});
        }
    })
})
/*
router.post('/edittest/:id',(req,res)=>{
    pool.query("select test.* ,questions.* ,choices.* from test inner join questions on test.test_id = questions.test_id inner join choices on questions.q_id = choices.q_id group by choices.c_content;",(error,result)=>{
        if (error){
            return console.log(error);
        }
    res.send(result);
    })
}) 
*/
//Get test
var c =[];
router.post('/edittest/:id',requireAuth,(req,res)=>{
        pool.query('select * from test where test_id =' + req.params.id , (err , test) => {
            if(err){
                return console.log(err);
            }
            pool.query('select * from questions where test_id =' + req.params.id , (err , ques) => {
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

//Edit Test title
router.post('/edittitle/:id',(req,res)=>{
    pool.query("UPDATE test SET test_title = ? where test_id = ?",[req.body.test_title, req.params.id], (error)=>{
        if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
        } else {
            
            res.send({ status: 1});
        }
    })
})

// Edit test question
router.post('/editquestion/:id',(req,res)=>{
    pool.query("UPDATE questions SET q_content = ? where q_id = ?",[req.body.q_content, req.params.id], (error)=>{
        if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
        } else {
            
            res.send({ status: 1});
        }
    })
})
// Edit test choice
router.post('/editchoice/:id',(req,res)=>{
    pool.query("UPDATE choices SET c_content = ?, c_correct = ? where c_id = ?",[req.body.c_content, req.body.c_correct,req.params.id], (error)=>{
        if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
        } else {
            
            res.send({ status: 1});
        }
    })
})

//Add question 
router.post('/addquestion/:id',(req,res)=>{
    pool.query("insert into questions  (q_content, test_id) values (?,?)",[req.body.q_content,req.params.id ], (error)=>{
        if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
        } else {
            
            res.send({ status: 1});
        }
    })
})

//Add Choice 
router.post('/addchoice/',(req,res)=>{
    pool.query("insert into choices  (c_content, q_id, c_correct) values (?,?,?)",[req.body.c_content,req.body.q_id,req.body.c_correct], (error)=>{
        if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
        } else {
            
            res.send({ status: 1});
        }
    })
})
//Delete Test
router.delete('/deletetest/:id',(req,res,next)=>{
    try{
        pool.query('DELETE FROM `test` WHERE `test`.`test_id` = ? ',[req.params.id], (error)=>{
            if (error) {
                console.error(error);
                res.status(500).json({status: 'error'});
            } else {
                
                res.send({ status: 1});
            }

        });

    }catch(error){
        res.send({status: 0 , error: error});
    }
})
// Add test title
router.post('/addtest/:id',(req,res)=>{
    pool.query("insert into test  (test_title) values (?)",[req.body.test_title], (error,result)=>{
        if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
        } else {
            pool.query("update offer set test_id = ? where offer_id = ?",[result.insertId,req.params.id],(err)=>{
                if(err){
                    console.error(error);
                    res.status(500).json({status: 'error'});

                }else{
                    res.send({ status: 1});
                }
            })
           
        }
    })
})

//Get all tests
router.post('/gettest',(req,res)=>{
    pool.query("select * from test", (error, result)=>{
        if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
        } else {
            res.send(result);
        }
    })
})


// Get candidates
router.post('/candidates',requireAuth,(request,result)=>{
    pool.query("select application.offer_id, application.user_id,application.score, offer.offer_title, user.user_name FROM application INNER JOIN offer ON offer.offer_id= application.offer_id  INNER JOIN user ON user.user_id = application.user_id;", (error,res)=>{
        if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
        } else {
            result.send(res)
        }
    })
})
//get application
router.post('/appdetails/:offerid/:userid', (req,res)=>{
    pool.query('select application.* , user.* from application INNER JOIN user ON application.user_id = user.user_id  where application.offer_id = ? and application.user_id = ?', [req.params.offerid,req.params.userid],(err, result, fields) => {
        if (err){
            return console.log(err);
        }
    res.send(result);
    })
})

//Answer Application
router.post('/respond/:offerid/:userid',(req,res)=>{
    pool.query("UPDATE application SET accepted = ? where offer_id = ? and user_id = ? ",[req.body.accepted,req.params.offerid,req.params.userid], (error)=>{
        if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
        } else {
            const from = "E-recrutement"
            const to = "216"+req.body.phone
            const text = 'E-recrutement inform you that we answered your application, please check the results on our platform'

            vonage.message.sendSms(from, to, text, (err, responseData) => {
                if (err) {
                    console.log(err);
                } else {
                    if(responseData.messages[0]['status'] === "0") {
                        console.log("Message sent successfully.");
                    } else {
                        console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    }
                }
            })


            res.send({ status: 1});
        }
    })
})

//interview details
router.post('/interview/:offerid/:userid',(req,res)=>{
    pool.query("insert into interview  (interv_date,interv_location) values (?,?)",[req.body.interv_date,req.body.interv_location], (error,result)=>{
        if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
        } else {
            pool.query("update application set interv_id = ? where offer_id = ? and user_id= ?",[result.insertId,req.params.offerid,req.params.userid],(err)=>{
                if (err) {
                    console.error(err);
                    res.status(500).json({status: 'error'});
                }else{
                        res.send({ status: 1});

                    }
               
            })
            
        }
    })
})




//****************************************************** */

module.exports = router