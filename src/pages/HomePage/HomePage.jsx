import React from 'react'
import './HomePage.scss'
import ProductList from '../../components/ProductList/ProductList'
import Nav from '../../components/Nav/Nav'


export default function HomePage() {
  return (
    <div className='home'>
        <Nav/>
        <h1>Home</h1>
        <ProductList/>

    </div>
  )
}
