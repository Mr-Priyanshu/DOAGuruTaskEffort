import { Routes, Route, useNavigate, } from 'react-router-dom'
// import './App.css'
import { useEffect, useState } from 'react';

// All Pages Import Here 
import LoginPage from './pages/loginPage';
import Navbar from './components/navbar';
import Footer from './components/footer';
import UserHome from './pages/Employee/userHome';
import TaskView from './pages/Employee/taskShow';

// Admin file import 
import AdminNavbar from './components/adminNavbar';
import AdminHomePage from './pages/Admin/adminHome';
import EmployeePage from './pages/Admin/Employees';
import RegisterUser from './pages/Admin/registerUser';
import ProjectsPage from './pages/Admin/projects';
import AddData from './pages/Admin/Addprojects';
import ProjectAssignmentForm from './pages/Admin/assignProoject';
import TaskReportDownload from './pages/Admin/Report';
import Blank from './pages/blank';


function App() {
  const [render, setRender] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout function called');
    localStorage.removeItem('user')
    // setRender(true);
    handleRender()
    navigate("/")
  }

  const handleRender = () => {
    setRender(!render)
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role)
    }
  }, [render]);

  return (
    <>
      <div className="App flex flex-col min-h-screen">
        {/* \\This Section only nav bar section and side bar section if use then */}
        <nav>
          {userRole === 'admin' ? (
            <AdminNavbar Logout={handleLogout} render={render} />
          ) : (
            <Navbar Logout={handleLogout} render={render} />
          )}
          {/* <AdminNavbar/> */}
        </nav>
        {/* this section is also use main screen on landing page  */}
        <main className=' flex-grow justify-center '>
          {/* other then use Router part user router  */}
          <Routes>
            {/* {userRole === 'admin' ? (<Route path='/' element={<AdminHomePage/>}/>) : (<Route path="/Logout" element={<LoginPage setRender={handleRender} />} />)} */}
            
            <Route path="/" element={<LoginPage setRender={handleRender} />} />

            <Route path="UserHome" element={<UserHome />} />
            <Route path="TaskView" element={<TaskView />} />
           
            {/* Admin Routes  */}
            <Route path='Admin-Home-page' element={<AdminHomePage/>}/>
            <Route path='employee-show-register-page' element={<EmployeePage/>}/>
            <Route path="/registerUser" element={<RegisterUser/>} />
            <Route path="project-add" element={<ProjectsPage/>} />
            <Route path="/AddProject" element={<AddData/>} />
            <Route path="/assign-projects" element={<ProjectAssignmentForm/>} />
            <Route path="/Employee-report" element={<TaskReportDownload/>} />
            <Route path='/blank' element={<Blank/>}/>
           

          </Routes>
        </main>
        {/*  */}
        {/* the last section is only for footer components  */}
        <footer>
          <Footer />
        </footer>

      </div>


    </>
  )
}

export default App
