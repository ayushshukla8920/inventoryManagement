const user = require('../models/user');
const { sessions } = require('../middlewares/cAuth');
const bcrypt = require('bcryptjs');
async function handleSettingsRender(req, res){
    const sessionCookie = req.cookies.sessionId;
    if (sessionCookie && sessions[sessionCookie]) {
        const username = sessions[sessionCookie].data.username;
        const userData = await user.findOne({ username: username });
        if (userData) {
            const alert = req.query.alert || false;
            const message = req.query.message || '';

            return res.render('settings', { 
                user: userData,
                alert: alert,
                message: message
            });
        }
        res.redirect('/login');
    } else {
        res.redirect('/login');
    }
}
async function handleSettingsUpdate(req, res){
    const sessionCookie = req.cookies.sessionId;
    if (sessionCookie && sessions[sessionCookie]) {
        const username = sessions[sessionCookie].data.username;
        const { oldPassword, password } = req.body;
        const userData = await user.findOne({ username: username });
        if (userData) {
            const isOldPasswordValid = await bcrypt.compare(oldPassword, userData.password);
            if (isOldPasswordValid && password) {
                userData.password = password;
                await userData.save();
                return res.redirect('/settings?alert=true&message=Password updated successfully');
            } else {
                return res.redirect('/settings?alert=true&message=Old password is incorrect or new password is missing');
            }
        }
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    handleSettingsRender,
    handleSettingsUpdate,
}