import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Cart from "./components/Cart";
import NavBar from "./components/NavBar";
import ShopPage from "./components/ShopPage";
import UserProfile from "./components/profile/UserProfile";
import About from "./components/About";
import Register from "./components/Register";
import { AuthProvider } from "./utils/AuthContext";
import Context from "./context/Context";
import ProtectedRoutesAdmin from "./utils/ProtectedRoutesAdmin";
import ManageProducts from "./components/ProductManagment/ManageProducts";
import AddProduct from "./components/ProductManagment/AddProduct";
import EditProduct from "./components/ProductManagment/EditProduct";
import SingleProductPage from "./components/ProductDisplay/SingleProductPage";
import ProtectedRoutesUser from "./utils/ProtectedRoutesUser";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Context>
          <div className="App">
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="Cart" element={<Cart />} />
              <Route path="ShopPage" element={<ShopPage />} />
              <Route path="UserProfile" element={<UserProfile />} />
              <Route path="About" element={<About />} />
              <Route path="/Register" element={<Register />} />
              <Route element={<ProtectedRoutesAdmin />}>
                <Route path="/ManageProducts" element={<ManageProducts />} />
                <Route path="/AddProduct" element={<AddProduct />} />
                <Route path="/EditProduct" element={<EditProduct />} />
              </Route>
              <Route element={<ProtectedRoutesUser />}>
              </Route>
              <Route path="/SingleProductPage" element={<SingleProductPage />} />
            </Routes>
          </div>
        </Context>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
