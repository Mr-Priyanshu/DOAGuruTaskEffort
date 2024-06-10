const express = require('express');
const router = express.Router();
const db = require('./config/db');

// Route to add data
router.post('/api/add-data', (req, res) => {
  console.log('here');
    const { ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin } = req.body;
    console.log( ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin)
  const query = 'INSERT INTO tasks (ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Data saved successfully');
  });
});

// router.get("/", (req, res)=>{
//     res.json({
//         name : "Hello"
//     })
// })

// Route to fetch data
router.get('/api/fetch-data', (req, res) => {
  const query = 'SELECT * FROM tasks';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});


//  Update Task Details 

router.post('/api/update-task', (req, res) => {
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
  });

// Route to delete a task
router.post('/api/delete-task', (req, res) => {
    const { id } = req.body;
    
    const deleteTaskData = 'DELETE FROM tasks WHERE id = ?';
    
    db.query(deleteTaskData, [id], (deleteErr, deleteResult) => {
      if (deleteErr) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.status(200).json({ message: 'Task deleted successfully' });
    });
  });
  



module.exports = router;
