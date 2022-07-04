const admin = require('../config/firebase-config');
const cds = require("@sap/cds");

module.exports = async (req, res, next) => {

    try {

        const token = req.headers && req.headers.authorization && req.headers.authorization.split(' ')[1];
        const decodeValue = await admin.auth().verifyIdToken(token);

        if (decodeValue) {
            req.user = new cds.User({
                id: decodeValue.uid,
                _roles: ["authenticated-user"],
                ...decodeValue
            });
            return next();
        }
        return res.status(403).send();

    } catch (e) {
        return res.status(401).send();
    }
}