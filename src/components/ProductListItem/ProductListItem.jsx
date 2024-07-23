import React from 'react';
import { Link } from 'react-router-dom';
import AddToCart from '../AddToCart/AddToCart';
import './ProductListItem.scss';

const ProductListItem = ({ product }) => {
 

  return (
    <div className="product-list-item">
      <Link to={`/products/${product.id}`} className="product-link">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>${product.regular_price}</p>
      </Link>
      <AddToCart product={product} />
    </div>
  );
};

export default ProductListItem;








