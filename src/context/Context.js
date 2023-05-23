import React, { createContext, useState,useEffect } from 'react';
import { PRODUCTS } from '../products';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 1; index <= PRODUCTS.length; index++) {
    cart[index] ={
        quantity: 0,
        isGift: false,
    };
  }
  return cart;
};

export const ShopContextProvider = (props) => {
        const [cartItems, setCartItems] = useState(getDefaultCart());
        const [isGift, setIsGift] = useState(false);
      
        const addToCart = (itemId, isGift) => {
                setCartItems((prev) => ({
                        ...prev,
                        [itemId]: {
                          quantity: prev[itemId] ? prev[itemId].quantity + 1 : 1,
                          isGift: isGift ? true : false,
                        },
                      }));
                      console.log(cartItems)
         };
              
         const removeFromCart = (itemId) => {
                setCartItems((prev) => {
                  const updatedCartItems = { ...prev };
                  if (updatedCartItems[itemId]) {
                    updatedCartItems[itemId].quantity -= 1;
                    if (updatedCartItems[itemId].quantity === 0) {
                      delete updatedCartItems[itemId];
                    }
                  }
                  console.log(cartItems)
                  return updatedCartItems;

                });
              };
               
      
              const updateCartItemCount = (newAmount, itemId) => {
                setCartItems((prev) => {
                  const updatedCartItems = { ...prev };
                  if (updatedCartItems[itemId]) {
                    updatedCartItems[itemId].quantity = newAmount;
                    if (updatedCartItems[itemId].quantity === 0) {
                      delete updatedCartItems[itemId];
                    }
                  }
                  return updatedCartItems;
                });
              };
              

        const getGiftWrapFee = () => {
                let fee = 0;
                for (const item in cartItems) {
                        if (cartItems[item].isGift) {
                            fee += cartItems[item].quantity;
                        }

                }
                return fee;
              };
              

              const getProductPrice = (itemId) => {
                const itemInfo = PRODUCTS.find((product) => product.id === itemId);
                if (itemInfo && cartItems[itemId]) {
                  const { quantity, isGift } = cartItems[itemId];
                  const price = itemInfo.price;
                  const totalPrice = price * quantity;
                  return totalPrice;
                }
                return 0;
              };
              
      
        const getTotalCartAmount = () => {
          let totalAmount = 0;
          let totalQuantity = 0;
          let maxQuantity = 0;
          let discount = 0;
          let discountRule = null;
          let totalPackages = 0;
         
      
          for (const item in cartItems) {
            if (cartItems[item].quantity > 0) {
              const itemInfo = PRODUCTS.find((product) => product.id === Number(item));
              const { quantity, isGift } = cartItems[item];
              totalAmount += itemInfo.price * quantity;
              totalQuantity += quantity;
      
              if (quantity > maxQuantity) {
                maxQuantity = quantity;
              }
            }
          }
          totalPackages = Math.ceil(totalQuantity / 10);
          const shippingFee = totalPackages * 5;
      
          // Apply discount rules
          if (totalAmount > 200) {
            discount = 10;
            discountRule = 'flat_10_discount';
          }
      
          for (const item in cartItems) {
            if (cartItems[item].quantity > 10) {
              const itemInfo = PRODUCTS.find((product) => product.id === Number(item));
              const itemTotalPrice = itemInfo.price * cartItems[item].quantity;
              const itemDiscount = (itemTotalPrice * 5) / 100;
      
              if (itemDiscount > discount) {
                discount = itemDiscount;
                discountRule = 'bulk_5_discount';
              }
            }
          }
      
          if (totalQuantity > 20) {
            const totalDiscount = (totalAmount * 10) / 100;
      
            if (totalDiscount > discount) {
              discount = totalDiscount;
              discountRule = 'bulk_10_discount';
            }
          }
      
          for (const item in cartItems) {
            if (totalQuantity > 30 &&   maxQuantity > 15 ) {
              const itemInfo = PRODUCTS.find((product) => product.id === Number(item));
              const itemPrice = itemInfo.price;
      
              const discountedQuantity = Math.max(cartItems[item].quantity - 15, 0);
              const itemDiscount = (itemPrice * discountedQuantity * 50) / 100;
              console.log(itemDiscount)
      
              if (itemDiscount > discount) {
                discount = itemDiscount;
                discountRule = 'tiered_50_discount';
              }
            }
          }
      
          // Calculate gift wrap fee
        
          
          // Apply discount and fees to total amount
          const discountedAmount = totalAmount - discount;
          const finalAmount = discountedAmount+shippingFee;
          const giftWrapFee = getGiftWrapFee();

          return {
            totalAmount,
            discountedAmount,
            discount,
            discountRule,
            shippingFee,
            finalAmount,
            giftWrapFee
          };
        };

      
        const contextValue = {
          cartItems,
          addToCart,
          removeFromCart,
          updateCartItemCount,
          getProductPrice,
          getTotalCartAmount,
          isGift,
          setIsGift,
          getGiftWrapFee
        };
      
        return (
          <ShopContext.Provider value={contextValue}>
            {props.children}
          </ShopContext.Provider>
        );
      };
      