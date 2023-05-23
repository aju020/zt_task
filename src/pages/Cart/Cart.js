import React, { useContext } from 'react'
import { PRODUCTS } from '../../products'       
import { ShopContext } from '../../context/Context'
import CartItem from './CartItem'
import './Cart.css'
import { useNavigate } from 'react-router-dom'

function Cart() {

        const {cartItems,getTotalCartAmount,updateCartItemCount} =useContext(ShopContext)
        const {totalAmount,discount,discountRule,discountedAmount,shippingFee,finalAmount,giftWrapFee}  = getTotalCartAmount()
        const navigate = useNavigate()

  return (
    <div className='cart'>
        <div >
                <h1>Your Cart</h1>
        </div>
        <div className='cartItems'>
                {PRODUCTS.map((product) =>{
                        const quantity = cartItems[product.id]?.quantity || 0;
                        return quantity > 0 && (
                          <CartItem
                            key={product.id}
                            data={product}
                            quantity={quantity}
                            updateItemCount={updateCartItemCount} />
                        );
                })}
        </div>  
        {totalAmount >0 ? (
        <div className='cartDetails'>
              <div className='checkout'>
                        <p>Subtotal : ${totalAmount}</p>
                        <p>Discount applied : {discountRule}</p>
                        <p>Discout amount : ${discount}</p>
                        
                        <p>Total: ${discountedAmount}</p>
                        <p>Shipping Fee: ${shippingFee}</p>
                        <p>Gift : ${giftWrapFee}</p>
                        <p>Final Amount: ${finalAmount+giftWrapFee }</p>
                        <button onClick={() => navigate("/")}>Home</button>
                        <button>Checkout</button>
                </div> 
                </div>) :(
                <h1>Your Cart is Empty</h1>
                )
        }
        
    </div>
  )
}

export default Cart
