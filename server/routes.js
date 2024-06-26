const {
  AddData,
  DeleteTask,
  FetchData,
  UpdateTask,
  FetchFUllData,
  ProjectsList,
  CategoryList,
  SubCategoryList,
  myTask,
  AddCategory,
  AddSubcategory,
  AddProject,
  UserData,
  projectFromAssign,
  assignProject,
  getUserTasks,
  DownloadUserTaskReport,
} = require('./controller/iteammController');

const {
  UserLogin,
  UserRegister,
  AdminLogin
} = require('./controller/authController');
const express = require('express');
const router = express.Router();


// Route to add data
router.post('/api/add-data', AddData);
// Route to fetch data
router.get('/api/fetch-data', FetchData);
// this route for fetch full all user  task report
router.get('/api/fetch-full-data', FetchFUllData);
//  Update Task Details 
router.post('/api/update-task', UpdateTask);
// Route to delete a task
router.post('/api/delete-task', DeleteTask);
// Router to Register New user By admin side 
router.post('/api/register', UserRegister);
// Route to Register User 
router.post('/api/login', UserLogin);
// Router to Logout user 
// router.post('/api/logout', UserLogout);
// Route for user show only self add task 
router.get('/api/mytask/:id', myTask);

// slect filed routes 
router.get('/api/projects', ProjectsList);
router.get('/api/category-list', CategoryList);
router.get('/api/sub-category-list', SubCategoryList);

// Route for  Add project and categeory 
router.post('/api/projects', AddProject );

router.post('/api/categories', AddCategory );

router.post('/api/subcategories', AddSubcategory);

// Admin Routes 
router.post('/api/admin-login', AdminLogin);

//User Data Fetch

router.get('/api/users',UserData);
router.get('/api/getProject/:user_id',projectFromAssign);

router.post('/api/assignProject',assignProject);

// Employee Task Show to admin 
router.get('/api/getUserTasks/:userId', getUserTasks);

// Downnload User task in excel 

router.get('/api/downloadUserTasks/:userId', DownloadUserTaskReport)


module.exports = router;
