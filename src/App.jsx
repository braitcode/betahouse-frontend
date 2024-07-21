import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Properties from './pages/Properties';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserProfile from './pages/user/UserProfile';
import UserDashboard from './pages/dashboard/User';
import { useAuth } from './components/contexts/Auth';



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
        </Routes>
      </Router>
    </>
  )
}

export default App
