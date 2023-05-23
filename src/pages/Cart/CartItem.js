import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/Context';

function CartItem(props) {
        const { id, name, image } = props.data;
        const {cartItems,addToCart,removeFromCart,updateCartItemCount,getProductPrice,getGiftWrapFee} = useContext(ShopContext)
        const price = getProductPrice(id);
        const item = cartItems[id];
        const [isGift, setIsGift] = useState(item && item.isGift);
        const [giftWrapFee, setGiftWrapFee] = useState(0);
        const calculateGiftWrapFee = () => {
                const fee = getGiftWrapFee(id);
                setGiftWrapFee(fee);
              };
              
              useEffect(() => {
                calculateGiftWrapFee();
              }, [isGift, id, getGiftWrapFee]);
              
              const handleGiftCheckboxChange = () => {
                setIsGift(!isGift);
                calculateGiftWrapFee();
              };
                     
              

  return (
        
    <div className='cartItem'>
        <img className='productImage' src={image}></img>
        <div className='description'>
                <div className='productInfo'>
                        <p className='productName'>{name}</p>
                        <p className='productPrice'>${price}</p>
                </div>
                <div className='countHandler'>
                        <button onClick={()=> removeFromCart(id)}>-</button>
                        <input value={item.quantity || 0} onChange={(e) => updateCartItemCount(Number(e.target.value), id)}></input>
                        <button onClick={()=> addToCart(id,isGift)}>+</button>
                </div>
                <div className="giftOption">
                        <label>
                                <input type="checkbox" checked={isGift} onChange={handleGiftCheckboxChange} />
                                Gift
                        </label>
                </div>
        </div>
    </div>
  )

}

export default CartItem
