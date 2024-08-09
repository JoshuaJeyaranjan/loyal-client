import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignProductsToCollection = () => {
    const [collections, setCollections] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        // Fetch collections
        const fetchCollections = async () => {
            try {
                const response = await axios.get('http://localhost:3000/collections');
                setCollections(response.data);
            } catch (error) {
                console.error('Error fetching collections', error);
            }
        };

        // Fetch products
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchCollections();
        fetchProducts();
    }, []);

    const handleCollectionChange = (e) => {
        setSelectedCollection(e.target.value);
    };

    const handleProductChange = (e) => {
        const value = parseInt(e.target.value, 10); // Ensure the value is a number
        setSelectedProducts(prev =>
            prev.includes(value)
                ? prev.filter(productId => productId !== value)
                : [...prev, value]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            await axios.post(`http://localhost:3000/admin/collections/${selectedCollection}/products`, { productIds: selectedProducts }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Handle success, clear form, etc.
        } catch (error) {
            console.error('Error assigning products', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Select Collection</label>
                <select value={selectedCollection} onChange={handleCollectionChange}>
                    <option value="">Select a collection</option>
                    {collections.map(collection => (
                        <option key={collection.id} value={collection.id}>{collection.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Select Products</label>
                {products.map(product => (
                    <div key={product.id}>
                        <input
                            type="checkbox"
                            value={product.id}
                            onChange={handleProductChange}
                            checked={selectedProducts.includes(product.id)}
                        />
                        {product.name}
                    </div>
                ))}
            </div>
            <button type="submit">Assign Products</button>
        </form>
    );
};

export default AssignProductsToCollection;
