const express = require("express");
const {
    addTask,
    getAllTasks,
    updateTask,
    deleteTask,
    getAllTerminateTask
} = require("../controllers/TaskControler");

const router = express.Router();

router.post("/addTask", addTask);
router.get("/getAllTasks", getAllTasks);
router.get("/getAllTerminateTask", getAllTerminateTask);
router.post("/updateTask", updateTask);
router.post("/deleteTask/:_id", deleteTask);








module.exports = {
  routes: router,
};