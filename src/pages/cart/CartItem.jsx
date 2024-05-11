import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Trash } from "phosphor-react";

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const {
    cartItems,
    addToCart,
    decreaseItemFromCart,
    updateCartItemCount,
    removeItemFromCart,
  } = useContext(ShopContext);

  
  return (
    <div className="cartItem">
      <img src={productImage} alt="" />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>${price}</p>
        <div className="countHandler">
          <button onClick={() => decreaseItemFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
      <button className="deleteBtn">
        <Trash onClick={() => removeItemFromCart(id)} size={32} />
      </button>
    </div>
  );
};
