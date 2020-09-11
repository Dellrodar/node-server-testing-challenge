const express = require("express");
const users = require("./user-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        res.json(await users.find());
    } catch(err) {
        return next(err);
    };
});

router.get("/:id", async (req, res, next) => {
    try {
        const user = await users.findById(req.params.id)
        if (!user){
            return res.status(404).json({
                message: "User not found",
            })
        }
        res.json(user);
    } catch(err) {
        return next(err);
    };
});

router.post("/", async (req, res, next) => {
    try {
        const user = await users.add(req.body);
        res.status(201).json(user);
    } catch(err) {
        return next(err);
    };
});

router.delete("/:id", async (req, res, next) => {
    try {
        const user = await users.remove(req.params.id)
        if (!user){
            return res.status(404).json({
                message: "User not found",
            })
        }
        return res.status(201).json({ message: 'The user has been removed.' });
    } catch(err) {
        return next(err);
    };
});

module.exports = router;