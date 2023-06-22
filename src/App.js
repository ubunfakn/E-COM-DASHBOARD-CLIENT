import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer";
import SignUp from "./Components/SignUp";
import PrivateComponent from "./Components/PrivateComponent";
import Login from "./Components/Login";
import AddProduct from "./Components/LoggedIn/AddProduct";
import Products from "./Components/LoggedIn/Products";
import UpdateProduct from "./Components/LoggedIn/UpdateProduct";
import Profile from "./Components/LoggedIn/Profile";
import Page4O4 from "./Components/Page4O4";

function App() {
  // window.onbeforeunload = ()=>{
  //   window.localStorage.removeItem('user');
  // }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path="/user/" element={<Products />} />
            <Route path="/user/add" element={<AddProduct />} />
            <Route path="/user/update/:id" element={<UpdateProduct />} />
            <Route path="/user/profile" element={<Profile />} />
          </Route>
          {/* <Route path="/*" element={<Page4O4 />}/> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
