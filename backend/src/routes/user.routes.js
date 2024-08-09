const express = require("express");
const router = express.Router();
const crtl = require("../controllers/userController");
const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");

// User routes

router.get("/appointments", auth, crtl.getUserAppointments);
router.get("/profile", auth, crtl.getUserProfile);
router.put("/profile", auth, crtl.updateUserProfile);

//protected routes

router.get("/", auth, authorize("super_admin"), crtl.getAll);
router.get("/email", auth, authorize("super_admin"), crtl.getUserByEmail);
router.get("/:id", auth, authorize("super_admin"), crtl.getById);
router.put("/:id", auth, authorize("super_admin"), crtl.update);
router.delete("/:id", auth, authorize("super_admin"), crtl.delete);
router.get("/:id/appointments", auth, authorize("super_admin"), crtl.getAppointmentsByUserId);

module.exports = router;
