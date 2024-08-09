const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/appointmentController");
const auth = require("../middlewares/auth");

//User

router.post("/", auth, ctrl.create);
router.get("/:id", auth, ctrl.getById);
router.get("/user/:userId", auth, ctrl.getUserAppointments);

//protected routes
router.get("/", auth, ctrl.getAllAppointments);
router.put("/:id", auth, ctrl.update);
router.delete("/:id", ctrl.delete);

module.exports = router;
