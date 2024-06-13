import  { useState } from 'react';
import axios from 'axios';

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        emailId: '',
        designation: '',
        password: ''
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
        axios.post('http://localhost:3001/api/register', formData)
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                console.error(error);
            });
            
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
            <input type="text" name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} required />
            <input type="email" name="emailId" placeholder="Email ID" onChange={handleChange} required />
            <input type="text" name="designation" placeholder="Designation" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
};


export default RegisterUser;