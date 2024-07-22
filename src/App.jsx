import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Properties from './pages/Properties';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserProfile from './pages/user/UserProfile';
import UserDashboard from './pages/dashboard/User';
import AdminDashboard from "./pages/dashboard/Admin";
import { useAuth } from './components/contexts/Auth';
import AdminProduct from "./pages/admin/AdminProduct";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductDetail from "./pages/admin/AdminProductDetail";
import AdminProductUpdate from "./pages/admin/AdminProductUpdate";
import AdminCategory from "./pages/admin/Category";
import AdminOrders from "./pages/admin/AdminOrders";



function App() {
  const { PrivateRoutes, AdminRoutes} = useAuth();

  return (
    <>

      {/* <Properties/> */}
      <Router>
        <Routes>
          <Route path='/' element={<Properties />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoutes />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="user/profile" element={<UserProfile />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoutes />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin-category" element={<AdminCategory />} />
              <Route path="admin-product" element={<AdminProduct />} />
              <Route path="admin-product/detail/:slug" element={<AdminProductDetail />}/>
              <Route path="admin-products" element={<AdminProducts />} />
              <Route path="admin-product/update/:slug" element={<AdminProductUpdate />}/>
              <Route path="admin-orders" element={<AdminOrders/>} />

            </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
