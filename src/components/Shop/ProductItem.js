import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../store/index";

const ProductItem = (props) => {
  const { title, price, description, id } = props;

  const dispatch = useDispatch();
  const addItemToCartHandler = () => {
    const newTotalQuantity = dispatch(counterActions.addItemToCart({ id: id, title: title, price: price }));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addItemToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
