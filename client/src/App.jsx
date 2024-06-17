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

function App() {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log('Logout function called');
    localStorage.removeItem('user')
    navigate("/")

  }


  return (
    <>
      <div className="App">
        {/* \\This Section only nav bar section and side bar section if use then */}
        <nav>
        <Navbar Logout={handleLogout}/>
        {/* <AdminNavbar/> */}
        </nav>
        {/* this section is also use main screen on landing page  */}
        <main>
        {/* other then use Router part user router  */}
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="UserHome" element={<UserHome/>} />
          <Route path="TaskView" element={<TaskView/>} />
          <Route path="registerUser" element={<RegisterUser/>} />
        </Routes>
        </main>

        {/* the last section is only for footer components  */}
        <footer>
            <Footer/>
        </footer>

      </div>


    </>
  )
}

export default App
