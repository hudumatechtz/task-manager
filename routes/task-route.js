const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const isAuth = require("../middlewares/is-auth");

router.get("/tasks", isAuth, taskController.getTasks);

router.get("/ongoing", isAuth, taskController.getOnGoing);

router.get("/completed", isAuth, taskController.getCompleted);

router.get("/new-task", isAuth, taskController.getNew);

router.delete("/delete/:taskId", isAuth, taskController.deleteTask);

router.post("/create-task", isAuth, taskController.postTask);

router.get("/edit/:taskId", isAuth, taskController.getTaskForEdit);

router.post("/edit", isAuth, taskController.postEditTask);

router.get("/dashboard", isAuth, taskController.getTaskNumbers);

router.post("/mark-going", isAuth, taskController.postMarkGoing);

router.post("/mark-complete", isAuth, taskController.postMarkComplete)

module.exports = router;
