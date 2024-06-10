import { Routes, Route, } from 'react-router-dom'
import './App.css'

// All Pages Import Here 
import LoginPage from './pages/loginPage'
import Navbar from './components/navbar'
// import AdminNavbar from './components/adminNavbar'
import EmployeePage from './pages/Admin/Employees'
import Footer from './components/footer'
import UserHome from './pages/Employee/userHome'
// import { useState, useEffect } from 'react'

function App() {



  return (
    <>
      <div className="App">
        {/* \\This Section only nav bar section and side bar section if use then */}
        <nav>
        <Navbar/>
        {/* <AdminNavbar/> */}
        </nav>
        {/* this section is also use main screen on landing page  */}
        <main>
          
        </main>

        {/* other then use Router part user router  */}
        <Routes>
          <Route path="login" element={<LoginPage/>} />
          <Route path="/" element={<UserHome />} />
          <Route path="EmployeePage" element={<EmployeePage/>} />
        </Routes>
        {/* the last section is only for footer components  */}
        <footer>
            <Footer/>
        </footer>

      </div>


    </>
  )
}

export default App
