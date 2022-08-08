const express = require("express");
const {
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authoriseRoles } = require("../middleware/auth");
const { deleteOne } = require("../models/orderModel");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
    .route("/admin/orders")
    .get(isAuthenticatedUser, authoriseRoles("admin"), getAllOrders);

router
    .route("/admin/order/:id")
    .put(isAuthenticatedUser, authoriseRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authoriseRoles("admin"), deleteOrder);

module.exports = router;
