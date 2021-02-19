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
  const { taskId } = req.params;
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
  console.log(userId);
  try {
    const userTasks = await Task.findAll({
      where: {
        userId: userId,
      },
    });
    if (!userTasks) {
      const error = new Error("TASKS DO NOT EXIST/ OR COULD NOT FETCHED");
      error.statusCode = 501;
      throw error;
    } else if (userTasks.length <= 0) {
      return res.json({ tasks: [], message: "TASKS ARE EMPTY" });
    }
    res.json({ tasks: userTasks, message: "TASKS OBTAINED" });
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
    if (!task) {
      const error = new Error("TASK COULD NOT BE ADDED");
      throw error;
    }
    res.json({ message: "TASK ADDED SUCCESSFULLY" });
  } catch (error) {
    next(error);
  }
};
exports.getOnGoing = async (req, res, next) => {
  //   const onGoing = req.params.ongoing;
  try {
    const taskOnGoing = await Task.findAll({
      where: {
        userId: req.userId,
        onGoing: true,
      },
    });
    if (taskOnGoing.length <= 0) {
      return res.json({ onGoing: [], message: "NO TASK is ongoing" });
    }
    res.json({ message: "GOT SOME ONGOING TASKS", onGoing: taskOnGoing });
  } catch (error) {
    next(error);
  }
};
exports.getNew = async (req, res, next) => {
  //   const newTask = req.params.newtask;
  try {
    const taskNew = await Task.findAll({
      where: {
        userId: req.userId,
        newTask: true,
      },
    });
    if (taskNew.length <= 0) {
      return res.json({ taskNew: [], message: "NO TASK ON QUEUE" });
    }
    res.json({ message: "GOT SOME NEW TASKS ON QUEUE", taskNew: taskNew });
  } catch (error) {
    next(error);
  }
};
exports.getCompleted = async (req, res, next) => {
  //   const completed = req.params.completed;
  try {
    const completed = await Task.findAll({
      where: {
        userId: req.userId,
        completed: true,
      },
    });
    console.log(completed);
    if (completed.length <= 0) {
      return res.json({ completed: [], message: "NO TASK COMPLETED" });
    }
    res.json({ message: "GOT SOME COMPLETED TASKS", completed: completed });
  } catch (error) {
    next(error);
  }
};

exports.getTaskNumbers = async (req, res, next) => {
  console.log(req.userId);
  try {
    let totalTasks = await Task.count({
      where: {
        userId: req.userId,
      },
    });
    let completed = await Task.count({
      where: {
        userId: req.userId,
        completed: true,
      },
    });
    let onGoing = await Task.count({
      where: {
        userId: req.userId,
        onGoing: true,
      },
    });
    let newTasks = await Task.count({
      where: {
        userId: req.userId,
        newTask: true,
      },
    });
    if (!totalTasks) {
      totalTasks = 0;
    }
    if (!completed) {
      completed = 0;
    }
    if (!newTasks) {
      newTasks = 0;
    }
    if (!onGoing) {
      onGoing = 0;
    }
    res.status(201).json({
      completed: completed,
      onGoing: onGoing,
      newTasks: newTasks,
      totalTasks: totalTasks,
    });
  } catch (error) {
    next(error);
  }
};

exports.postMarkGoing = async (req, res, next) => {
  const userId = req.userId;
  const id = req.body.id;
  console.log(id);
  try {
    const userTask = await Task.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!userTask) {
      const error = new Error("TASKS DO NOT EXIST/ OR COULD NOT FETCHED");
      error.statusCode = 501;
      throw error;
    }
    userTask.onGoing = true;
    userTask.newTask = false;

    const updatedTask = await userTask.save();
    console.log(updatedTask);
    if (!updatedTask) {
      const error = new Error("TASK COULD NOT BE MARKED going");
      error.statusCode = 401;
    }
    res.json({ message: "TASK MARKED ONGOING" });
  } catch (error) {
    next(error);
  }
};
exports.postMarkComplete = async (req, res, next) => {
  const userId = req.userId;
  const id = req.body.id;
  console.log(id);
  try {
    const userTask = await Task.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!userTask) {
      const error = new Error("TASKS DO NOT EXIST/ OR COULD NOT FETCHED");
      error.statusCode = 501;
      throw error;
    }
    userTask.onGoing = false;
    userTask.completed = true;

    const updatedTask = await userTask.save();
    if (!updatedTask) {
      const error = new Error("TASK COULD NOT BE COMPLETED");
      error.statusCode = 401;
    }
    res.json({ message: "TASK MARKED completed" });
  } catch (error) {
    next(error);
  }
};
