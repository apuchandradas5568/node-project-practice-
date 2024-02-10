const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getSingleTasks,
  updateTasks,
  deleteTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getSingleTasks).patch(updateTasks).delete(deleteTask);

module.exports = router;
