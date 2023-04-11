import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    await Task.create({
      title,
      description,
      user: req.user, //req.user is coming from isAuthenticated middleware as we have saved earlier for logged in user
    });
    res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res) => {
  try {
    const userid = req.user._id; // from isAuthenticated middleware
    const tasks = await Task.find({ user: userid });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (req, res, next) => {
  try {
    const taskid = req.params.id;
    const task = await Task.findById(taskid);
    if (!task) {
      return next(new ErrorHandler("Task not found", 404));
    }

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const taskid = req.params.id;
    const task = await Task.findById(taskid);
    if (!task) {
      return next(new ErrorHandler("Task not found", 404));
    }
    await task.deleteOne(); //delete task

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
