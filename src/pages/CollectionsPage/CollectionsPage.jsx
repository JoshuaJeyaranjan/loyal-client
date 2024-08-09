// src/components/CollectionPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CollectionPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/collections/${id}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div>
      <h1>Collection Products</h1>
      <div>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.regular_price}</p>
              {/* Add more product details as needed */}
            </div>
          ))
        ) : (
          <p>No products found for this collection.</p>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
