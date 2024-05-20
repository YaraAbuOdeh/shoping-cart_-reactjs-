import { useContext,useState } from "react";
import { PRODUCTS } from "../../products";
import { ShopContext } from "../../context/ShopContext";
import { CartItem } from "./CartItem";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { CheckoutForm } from "./CheckoutForm";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, submitOrder } =
    useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

   const handleCheckout = (formData) => {
     submitOrder(formData);
     setShowCheckoutForm(false);
     navigate("/");
   };

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] > 0) {
            return <CartItem data={product} />;
          }
          return null;
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          {showCheckoutForm ? (
            <CheckoutForm onCheckout={handleCheckout} />
          ) : (
            <>
              <p>Subtotal: ${totalAmount}</p>
              <button onClick={() => navigate("/")}>Continue Shopping</button>
              <button onClick={() => setShowCheckoutForm(true)}>
                Checkout
              </button>
            </>
          )}
        </div>
      ) : (
        <h1>Your Cart is Empty</h1>
      )}
    </div>
  );
};
