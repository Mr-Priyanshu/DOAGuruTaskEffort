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