const Task = require("../models/task");

exports.getTaskForEdit = async (req, res, next) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findOne({
      where: {
        id: task,
        userId: req.userId,
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
        userId: req.userId,
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
        id: taskId,
        userId: req.userId,
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

exports.getTasks = async (req, res, next) => {
  const userId = req.userId;
  try {
    const userTasks = Task.findAll({
      where: {
        userId: userId,
      },
    });
    if (!userTasks) {
      const error = new Error("TASKS DO NOT EXIST/ OR COULD NOT FETCHED");
      error.statusCode = 501;
      throw error;
    }
    res.json({ tasks: userTasks });
  } catch (error) {
    next(error);
  }
};
exports.postTask = async (req, res, next) => {
  const userId = req.userId;
  const { task } = req.body;
  try {
    const createdTask = await Task.create({
      task: task,
      userId: userId,
    });
  } catch (error) {
    next(error);
  }
};
exports.getOnGoing = async (req, res, next) => {
  const onGoing = req.params.ongoing;
  try {
    const taskOnGoing = await Task.findAll({
      where: {
        userId: req.userId,
        onGoing: true,
      },
    });
    if (!taskOnGoing) {
      return res.json({ onGoing: null });
    }
    res.json({ message: "GOT SOME ONGOING TASKS", onGoing: taskOnGoing });
  } catch (error) {
    next(error);
  }
};
exports.getNew = async (req, res, next) => {
  const newTask = req.params.newtask;
  try {
    const taskNew = await Task.findAll({
      where: {
        userId: req.userId,
        newTask: true,
      },
    });
    if (!taskNew) {
      return res.json({ taskNew: null });
    }
    res.json({ message: "GOT SOME NEW TASKS", taskNew: taskNew });
  } catch (error) {
    next(error);
  }
};
exports.getCompleted = async (req, res, next) => {
  const completed = req.params.completed;
  try {
    const completed = await Task.findAll({
      where: {
        userId: req.userId,
        completed: true,
      },
    });
    if (!completed) {
      return res.json({ completed: null });
    }
    res.json({ message: "GOT SOME COMPLETED TASKS", completed: completed });
  } catch (error) {
    next(error);
  }
};
