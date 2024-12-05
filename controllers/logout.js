const { deleteSession } = require('../middlewares/cAuth');
async function handleClientLogout(req, res){
    try {
        const sessionCookie = req.cookies.sessionId;
        deleteSession(sessionCookie);
        res.clearCookie('sessionId').redirect('/');
    } catch (err) {
        console.error('Error during logout:', err);
        res.status(500).send('Logout failed');
    }
}

module.exports = {
    handleClientLogout,
}