const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const isAuth = require("../middlewares/is-auth");

router.get("/tasks", isAuth, taskController.getTasks);

router.get("/ongoing/:ongoing", isAuth, taskController.getOnGoing);

router.get("/completed/:completed", isAuth, taskController.getCompleted);

router.get("/new-task/:newtask", isAuth, taskController.getNew);

router.delete("/delete/:taskId", isAuth, taskController.deleteTask);

router.post("/create-task", isAuth, taskController.postTask);

router.get("/edit/:taskId", isAuth, taskController.getTaskForEdit);

router.post("/edit", isAuth, taskController.postEditTask);

module.exports = router;
