const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async");
const Task = require("../models/task");

const getAllTasks = asyncWrapper(async (req, res) => {
    // try {
      const tasks = await Task.find({});
      // res.status(200).json({ tasks });
      // res.status(200).json({ tasks, amount: tasks.length });
      res.status(200).json({success: true, data: {tasks, nbHits:tasks.length}});
    // } catch (error) {
    //   res.status(500).json({ msg: error });
    // }
  });
const createTask = asyncWrapper(async (req, res) => {
    // try {
      const task = await Task.create(req.body);
      res.status(201).json({ task });
    // } catch (error) {
    //   res.status(500).json({ msg: error });
    // }
  });
const getSingleTasks = asyncWrapper(
    async (req, res, next) => {
        // try {
          const { id: taskID } = req.params;
          const task = await Task.findOne({ _id: taskID });
      
          if (!task) {
            return(next(createCustomError(`no teask with id : ${taskId}`), 404))
            //   const error = new Error("not found")
            //   error.status = 404
            //   return next(error)
        //   return res.status(404).json({ msg: `No task with id ${taskID}` });
          }
      
          res.status(200).json({ task });
        // } catch (error) {
        //   res.status(500).json({ msg: error });
        // }
      }
);


const deleteTask = asyncWrapper(
    async (req, res) => {
        // try {
          const { id: taskID } = req.params;
          const task = await Task.findOneAndDelete({ _id: taskID });
      
          if (!task) {
            return res.status(404).json({ msg: `No task with id ${taskID}` });
          }
          res.status(200).json({ task: null, status: "success" });
          // res.status(200).json({ task, msg: "deleted" });
        // } catch (error) {
        //   res.status(500).json({ msg: error });
        // }
      }
);

const updateTasks = asyncWrapper(async (req, res) => {
    // try {
        const { id: taskID } = req.params;
        const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {new:true, runValidators: true});

        
        if (!task) {
            return res.status(404).json({ msg: `No task with id ${taskID}` });
        }
        res.status(200).json({ task });
        // res.send("updated tasks");  
    // } catch (error) {
    // res.status(500).json({ msg: error });
    // }
  });
  
module.exports = {
  getAllTasks,
  createTask,
  getSingleTasks,
  updateTasks,
  deleteTask,
};
