import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItemsQuantity } = useContext(ShopContext);
  const cartItemAmount = cartItemsQuantity[id];
  return (
    <div className="product">
      <img src={productImage} alt="" />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
      </button>
    </div>
  );
};
