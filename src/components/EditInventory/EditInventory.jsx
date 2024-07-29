import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditInventory = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    regularPrice: '',
    salePrice: '',
  })

  useEffect (() => {
    const fetchItem = async () => {
        try {
            const token = localStorage.getItem('authToken')
            const response = await axios.get(`http://localhost:3000/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const {name, description, regular_price, sale_price} = response.data
            setFormData({ name, description, regularPrice: regular_price, salePrice: sale_price })
            
        } catch (error) {
            console.error('Error fetching item:', error)
        }
    }
    fetchItem();
  }, [id])

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('authToken')
        await axios.put(`http://localhost:3000/admin/inventory/${id}`, formData, {
            headers: {
                Authorization: `Bearer: ${token}`
            }
        })
        navigate('/admin')
        
    } catch (error) {
        console.error('Error updating Item', error)
    }
    // Handle success/error
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor=""> Name  </label>
        <input type="text" name='name' value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor=""> Description </label>
        <input type="text" name='description' value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor=""> Regular Price </label>
        <input type="number" name='regularPrice' value={formData.regularPrice} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor=""> Sale Price </label>
        <input type="number" name='salePrice' value={formData.salePrice} onChange={handleChange} required />
      </div>
      <button type='submit'> Update Item </button>
    </form>
  );
};

export default EditInventory;
