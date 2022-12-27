import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { sendCardData, uiActions } from "./components/store";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.ui.cartIsVisible);
  const updateCart = useSelector((state) => state.counter);
  const notification = useSelector((state) => state.ui.notification);

  console.log(notification);
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCardData(cart));
  }, [updateCart, dispatch]);
  return (
    <>
      {notification && (
        <Notification status={notification.status} title={notification.title} message={notification.message} />
      )}
      <Layout>
        {cart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
