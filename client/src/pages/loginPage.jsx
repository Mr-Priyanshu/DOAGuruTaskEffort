import { Link, useNavigate } from "react-router-dom"
import CLogo from "../assets/images/CLogo.png"
import React, { useState } from "react"
import axios from "axios"
import cogoToast from 'cogo-toast';

// eslint-disable-next-line react/prop-types
function LoginPage({setRender}) {
  const [showModal, setShowModal] = React.useState(false);

  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/api/login', { emailId, password })

      .then(response => {
        if (response.data && response.data.user) {
          let save = response.data.user;
          save = JSON.stringify(save);
          localStorage.setItem('user', save);
          cogoToast.success(response.data.message);
          console.log(response.data.message)
          setRender();
          navigate('/UserHome')

        } else {
          console.error('Unexpected response format:', response.data);
          cogoToast.warn('Login successful, but user data is missing.');
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          cogoToast.info(error.response.data.message);
          console.log(error.response.data.message);
        } else {
          cogoToast.warn('Login failed: an unknown error occurred');
          console.log('Error details:', error);
        }
      });
      
  };

  const handleAdminLogin = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/api/admin-login', { emailId, password })
      .then(response => {
        if (response.data && response.data.user) {
          let save = response.data.user;
          save = JSON.stringify(save);
          localStorage.setItem('user', save);
        
        cogoToast.success(response.data.message);
        setRender()
        navigate('/Admin-Home-page')
        } else {
          console.error('Unexpected response format:', response.data);
          cogoToast.warn('Login successful, but user data is missing.');
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          cogoToast.info(error.response.data.message);
          console.log(error.response.data.message);
        } else {
          cogoToast.warn('Login failed: an unknown error occurred');
          console.log('Error details:', error);
        }
      });
  }


  return (

    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src={CLogo}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="modalButton  ">
        <div className="m-2 p-2 flex justify-center ">
          <button onClick={() => setShowModal(true)} className="relative inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-sm font-medium text-black-900 rounded-lg group bg-gradient-to-br from-red-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-white-900 rounded-md group-hover:bg-opacity-0">
              Admin Login
            </span>
          </button>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type={emailId}
                  autoComplete="email"
                  onChange={(e) => setEmailId(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"

                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >Sign In
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="https://doaguru.com/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Join Team
            </Link>
          </p>
        </div>
      </div>



      {/* //Admin login Modal View  */}
      <div>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-3 max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-700 rounded-t">
                    <h3 className="text-3xl font-semibold center">
                      Admin Login
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="h-6 w-6 text-3xl font-semibold center block outline-none focus:outline-none">
                        X
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">

                    <form>
                      <div className="container mx-auto px-5 bg-white-200 max-w-7xl rounded p-3">
                        <div className="mx-5 p-5 border border-black rounded-lg">
                          {/* <div>
                              <h2 className="text-2xl font-bold text-center py-3 my-2">Add Today Afford Tasks</h2>
                            </div> */}
                          <div className="task-box-1 flex">
                            <div className="max-w-7xl mx-auto flex  justify-center min-[320px]:flex-wrap gap-5">
                              {/* Client and Project  Name Select  */}
                              <div className="usernamee">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-black-900 dark:text-black">Your User Name</label>
                                <input
                                  id="username"
                                  name="username"
                                  type="text"
                                  onChange={(e) => setEmailId(e.target.value)}
                                  required
                                  className="block border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 light:bg-white-700 dark:border-gray-600 dark:placeholder-black-400 dark:text-black dark:focus:ring-black-500 dark:focus:border-blue-500" />

                              </div>
                              {/* Project and Client work task category select  */}
                              <div className="project-task-category">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black-900 dark:text-black">Your Password</label>
                                <input
                                  id="password"

                                  type="password"

                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                  className="block border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 light:bg-white-700 dark:border-gray-600 dark:placeholder-black-400 dark:text-black dark:focus:ring-black-500 dark:focus:border-blue-500" />

                              </div>
                              <div className="buttons flex justify-start sm:ms-8  ">
                                {/* Add Task Button  */}

                                <div className=" m-1 flex flex-col justify-end ">
                                  <button onClick={handleAdminLogin} className="relative inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-sm font-medium text-black-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                    <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-white-900 rounded-md group-hover:bg-opacity-0">
                                      Sign In
                                    </span>
                                  </button>
                                </div>
                                {/* Task Clear Button */}
                                <div className="m-1 flex flex-col justify-end">
                                  <button type="reset" onClick={''} className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-black-900 rounded-lg group bg-gradient-to-br from-red-400 to-red-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                    <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-white-900 rounded-md group-hover:bg-opacity-0">
                                      Clear
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>

                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-1 border-t border-solid border-blueGray-500 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

      </div>

    </div>

  )
}

export default LoginPage
