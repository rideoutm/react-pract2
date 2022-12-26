import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./components/store";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.ui.cartIsVisible);
  const updateCart = useSelector((state) => state.counter);
  const notification = useSelector((state) => state.ui.notification);

  console.log(notification);
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.setNotification({
          status: "pending",
          title: "sending",
          message: "sending data",
        })
      );
      const response = await fetch("https://meal-app-dc1d9-default-rtdb.firebaseio.com/cart.json", {
        method: "put",
        body: JSON.stringify(updateCart),
      });
      if (!response.ok) {
        throw new Error("Failed");
      }
      dispatch(
        uiActions.setNotification({
          status: "success",
          title: "success!",
          message: "sent data!",
        })
      );

      if (isInitial) {
        isInitial = false;
        return;
      }

      sendCartData().catch((err) =>
        dispatch({
          status: "error",
          title: "Error!",
          message: "Sending data failed.",
        })
      );
    };
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
