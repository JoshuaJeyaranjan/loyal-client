import React, { useState } from 'react';
import axios from 'axios';

const CreateCollection = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        defaultImage: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            await axios.post('http://localhost:3000/admin/collections', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Handle success, clear form, etc.
        } catch (error) {
            console.error('Error creating collection', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div>
                <label>Default Image</label>
                <input type="text" name="defaultImage" value={formData.defaultImage} onChange={handleChange} />
            </div>
            <button type="submit">Create Collection</button>
        </form>
    );
};

export default CreateCollection;
