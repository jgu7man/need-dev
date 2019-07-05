const defaultAdmin = require('../firebase').auth();

const authCheck = async (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token);
    defaultAdmin.verifyIdToken(token)
    .then(decodedToken => {
        if(decodedToken){
            console.log('token Valido \n Info:\n', decodedToken);
            next();
        }
    })
    .catch(error => {
        res.status(403).json({
            error: "Not Valid Token",
            message:"Not a valid UserToken provided by the userClient",
            errorMessage: error.message
        })
    })
}

module.exports = authCheck;