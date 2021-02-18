const express = require("express");
const router = express.Router();
const userController = require('../controllers/user');
const isAuth = require('../middlewares/is-auth')

router.get("/edit/:username", isAuth, userController.getUserForEdit);
router.post("/edit", isAuth, userController.postEditUser);
router.delete("/delete", isAuth, userController.deleteUser);
module.exports = router;