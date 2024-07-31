import React from 'react'
import './HomePage.scss'
import ProductList from '../../components/ProductList/ProductList'
import Nav from '../../components/Nav/Nav'
import ShippingBanner from '../../components/ShippingBanner/ShippingBanner'
import BestSellers from '../../components/BestSellers/BestSellers'


export default function HomePage() {
  return (
    <div className='home'>
      <ShippingBanner/>
        <Nav/>
        <h1>Home</h1>

        <BestSellers/>

        <ProductList/>

    </div>
  )
}
