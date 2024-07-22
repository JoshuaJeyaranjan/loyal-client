import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductListItem from '../ProductListItem/ProductListItem';
import './ProductList.scss';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Get the token from session storage
        const response = await axios.get('http://localhost:3000/products', {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the headers
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
