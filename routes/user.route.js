const express = require("express");
const router = express.Router()
const {signup, signin, dashboard} = require("../controllers/users.controllers")
//const { deleteUser, editUser, api, uploadFiles} = require("../contollers/user.controllers")

//Routes
router.post("/signup", signup )
router.post("/signin", signin)
router.get('/dashboard', dashboard)

module.exports = router