import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        <div>
            <div>
                <div className='m-2 p-3 ' >
                    <Link to="/admin-add-project-category" className='m-2 p-3 font-bold border border-cyan-600 rounded-lg'>Add Project and Category</Link>
                </div>
            </div>
            <div className='container w-75 m-auto border border-cyan-600 rounded-lg p-5   '>
                <form onSubmit={handleSubmit} className='m-5 flex flex-col gap-3 justify-center '>
                    <h2 className='flex justify-center text-2xl font-black' >Register User</h2>
                    <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required className='m-2 p-3 border border-cyan-600 rounded-lg' />
                    <input type="text" name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} required className='m-2 p-3 border border-cyan-600 rounded-lg' />
                    <input type="email" name="emailId" placeholder="Email ID" onChange={handleChange} required className='m-2 p-3 border border-cyan-600 rounded-lg' />
                    <input type="text" name="designation" placeholder="Designation" onChange={handleChange} required className='m-2 p-3 border border-cyan-600 rounded-lg' />
                    <input type="text" name="password" placeholder="Password" onChange={handleChange} required className='m-2 p-3 border border-cyan-600 rounded-lg' />
                    <button type="submit" className='m-2 p-3 border border-cyan-600 rounded-lg hover:bg-cyan-100  '>Register</button>
                </form>
            </div>
        </div>
    );
};


export default RegisterUser;