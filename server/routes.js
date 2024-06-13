const {
  AddData,
  DeleteTask,
  FetchData,
  UpdateTask,
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

// Admin Routes 
router.post('/api/admin-login', AdminLogin)





module.exports = router;
