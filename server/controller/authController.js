const db = require('../config/db.js');


// Router to Register New user By admin side 
const UserRegister = (req, res) => {
  const { fullName, mobileNumber, emailId, designation, password } = req.body;
  const sql = 'INSERT INTO users (full_name, mobile_number, email_id, designation, password) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [fullName, mobileNumber, emailId, designation, password], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'User register successfully' });
  });
}
// Route to login user 
const UserLogin = (req, res) => {
  const { emailId, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email_id = ? AND password = ?';
  db.query(sql, [emailId, password], (err, result) => {
    if (err) {
      return res.status(500).send(err);

    }
    if (result.length > 0) {
      res.send({ 
        message: 'User Successful Login ', user: result[0] 
      });
    }
    else {
      res.status(401).send({ message: 'Invalid credentials' });
      console.log(message)
    }
  });
}


// Route to logout user 

const UserLogout = (req, res) => {
  //Clear the token 
  req.session.destroy((err) =>{
    if(err){
      return res.status(500).send('Failled to logout');
    }
    //clear cookies if used
    res.clearCookie('cookies');

    res.status(200).send('Logged out successfully');

  })
}

// Route to login Admin 
const AdminLogin = (req, res) => {
  const { emailId, password } = req.body;
  const sql = 'SELECT * FROM admin_users WHERE email_id = ? AND password = ?';
  db.query(sql, [emailId, password], (err, result) => {
    if (err) {
      return res.status(500).send(err);

    }
    if (result.length > 0) {
      res.send({ message: 'User Successful', user: result[0] });
    }
    else {
      res.status(401).send({ message: 'Invalid credentials' });
      
      console.log(message)
    }
  });
}






module.exports = {
  UserRegister,
  UserLogin,
  // UserLogout,
  AdminLogin
  
};