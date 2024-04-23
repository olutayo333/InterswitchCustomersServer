const express = require("express");
const router = express.Router()
const {signup, signin, dashboard, merchantRegistration, merchantSignin, merchantDashboard} = require("../controllers/users.controllers")
//const { deleteUser, editUser, api, uploadFiles} = require("../contollers/user.controllers")

// CUSTOMERS Routes
router.post("/signup", signup )
router.post("/signin", signin)
router.get('/dashboard', dashboard)

//MERCHANTS ROUTES
router.post("/merchantRegistration", merchantRegistration)
router.post('/merchantSignin', merchantSignin)
router.get('/merchantDashboard', merchantDashboard)
module.exports = router