var jwt = require('jsonwebtoken');

const requireAuth = (req, res, next ) => {

    const token = req.body.token;


    if (token) {
        jwt.verify(token, 'zeus secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message); 
                res.status(200).json({status: "Unauthorized"});
            }else {
                console.log(decodedToken);
                next();
            }
            
        })

    }else {
       res.status(200).json({status: "Unauthorized"}); 
    }

}
module.exports = {requireAuth};