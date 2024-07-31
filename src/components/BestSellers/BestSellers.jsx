import React , {useEffect, useState} from 'react'
import BestSellersItem from '../BestSellersItem/BestSellersItem'
import axios from 'axios'

export default function BestSellers() {

    const [bestsellers, setBestsellers] = useState([]);

    useEffect(() => {
      const fetchBestsellers = async () => {
        try {
          const response = await axios.get('http://localhost:3000/products/bestsellers');
          setBestsellers(response.data);
        
        } catch (error) {
          console.error('Error fetching bestsellers:', error);
        }
      };
  
      fetchBestsellers();
    }, []);

  return (
    <div className="bestseller-list">
        <h1>BESTSELLERS</h1>
    {bestsellers.map((bestseller) => (
      <BestSellersItem key={bestseller.id} bestseller={bestseller} />
    ))}
  </div>
  )
}
