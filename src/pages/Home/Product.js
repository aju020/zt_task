import React, { useContext } from "react";
import { ShopContext } from "../../context/Context";

export const Product = (props) => {
  const { id, name, price, image } = props.data;
  const { addToCart,cartItems } = useContext(ShopContext);

  const cartItemAmount =cartItems[id] ?cartItems[id].quantity : 0;

  return (
    <div className="product">
      <img src={image} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> ${price}</p>
      </div>
      <button className="addToCartBtn"  onClick={()=>addToCart(id)}>
        Add to cart
        {   cartItemAmount > 0 && <span> ({cartItemAmount})</span>  }
        </button>
    </div>
  );
};