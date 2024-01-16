const express = require('express');
const router = express.Router();
const serviceController = require('./Controller/serviceController')
const orderController = require('./Controller/orderController')
const userController = require('./Controller/userController')
router.post("/createUser", userController.createUser)
router.post("/createService", serviceController.createService)
router.post("/createOrder/:Id", orderController.createOrder)
router.get("/getOrder", orderController.getOrder)
router.put("/updateOrder", orderController.updateOrder)
module.exports = router;