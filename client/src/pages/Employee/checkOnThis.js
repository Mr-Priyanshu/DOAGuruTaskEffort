import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
    const [formData, setFormData] = useState({
        id: '',
        ProjectOrClientName: '',
        Category: '',
        SubCategory: '',
        TaskDescription: '',
        ConsumingTimeInMin: '',
        TotalConsumingTime: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/add-data', formData)
            .then(response => {
                alert('Data saved successfully');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="id" value={formData.id} onChange={handleChange} placeholder="ID" />
            
            <select name="ProjectOrClientName" value={formData.ProjectOrClientName} onChange={handleChange}>
                <option value="">Select Project or Client</option>
                <option value="LARI">LARI</option>
                <!-- Add more options as needed -->
            </select>
            
            <select name="Category" value={formData.Category} onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="Developer">Developer</option>ye
                <!-- Add more options as needed -->
            </select>
            
            <select name="SubCategory" value={formData.SubCategory} onChange={handleChange}>
                <option value="">Select SubCategory</option>
                <option value="API">API</option>
                <!-- Add more options as needed -->
            </select>
            
            <textarea name="TaskDescription" value={formData.TaskDescription} onChange={handleChange} placeholder="Task Description"></textarea>
            <input name="ConsumingTimeInMin" value={formData.ConsumingTimeInMin} onChange={handleChange} placeholder="Consuming Time In Min" />
            <input name="TotalConsumingTime" value={formData.TotalConsumingTime} onChange={handleChange} placeholder="Total Consuming Time" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormComponent;
