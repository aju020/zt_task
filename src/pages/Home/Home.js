import React from 'react'
import {PRODUCTS} from '../../products'
import {Product} from "./Product"
import "./Home.css"

const Home = () => {
        return (
                <div className='home'>
                    <div className='homeTitle'>
                            <h1>Program</h1>
                    </div>
                    <div className='products'>
                            {PRODUCTS.map((prod) =>(
                                    <Product data={prod } />
                            )) }
                    </div>
                </div>
              )
}

export default Home;
