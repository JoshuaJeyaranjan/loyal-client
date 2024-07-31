import React, { useState } from 'react';
import axios from 'axios';

const AddInventory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [bestseller, setBesteller] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken'); // Replace with actual token retrieval method
      await axios.post(
        'http://localhost:3000/admin/inventory',
        { name, description, regularPrice, salePrice, bestseller },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle success (e.g., reset form, show success message)
    } catch (error) {
      console.error('Error adding inventory item:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Regular Price</label>
        <input type="number" value={regularPrice} onChange={(e) => setRegularPrice(e.target.value)} required />
      </div>
      <div>
        <label>Sale Price</label>
        <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} required />
      </div>
      <div>
        <label>Bestseller</label>
        <input type="checkbox" value={bestseller} onChange={(e) => setBesteller(e.target.value)} required />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddInventory;
