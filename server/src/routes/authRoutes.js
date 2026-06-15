const express = require("express");

const authMiddleware =
require("../middleware/authMiddleware");

const router = express.Router();

router.get("/test", authMiddleware, (req, res) => {

    res.json({
        message:
        "Auth Route Working"
    });

});

module.exports =
router;