const express = require("express");
const router = express.Router();

router.get("/setCookie", (req, res) => {
    res.cookie("user", "express").send("Cookie set");

});

router.get("/getData", (req, res) => {
    const userCookie = req;

    const sessionData = req.session.data || "No session data";
    console.log(req);
    res.send(`User cookie: ${userCookie}, Session data: ${sessionData}`);
});

router.get("/setSession", (req, res) => {
    req.session.data = "This is session data";
    res.send("Session data set");
});

module.exports = router;
