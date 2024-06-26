import { useState } from 'react';

const ProjectAssignmentForm = () => {
  // State variables for selected values
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Dummy data for users, projects, and categories (replace with your actual data)
  const users = [
    { id: 1, name: 'User A' },
    { id: 2, name: 'User B' },
    { id: 3, name: 'User C' }
  ];

  const projects = [
    { id: 1, name: 'Project X' },
    { id: 2, name: 'Project Y' },
    { id: 3, name: 'Project Z' }
  ];

  const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' }
  ];

  // FetchAssign User Details and data 


  const fetchAssignProjectsData = () => {
    axios.get('http://localhost:3001/api/assignProject')
        .then(response => {
            
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
};

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with:', selectedUser, selectedProject, selectedCategory);
    // Perform API call or further processing here
  };
  

  return (
    <div className="max-w-md mx-auto mt-8 border rounded-xl shadow-xl p-9 border-cyan-600 m-5 " >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User Select */}
        <div>
          <label htmlFor="user" className="block text-sm font-medium text-gray-700">Select User</label>
          <select
            id="user"
            name="user"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="mt-1 block w-full py-1 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2 border-cyan-600 "
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        {/* Project Select */}
        <div>
          <label htmlFor="project" className="block text-sm font-medium text-gray-700">Select Project</label>
          <select
            id="project"
            name="project"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="mt-1 block w-full py-1 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2 border-cyan-600"
          >
            <option value="">Select Project</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>

        {/* Category Select */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Select Category</label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full py-1 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2 border-cyan-600"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-white border-2 border-cyan-600  hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-black "
          >
            Assign Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectAssignmentForm;
