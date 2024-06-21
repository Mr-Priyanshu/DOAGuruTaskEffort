const db = require('../config/db.js');

// Route to add-Task data 
const AddData = (req, res) => {
  console.log('here');
  const { user_id, ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin } = req.body;

  if (!user_id || !ProjectOrClientName || !Category || !SubCategory || !TaskDescription || !ConsumingTimeInMin) {
    return res.status(400).send('All fields are required');
  }
  const taskDate = new Date().toISOString().split('T')[0]; // current date 
  console.log(user_id, ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin)

  const query = 'INSERT INTO tasks (user_id, ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin, task_date) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [user_id, ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin, taskDate], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Data saved successfully');
  });
}
// Route to fetch data by date to show user only by date
const FetchData = (req, res) => {
  const { date } = req.query
  const query = 'SELECT * FROM tasks WHERE task_date = ?';
  db.query(query, [date], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

// fetch full task data show full task details
const FetchFUllData = (req, res) => {
  const query = 'SELECT * FROM tasks ';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    console.log(results);
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
// Route to fetch options for selects filed (Add task)
const ProjectsList = (req, res) => {
  const query = 'SELECT * FROM projects';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching projects:', err);
      res.status(500).send('Error fetching projects', err);
      return;
    }
    res.json(result);
  });
};

const CategoryList = (req, res) => {
  const { projects_id } = req.query;
  const query = 'SELECT * FROM category WHERE projects_id = ?';
  db.query(query, [projects_id], (err, result) => {
    if (err) {
      console.error('Error fetching categories:', err);
      res.status(500).send('Error fetching categories', err);
      return;
    }
    res.json(result);
    console.log(result)
  });
};

const SubCategoryList = (req, res) => {
  const { category_id } = req.query;
  console.log(category_id)
  const query = 'SELECT * FROM subcategory WHERE category_id = ?';

  db.query(query, [category_id], (err, result) => {
    if (err) {
      console.error('Error fetching sub-categories:', err);
      res.status(500).json({ message: 'Error fetching sub-categories', error: err });
      return;
    }
    console.log('sub category ', result)
    res.json(result);
  });
};

// // Route to add new option(project name category subcat) by Admin side 
const addOption = (req, res) => {
  const { project, category, subcategory } = req.body;

  const ProjectQuery = 'INSERT INTO projects (name) VALUES (?)';
  const CategoryQuery = 'INSERT INTO category (name, projects_id) VALUES ?';
  const SubCategoryQuery = 'INSERT INTO subcategory (name, category_id) VALUES ?';

  // Insert project
  db.query(ProjectQuery, [project], (err, projectResult) => {
    if (err) {
      console.error('Error in project query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const projectId = projectResult.insertId;

    // Prepare category values
    const categoryValues = category.map(cat => [cat, projectId]);

    // Insert categories
    db.query(CategoryQuery, [categoryValues], (err, categoryResult) => {
      if (err) {
        console.error('Error inserting categories:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Extract category IDs
      const categoryIds = categoryResult.insertId;

      // Prepare subcategory values
      const subcategoryValues = subcategory.map((subcat, index) => [subcat, categoryIds]);

      // Insert subcategories
      db.query(SubCategoryQuery, [subcategoryValues], (err, subcategoryResult) => {
        if (err) {
          console.error('Error inserting subcategories:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        console.log('Subcategories inserted successfully.');
        res.status(200).json({ message: 'Project, categories, and subcategories inserted successfully.' });
      });

      console.log('Categories inserted successfully.');
    });

    console.log('Project inserted successfully.');
  });
};



    // route for user only show user data 
    const myTask = (req, res) => {
      console.log('OKAY');
      const { id } = req.params;
      console.log(id);
      const query = 'SELECT * from tasks WHERE user_id = ?';
      db.query(query, [id], (err, result) => {
        if (err) {
          return res.status(500).send('Internal Server Error')
        };
        console.log(result);
        if (result.length < 1) {
          return res.status(404).send('No Data Available')
        };
        res.status(200).json(result);
      })
    }
    module.exports = {
      AddData,
      FetchData,
      UpdateTask,
      DeleteTask,
      FetchFUllData,
      addOption,
      ProjectsList,
      CategoryList,
      SubCategoryList,
      myTask,
    };