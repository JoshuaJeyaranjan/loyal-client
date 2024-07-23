import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddToCart from '../AddToCart/AddToCart';
import './ProductDetails.scss';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <img src={product.default_image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.regular_price}</p>
      {product.sale_price && <p>Sale Price: ${product.sale_price}</p>}
      <AddToCart product={product} />
    </div>
  );
};

export default ProductDetails;
