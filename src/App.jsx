import styles from "./app.module.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import OrderDetails from "./components/OrderDetails/OrderDetails";

function App() {
  return (
    <div className={styles.container}>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:category" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-details" element={<OrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
