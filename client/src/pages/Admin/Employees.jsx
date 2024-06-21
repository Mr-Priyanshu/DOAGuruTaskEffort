import { Link } from "react-router-dom";



function EmployeePage() {


  return (
    <>
      <div className="flex m-auto justify-center">
        <div className="EmployeePage container sm:m-5 sm:p-5 flex gap-2 flex-col justify-center mt-16 ">
          <div className='flex justify-start '>
            <span className="m-2 p-3 hover:bg-cyan-100 border border-cyan-600 rounded-lg " >
              <Link to="/registerUser" >Register Employee</Link>
            </span>
          </div>
          <div className="flex ">
            <h1 className="m-auto font-bold ">
              Show User Details
            </h1>
          </div>

          <div className="userTable">

            <div className="relative mx-4 overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray">
                <thead className="text-xs text-white-900 uppercase bg-white dark:bg-gray-700 dark:text-white-400">
                  <tr>
                    <th scope="col" className="px-3 py-2">S.no.</th>
                    <th scope="col" className="px-3 py-2">Employee ID</th>
                    <th scope="col" className="px-3 py-2">Employee Name</th>
                    <th scope="col" className="px-3 py-2">Designation</th>
                    <th scope="col" className="px-3 py-2">Joining Date</th>
                    <th scope="col" className="px-3 py-2">Email ID</th>
                    <th scope="col" className="px-3 py-2">Mobile No.</th>
                    <th scope="col" className="px-3 py-2">Password</th>                
                    <th scope="col" className="px-3 py-2 center">Action</th>
                  </tr>
                </thead>
                <tbody>

                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-3 py-2"></td>
                    <td className="px-3 py-2"></td>
                    <td className="px-3 py-2"></td>
                    <td className="px-3 py-2"></td>
                    <td className="px-3 py-2"></td>
                    <td className="px-3 py-2"></td>
                    <td className="px-3 py-2"></td>
                    <td className="px-3 py-2"></td>
                    <td className="px-3 py-2 flex-wrap">
                      <Link to="#" onClick={() => { }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-1">Edit</Link>
                      <Link to="#" onClick={() => { }} className="font-medium text-red-600 dark:text-red-500 hover:underline px-1">Remove</Link>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

          </div>


        </div>
      </div>
    </>
  );
}
export default EmployeePage;