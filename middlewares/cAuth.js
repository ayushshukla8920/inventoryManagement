const fs = require('fs');
let sessions = {};
const path = require('path');
const sessionsFilePath = path.join(__dirname, '../session/session.json');
function loadSessionsFromFile() {
    if (fs.existsSync(sessionsFilePath)) {
        const data = fs.readFileSync(sessionsFilePath, 'utf8');
        try {
            sessions = JSON.parse(data);
        } catch (error) {
        }
    }
}
function saveSessionsToFile() {
    const directory = path.dirname(sessionsFilePath);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
    fs.writeFileSync(sessionsFilePath, JSON.stringify(sessions, null, 2), 'utf8');
}
function genSessionId(){
    const sessionId = 'session.' + 100000+Math.floor(Math.random()*900000);
    return sessionId;
}
function storeSession(sessionId, username) {
    const expiration = Date.now() + 600000;
    sessions[sessionId] = { data: { username: username || 'Anonymous' }, expires: expiration };
    saveSessionsToFile();
}
function startSessionCleanup() {
    setInterval(() => {
        const now = Date.now();
        for (const sessionId in sessions) {
            if (sessions[sessionId].expires < now) {
                delete sessions[sessionId];
            }
        }
    }, 15000);
}
function deleteSession(sessionId) {
    if (sessions[sessionId]) {
        delete sessions[sessionId];
        saveSessionsToFile();
    }
}
loadSessionsFromFile();
module.exports = { 
    startSessionCleanup,
    genSessionId,
    storeSession,
    deleteSession,
    sessions 
};
