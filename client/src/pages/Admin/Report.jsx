import { useState, useEffect } from 'react';
import axios from 'axios';

const TaskReportDownload = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch users for the dropdown
    axios.get('http://localhost:3001/api/users') // Assuming you have an endpoint to fetch users
      .then(response => {
        setUsers(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  useEffect(() => {
    if (selectedUserId) {   
      
      console.log(selectedUserId) 
      console.log('line numebr 24');
      // Fetch tasks for the selected user
      axios.get(`http://localhost:3001/api/getUserTasks/${selectedUserId}`)
        .then(response => {
          setTasks(response.data);
          console.log(response.data)
        })
        .catch(error => {
          console.error("There was an error fetching the tasks!", error);
        });
    }
  }, [selectedUserId]);

  const handleUserChange = (e) => {
    setSelectedUserId(e.target.value);
  };

  const handleDownload = () => {
    window.location.href = `http://localhost:3001/api/downloadUserTasks/${selectedUserId}`;
  };

  return (
    <div>
      <h1>Admin Report Dashboard</h1>
      <div>
        <label>Select User:</label>
        <select onChange={handleUserChange}>
          <option value="" className='text-orange-900'>Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.full_name}</option>
          ))}
        </select>
      </div>
      <div>
        <h2>Tasks</h2>
        {tasks.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Project or Client Name</th>
                <th>Category</th>
                <th>SubCategory</th>
                <th>Task Description</th>
                <th>Consuming Time (Min)</th>
                <th>Task Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.ProjectOrClientName}</td>
                  <td>{task.Category}</td>
                  <td>{task.SubCategory}</td>
                  <td>{task.TaskDescription}</td>
                  <td>{task.ConsumingTimeInMin}</td>
                  <td>{task.task_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tasks found for the selected user.</p>
        )}
      </div>
      <button onClick={handleDownload} disabled={!selectedUserId}>
        Download Tasks as Excel
      </button>
    </div>
  );
};

export default TaskReportDownload;
