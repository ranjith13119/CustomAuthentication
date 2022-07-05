const admin = require('../config/firebase-config');
const cds = require("@sap/cds");

module.exports = async (req, res, next) => {
    try {
        const sessionCookie = req.cookies.session || "";
        const userData = await admin
            .auth()
            .verifySessionCookie(sessionCookie, true /** checkRevoked */);
        if (userData) {
            console.log(userData)
            req.user = new cds.User({
                id: userData.uid,
                _roles: ["authenticated-user"],
                ...userData
            });
            return next();
        }
        return res.status(401).send();
    } catch (oErr) {
        return res.status(401).send();
    }
}
