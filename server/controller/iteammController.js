const db = require('../config/db.js');
const excel = require('exceljs');

// Route to add-Task data 
const AddData = (req, res) => {
  console.log('here');
  const { user_id,user_full_name, ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin } = req.body;

  if (!user_id || !user_full_name || !ProjectOrClientName || !Category || !SubCategory || !TaskDescription || !ConsumingTimeInMin) {
    return res.status(400).send('All fields are required');
  }
  const taskDate = new Date().toISOString().split('T')[0]; // current date 
  console.log(user_id, user_full_name, ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin)

  const query = 'INSERT INTO tasks (user_id, name, ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin, task_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [user_id, user_full_name, ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin, taskDate], (err, result) => {
    console.log(result)
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
  const query = 'SELECT * FROM category ';
  db.query(query, (err, result) => {
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


// Add new project
const AddProject = (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO projects (name) VALUES (?)';
  db.query(query, [name], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ message: 'Project added successfully', id: results.insertId });
  });
};

// Add new category
const AddCategory = (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO categories (name) VALUES (?)';
  db.query(query, [name], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ message: 'Category added successfully', id: results.insertId });
  });
};

// Add new subcategory
const AddSubcategory = (req, res) => {
  const { name, category_id } = req.body;
  const query = 'INSERT INTO subcategories (name, category_id) VALUES (?, ?)';
  db.query(query, [name, category_id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ message: 'Subcategory added successfully', id: results.insertId });
  });
};


// New endpoint to get all users
const UserData = (req, res) => {
  const sql = 'SELECT id, full_name, mobile_number, email_id, designation, password FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send({ error: 'Database error', details: err });
    }
    res.send(results);
  });
};
//  fetch from asing task
const projectFromAssign = (req, res) => {
  const user_id = req.params.user_id; // Assuming user_id is a parameter in the request
  const query = 'SELECT * FROM assigned_projects WHERE user_id = ?'; // Adjusted query to filter by user_id
  db.query(query, [user_id], (err, result) => {
    if (err) {
      console.error('Error fetching projects:', err);
      res.status(500).json({ error: 'Failed to fetch projects' });
    } else {
      res.status(200).json(result); // Assuming result contains the fetched projects
    }
  });
}

const assignProject = (req, res) => {
  const { projectId, categoryId, userId } = req.body;
  const assignCategoryQuery = 'INSERT INTO assigned_projects (project_id, category_id, user_id) VALUES (?, ?, ?)';
  db.query(assignCategoryQuery, [projectId, categoryId, userId], (err, assignResults) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ message: 'Project added and assigned to category successfully', projectId });
  });
};

// User task show to admin side 
const getUserTasks = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT user_id, name, ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin, task_date
    FROM tasks
    WHERE user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(200).json(results);
  });
};

// Define the route to download user tasks as an Excel file
const DownloadUserTaskReport = (req, res) => {
  const { userId } = req.params;
  const { userName } = req.params;
   

  const query = `
    SELECT user_id, name, ProjectOrClientName, Category, SubCategory, TaskDescription, ConsumingTimeInMin, task_date
    FROM tasks
    WHERE user_id = ?
  `;

  db.query(query, [userId, userName], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('User Tasks');


    worksheet.columns = [
      { header: 'User ID', key: 'user_id', width: 10 },
      { header: 'User Name', key: 'name', width: 20 },
      { header: 'Project or Client Name', key: 'ProjectOrClientName', width: 30 },
      { header: 'Category', key: 'Category', width: 20 },
      { header: 'SubCategory', key: 'SubCategory', width: 20 },
      { header: 'Task Description', key: 'TaskDescription', width: 30 },
      { header: 'Consuming Time (Min)', key: 'ConsumingTimeInMin', width: 20 },
      { header: 'Task Date', key: 'task_date', width: 15 }
    ];

    worksheet.addRows(results);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=user_${userId}_tasksReport.xlsx`);

    workbook.xlsx.write(res)
      .then(() => {
        res.end();
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
};



module.exports = {
  AddData,
  FetchData,
  UpdateTask,
  DeleteTask,
  FetchFUllData,
  ProjectsList,
  CategoryList,
  SubCategoryList,
  myTask,
  AddProject,
  AddCategory,
  AddSubcategory,
  UserData,
  projectFromAssign,
  assignProject,
  getUserTasks,
  DownloadUserTaskReport,
};