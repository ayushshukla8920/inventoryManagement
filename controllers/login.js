const user = require('../models/user');
const bcrypt = require('bcryptjs');
const { genSessionId,storeSession } = require('../middlewares/cAuth');
async function handleLoginRender(req,res){
    const sessionCookie = req.cookies.sessionId;
    if(sessionCookie){
        return res.status(200).redirect('/');
    }
    else{
        const msg = req.query.msg || "";
        return res.status(200).render('login', { msg: msg, showOtpInput: false, otpok: false});
    }
}
async function handleLoginValidation(req,res){
    const username = req.body.username;
    await user.find({username: username})
    .then(result=>{
        if (result.length>0){
            const pwres = bcrypt.compareSync(req.body.password, result[0].password);
            if(pwres===true){
                isLoginValid = true;
                email = result[0].email;
                const sessionId = genSessionId();
                if (sessionId) {
                    storeSession(sessionId,username);
                    res.cookie('sessionId', sessionId, { maxAge: 600000 });
                } else {
                    return res.status(200).send('Invalid Data');
                }
                return res.redirect('/');
            }
            else{
                return res.status(404).render('login',{msg: "Invalid Password !", showOtpInput: false, otpok: true});
            }
        }
        else{
            return res.status(404).render('login',{msg: "User Not Found !", showOtpInput: false, otpok: true});
        }
    })
}
module.exports = {
    handleLoginRender,
    handleLoginValidation,
}