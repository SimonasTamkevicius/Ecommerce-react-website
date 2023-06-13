import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Cart from "./components/Cart";
import NavBar from "./components/NavBar";
import ShopPage from "./components/ShopPage";
import UserProfile from "./components/UserProfile";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="Cart" element={<Cart />} />
            <Route path="ShopPage" element={<ShopPage />} />
            <Route path="UserProfile" element={<UserProfile />} />
            <Route path="About" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
