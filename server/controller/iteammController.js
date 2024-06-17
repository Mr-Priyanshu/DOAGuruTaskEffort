const db = require('../config/db.js');

// Route to add-data 
const AddData = (req, res) => {
  console.log('here');
  const { ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin } = req.body;
  const taskDate = new Date().toISOString().split('T')[0]; // current date 
  console.log(ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin)
  const query = 'INSERT INTO tasks (ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin, task_date) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin, taskDate], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Data saved successfully');
  });
}
// Route to fetch data
const FetchData = (req, res) => {
  const {date} = req.query
  const query = 'SELECT * FROM tasks WHERE task_date = ?';
  db.query(query, [date], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

// fetch full task report
const FetchFUllData = (req, res) => {
  const query = 'SELECT * FROM tasks';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

// Route to update  task details 
const UpdateTask = (req, res) => {
  try {
    const { ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin, id } = req.body;
    console.log(ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin, id);

    const updateTask = `
      UPDATE tasks
      SET ProjectOrClientName = ?,
          Category = ?,
          SubCategory = ?,
          TaskDescription = ?,
          ConsumingTimeInMin = ?
      WHERE id = ?;
    `;

    db.query(updateTask, [ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin, id], (updateErr, updateResult) => {
      if (updateErr) {
        console.error('Error updating task:', updateErr);
        return res.status(500).json({ error: 'Internal server error' });
      }
      // Success Response 
      console.log(updateResult);
      return res.status(200).json({
        message: "Task updated successfully",
        result: updateResult
      });
    });
  } catch (e) {
    console.error('Caught error:', e);
    res.status(500).json({ error: e.message });
  }
};
// Route to delete Task 
const DeleteTask = (req, res) => {
  const { id } = req.body;

  const deleteTaskData = 'DELETE FROM tasks WHERE id = ?';

  db.query(deleteTaskData, [id], (deleteErr, deleteResult) => {
    if (deleteErr) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.status(200).json({ message: 'Task deleted successfully' });
  });
};



module.exports = {
  AddData,
  FetchData,
  UpdateTask,
  DeleteTask,
  FetchFUllData,

};
