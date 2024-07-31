import React from 'react'
import { Link } from 'react-router-dom'
import AddToCart from '../AddToCart/AddToCart'

export default function BestSellersItem( {bestseller} ) {
  return (
    <div className="bestseller-list-item">
    <Link to={`/products/${bestseller.id}`} className="product-link">
      <h2>{bestseller.name}</h2>
      <p>{bestseller.description}</p>
      <p>${bestseller.regular_price}</p>
    </Link>
    <AddToCart product={bestseller} />
  </div>
  )
}
