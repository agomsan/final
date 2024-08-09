const express = require("express");
const router = express.Router();
const crtl = require("../controllers/doctorController");
const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");


// Public routes
router.get("/", auth, crtl.getAll);
router.get("/:id", auth, crtl.getById);

// protected routes
router.post("/",  auth, authorize("super_admin"), crtl.create);
router.put("/:id", auth, authorize("super_admin"), crtl.update);
router.delete("/:id", auth, authorize("super_admin"), crtl.delete);


module.exports = router;