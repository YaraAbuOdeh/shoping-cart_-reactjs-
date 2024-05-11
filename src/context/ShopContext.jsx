import { useState } from "react";
import { createContext } from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};
export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const decreaseItemFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };
  const removeItemFromCart = (id) => {
      console.log("Removing item from cart with ID:", id);

    setCartItems((prevItems) => {
      const updatedCart = { ...prevItems };
      delete updatedCart[id];
      return updatedCart;
    });
  };

  const contextValue = {
    cartItems,
    addToCart,
    decreaseItemFromCart,
    updateCartItemCount,
    removeItemFromCart,
  };
  console.log(cartItems);
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
