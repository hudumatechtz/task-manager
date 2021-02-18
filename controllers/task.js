const Task = require("../models/task");

exports.getTaskForEdit = async (req, res, next) => {
  const task = req.params.task;
  try {
    const task = await Task.findOne({
      where: {
        task: task,
      },
    });
    if (!task) {
      const error = new Error("ERROR GETTING THE TASK");
      error.statusCode = 500;
      throw error;
    }
    res.status(201).json({ message: "TASK OBTAINED", task: task });
  } catch (error) {
    next(error);
  }
};

exports.postEditTask = async (req, res, next) => {
  const { task, onGoing, newTask, completed, taskId } = req.body;
  try {
    let task = await Task.findOne({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      const error = new Error("TASK NOT AVAILABLE");
      error.statusCode = 401;
      throw error;
    }
    task.task = task;
    task.newTask = newTask;
    task.onGoing = onGoing;
    task.completed = completed;
    const savedTask = await task.save();
    if (!savedTask) {
      const error = new Error("TASK COULD NOT BE UPDATED");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ message: "TASK UPDATED SUCCESSFULLY" });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  const { taskId } = req.params.taskId;
  try {
    const task = await Task.findOne({
      where: {
        id: req.taskId,
      },
    });
    const destroyedTask = await task.destroy();
    if (!destroyedTask) {
      const error = new Error("TASK COULD NOT BE DELETED");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ message: "TASK DELETED SUCCESSFULLY" });
  } catch (error) {
    next(error);
  }
};
