import React, { useState } from 'react';
import axios from 'axios';


const categories = {
    development: [
      { id: 1, name: 'Front End Development' },
      { id: 2, name: 'Mobile Development' },
      { id: 3, name: 'Back End Development' },
      { id: 4, name: 'Testing' },
      { id: 5, name: 'Figma Design' },
      { id: 6, name: 'Code Manage and Update' },
    ],
    digitalMarketing: [
      { id: 7, name: 'SEO' },
      { id: 8, name: 'Content Marketing' },
      { id: 9, name: 'Social Media' },
      { id: 10, name: 'SEO' },
    ]
  };
  

function AddProjectandCategory() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [availableSubcategories, setAvailableSubcategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    
    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
        let updatedCategories = [...selectedCategories];
      
        if (checked && !updatedCategories.includes(value)) {
          updatedCategories.push(value);
        } else {
          updatedCategories = updatedCategories.filter(category => category !== value);
        }
      
        setSelectedCategories(updatedCategories);
      
        const updatedAvailableSubcategories = updatedCategories.flatMap(category => {
          return categories[category];
        });
      
        setAvailableSubcategories(updatedAvailableSubcategories);
      
        const updatedSelectedSubcategories = selectedSubcategories.filter(subcategory => updatedAvailableSubcategories.some(sub => sub.id === subcategory));
        setSelectedSubcategories(updatedSelectedSubcategories);
      };

      const handleSubcategoryChange = (event) => {
        const { name, checked } = event.target;
        console.log(checked);
        if (checked) {
          setSelectedSubcategories(prevSelected => [...prevSelected, name]);
        } else {
          setSelectedSubcategories(prevSelected => prevSelected.filter(subcategory => subcategory !== name));
        }
      };
      
      const handleSubmit = (event) => {
        event.preventDefault();
        const projectName = event.target.elements['small-input'].value;
        console.log('Project Name:', projectName);
        console.log('Selected Category IDs:', selectedCategories);
        console.log('Selected Subcategory IDs:', selectedSubcategories);
        
        const data = {project: projectName, category: selectedCategories, subcategory: selectedSubcategories};
        axios.post('http://localhost:3001/api/add-option', data)
            .then((res) => {
                console.log(res.data);
                alert('Successful Add');
            })
            .catch((err) => console.log(err))
            
      };
      
      
    return (
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Project Name/ Client Name
          </label>
          <input
            type="text"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-white-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <fieldset>
            <legend className="block mb-2 text-sm font-medium text-black">Category</legend>
            {Object.keys(categories).map((categoryKey, index) => (
                <div key={index} className="flex items-center mb-4">
                    <input
                    id={`category-${index}`}
                    type="checkbox"
                    value={categoryKey}
                    checked={selectedCategories.includes(categoryKey)}
                    onChange={handleCategoryChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`category-${index}`} className="ms-2 text-sm font-medium text-black">
                    {categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}
                    </label>
                </div>
                ))}
          </fieldset>
        </div>
        {selectedCategories.length > 0 && (
            <fieldset className="mb-4">
                <legend className="block mb-2 text-sm font-medium text-black">Sub Category</legend>
                {availableSubcategories.map((subcategory, index) => (
            <div key={index} className="flex items-center mb-4">
                <input
                id={`subcategory-${index}`}
                type="checkbox"
                value={subcategory.name}
                checked={selectedSubcategories.includes(subcategory.id)}
                onChange={handleSubcategoryChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`subcategory-${index}`} className="ms-2 text-sm font-medium text-black">
                {subcategory.name}
                </label>
            </div>
            ))}
            </fieldset>
            )}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    );
}

export default AddProjectandCategory;
