import { Routes, Route, useNavigate, } from 'react-router-dom'
import './App.css'

// All Pages Import Here 
import LoginPage from './pages/loginPage';
import Navbar from './components/navbar';
// import AdminNavbar from './components/adminNavbar'
import Footer from './components/footer';
import UserHome from './pages/Employee/userHome';
import TaskView from './pages/Employee/taskShow';
import RegisterUser from './pages/Admin/registerUser';
import { useState } from 'react';
import AddProjectandCategory from './pages/Admin/projects';

function App() {
  const [render, setRender] = useState(false);


  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout function called');
    localStorage.removeItem('user')
    // setRender(true);
    handleRender()
    navigate("/")
  }

  const handleRender = () =>{
      setRender(!render)
  }

  return (
    <>
      <div className="App">
        {/* \\This Section only nav bar section and side bar section if use then */}
        <nav>
        <Navbar Logout={handleLogout} render={render} />
        {/* <AdminNavbar/> */}
        </nav>
        {/* this section is also use main screen on landing page  */}
        <main>
        {/* other then use Router part user router  */}
        <Routes>
          <Route path="/" element={<LoginPage setRender={handleRender} />} />
          <Route path="UserHome" element={<UserHome/>} />
          <Route path="TaskView" element={<TaskView/>} />
          <Route path="registerUser" element={<RegisterUser/>} />
          <Route path="/admin-add-project-category" element={<AddProjectandCategory />} />
        </Routes>
        </main>
{/*  */}
        {/* the last section is only for footer components  */}
        <footer>
            <Footer/>
        </footer>

      </div>


    </>
  )
}

export default App
