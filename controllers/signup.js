const user = require('../models/user');
async function Signup(req, res) {
    const sessionCookie = req.cookies.sessionId;
    if(sessionCookie){
        return res.status(200).redirect('/');
    }
    else{
        return res.status(200).render('signup', { msg: "", showOtpInput: false });
    }
}
async function handleSignup(req, res, next) {
    try {
        const body = req.body;
        const usernameExists = await user.findOne({ username: body.username });
        if (usernameExists) {
            return res.status(400).render('signup', { msg: "This Username is already taken!", showOtpInput: false, otpok: true });
        }
        const mobNoExists = await user.findOne({ mobNo: body.mobno });
        if (mobNoExists) {
            return res.status(400).render('signup', { msg: "Mobile number already linked with another account!", showOtpInput: false, otpok: true});
        }
        const emailExists = await user.findOne({ email: body.email });
        if (emailExists) {
            return res.status(400).render('signup', { msg: "Email already linked with another account!", showOtpInput: false, otpok: true});
        }
        await user.create({
            username: body.username,
            password: body.password,
            name: body.name,
            email: body.email,
            mobno: body.mobno,
        });
        return res.redirect(`/login?msg=${encodeURIComponent("Account created successfully!\nPlease Login using New Credentials")}`);
    } catch (error) {
        console.error("Error in handleSignup:", error);
        next(error);
    }
}

module.exports = {
    Signup,
    handleSignup,
}