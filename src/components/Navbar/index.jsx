import React from 'react';
import "./Navbar.css";
import { menu } from "../data";
import { Link } from 'react-scroll';
import { FaBarsStaggered, FaCirclePlus } from 'react-icons/fa6';
import { useState } from "react";
import { FaTimes } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/images/Frame 9325.png'
import line from '../../assets/icons/Line 6.png'



const Navbar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("properties");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [count, setCount] = useState(0);

  // Function to handle decreasing the count
  const handleDecrease = () => {
    setCount(prevCount => prevCount - 1);
  };

  // Function to handle increasing the count
  const handleIncrease = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div className="overflow-hidden" style={{backgroundImage: `url('${img}')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '800px'}}>
      <nav className='navbar__container h-[121px] bg-[#1D293F1F]'>
        {showSideBar && <div className='overlay' onClick={() => setShowSideBar(!showSideBar)}></div>}
        
        <NavLink to='/' className='no-underline'>
        <div className="logo__container h-[47.21px]">
          <p className='bg-green-500 rounded-full w-[47.21px] h-[47.21px] text-[23.61px] flex justify-center m-0 items-center font-bold text-white'>BH</p>
          <p className='font-poppins font-medium text-[28.21px] h-full text-white m-0 hidden xl:block'>BetaHouse</p>
        </div>
        </NavLink>

        <div className={`tab__group ${showSideBar ? 'show' : ''}`}>
          <span className="icon__container close__btn" onClick={() => setShowSideBar(!showSideBar)}>
            <FaTimes />
          </span>

          {menu.map((list, index) => (
            <Link
              activeClass='active'
              className={`tab__item name text-white font-outfit no-underline ${activeTab === list.name.toLowerCase() ? 'active' : ''}`}
              to={list.name.toLowerCase()}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              key={index}
              onClick={() => setActiveTab(list.name.toLowerCase())}
            >
              {list.name}
            </Link>
          ))}
        </div>

        <div className="profile">
          <Dropdown>
            <Dropdown.Toggle variant="none" id="dropdown-basic" className='text-white'>
            {auth?.user ? (
                <div className='flex'>
                  <img
                    src={auth.user.image}
                    alt="Profile"
                    className="profile-image"
                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px' }}
                  />
                  <div className="">
                    
                  </div>
                  {auth.user.name}
                </div>
              ) : "My Account"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {!auth.user ? (
                <div className="text-center">
                  <Dropdown.Item className="first-drop">
                    <NavLink className="text-decoration-none" to="/login">Sign in</NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item className="first-drop">
                    <NavLink className="text-decoration-none" to="/signup">Sign Up</NavLink>
                  </Dropdown.Item>
                </div>
              ) : (
                <div className="text-center">
                  <Dropdown.Item className="first-drop">
                    <NavLink className="text-decoration-none" to={
                      auth?.user.role === 1 ? "/dashboard/admin" : "/dashboard/user"
                    }>
                      Dashboard
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item className="first-drop text-danger" onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </div>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <FaBarsStaggered className="menu" onClick={() => setShowSideBar(!showSideBar)} />
      </nav>

      <div className="xl:flex xl:justify-center xl:items-center flex justify-center h-full">
        <div className="w-[80%] h-[404px] flex flex-col gap-[52px]">
          <div className="flex justify-center">
            <div className="h-[217px] w-[85%] flex flex-col gap-[26px]">
              <div className="flex justify-center">
                <h1 className='xl:text-[68px] text-[30px] font-bold font-outfit text-white text-center'>Browse Our Properties</h1>
              </div>
              <div className="xl:h-[84px] flex justify-center items-center">
                <p className='xl:text-[26px] text-[18px] font-outfit text-white text-center'>Find your perfect home among our curated properties. Start browsing now!</p>
              </div>
            </div>
          </div>
          <div className="bg-[#ffffff27] xl:h-[135px] xl:flex xl:justify-center xl:items-center flex flex-col">
            <div className="bg-white xl:h-[85px] w-[95%] xl:flex justify-between items-center rounded-lg m-2">
              <div className="flex flex-col items-center mx-[10px] my-2 xl:mx-[50px]">
                <h3 className='font-outfit text-[14px] font-semibold'>LOCATION</h3>
                <p className='font-outfit text-[15px] text-[#787878]'>e.g Gbagada</p>
              </div>
              <div className="hidden xl:block">
                <img src={line} alt="" />
              </div>
              <div className="flex flex-col items-center mx-[10px] xl:mx-[50px]">
                <h3 className='font-outfit text-[14px] font-semibold'>PROPERTY TYPE</h3>
                <p className='font-outfit text-[15px] text-[#787878]'>e.g Duplex, Bedroom Flat</p>
              </div>
              <div className="hidden xl:block">
                <img src={line} alt="" />
              </div>
              <div className="flex flex-col items-center mx-[10px] my-2 xl:mx-[50px]">
                <h3 className='font-outfit text-[14px] font-semibold'>BEDROOM</h3>
                <div className='flex gap-2 items-center'>
                  <button className='btn btn-outline-dark rounded-circle flex justify-center items-center' 
                  style={{ width: '30px', height: '30px' }}
                  onClick={handleDecrease}>
                  <span className='flex items-center justify-center h-full'>-</span>
                  </button>
                  <span className='mx-2 fw-bold'>{count}</span>
                  <button className='btn btn-outline-dark rounded-circle'
                  style={{ width: '30px', height: '30px' }}
                  onClick={handleIncrease}>
                    <span className='flex items-center justify-center h-full'>+</span>
                  </button>
                </div>
              </div>
              <div className="bg-[#3D9970] h-[85px] w-full xl:w-[230px] cursor-pointer flex flex-col justify-center items-center xl:rounded-r-lg rounded-lg xl:rounded-l-none">
                <h3 className='font-outfit font-medium text-[20px] text-white '>Find Property</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
