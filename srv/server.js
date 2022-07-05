"use strict";

const cds = require("@sap/cds");
const proxy = require("@sap/cds-odata-v2-adapter-proxy");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const csrfMiddleware = csrf({ cookie: true });
const admin = require('./config/firebase-config');

cds.on("bootstrap", (app) => {
    app.use(proxy());
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(csrfMiddleware);

    app.all("*", (req, res, next) => {
        res.cookie("XSRF-TOKEN", req.csrfToken());
        next();
    });

    app.post("/sessionLogin", async (req, res, next) => {
        
        try {
            const token = req.body.idToken.toString();
            const decodeValue = await admin.auth().verifyIdToken(token);
            if (decodeValue) {
                const expiresIn = 60 * 60 * 12 * 1 * 1000;
                const sessionCookie = await admin
                    .auth()
                    .createSessionCookie(token.toString(), { expiresIn });

                if (sessionCookie) {
                    const options = { maxAge: expiresIn, httpOnly: true };
                    res.cookie("session", sessionCookie, options);
                    res.end(JSON.stringify({ status: "success" }));
                }
                return res.status(401).send();
            }

        } catch (err) {
            return res.status(401).send();
        }
    });

    app.get("/logout", (req, res, next) => {
        res.clearCookie("session");
    })
});

module.exports = cds.server;