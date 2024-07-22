import React from 'react';
import { Link } from 'react-router-dom';
import './ProductListItem.scss';

const ProductListItem = ({ product }) => {
  return (
    <div className="product-list-item">
      <Link to={`/product/${product.id}`}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>${product.regular_price}</p>
        {product.sale_price && <p>Sale: ${product.sale_price}</p>}
      </Link>
    </div>
  );
};

export default ProductListItem;
