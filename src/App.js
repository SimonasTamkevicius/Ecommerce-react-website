import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Cart from "./components/Cart";
import NavBar from "./components/NavBar";
import ShopPage from "./components/ShopPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="Cart" element={<Cart />} />
            <Route path="ShopPage" element={<ShopPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
