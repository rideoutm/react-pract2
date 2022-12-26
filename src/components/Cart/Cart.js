import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

import { counterActions } from "../store/index";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const initial = useSelector((state) => state.counter.totalQuantity);
  const cartItems = useSelector((state) => state.counter.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{ id: item.id, title: item.name, quantity: item.quantity, total: item.totalPrice, price: item.price }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
