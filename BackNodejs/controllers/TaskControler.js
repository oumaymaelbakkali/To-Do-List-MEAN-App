"use strict";

const MongoDB = require("../db");
const Task=require("../Models/task");

const addTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newTask = new Task({
      title,
      description,
      dateDebut: new Date(),
      isTerminate: false,
    });

    
    const savedTask = await newTask.save();

    
    res.status(201).json(savedTask);
  } catch (error) {
 
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllTasks = async (req, res, next) => {
  try {
  
    const tasks = await Task.find({ isTerminate: false });

    
    console.log(tasks)
    res.status(200).json(tasks);
  } catch (error) {
   
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getAllTerminateTask = async (req, res, next) => {
  try {
    
    const tasks = await Task.find({ isTerminate: true });

    
    res.status(200).json(tasks);
  } catch (error) {
    
    console.error('Error fetching terminated tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const updateTask = async (req, res, next) => {
  try {
    const taskId = req.body._id;
    const { title, description, isTerminate } = req.body;

   
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, isTerminate },
      { new: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

   
    res.status(200).json(updatedTask);
  } catch (error) {
    
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params._id;
    console.log(taskId)
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      console.log(deletedTask)
      return res.status(404).json({ error: 'Task not found' });
    }

   
    res.status(200).json(deletedTask);
  } catch (error) {
    
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




module.exports = {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getAllTerminateTask
};
