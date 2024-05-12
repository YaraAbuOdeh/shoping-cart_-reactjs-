import { useState, createContext,useEffect } from "react";
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
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : getDefaultCart();
  });

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
      totalAmount+=cartItems[item]*itemInfo.price
    }
    return totalAmount;
  }
    const [orderInfo, setOrderInfo] = useState(null);

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
    setCartItems((prevItems) => {
      const updatedCart = { ...prevItems };
      delete updatedCart[id];
      return updatedCart;
    });
  };

   const submitOrder = (formData) => {
     console.log("Submitting order:", formData);
     setOrderInfo(formData);
     setCartItems(getDefaultCart());
  };
  
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);


  const contextValue = {
    cartItems,
    addToCart,
    decreaseItemFromCart,
    updateCartItemCount,
    removeItemFromCart,
    getTotalCartAmount,
    submitOrder,
    orderInfo,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
 