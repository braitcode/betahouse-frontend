import React from 'react'
import "./Navbar.css"
import { menu } from "../data"
import { Link, animateScroll as scroll } from 'react-scroll';
import { FaBarsStaggered } from'react-icons/fa6'
import { useState } from "react";
import { FaTimes } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
// import aisha from '../../assets/images/Ellipse 8.jpg'
import img from '../../assets/images/Frame 9325.png'
import line from '../../assets/icons/Line 6.png'
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';
// import aisha from '../../assets/images/Ellipse 8.jpg'


const Navbar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="overflow-hidden" style={{backgroundImage: `url('${img}')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '800px'}}>
      <nav className='navbar__container h-[121px] bg-[#1D293F1F]'>
        {showSideBar && <div className='overlay' onClick={() => setShowSideBar(!showSideBar)}></div>}
        
        <div className="logo__container h-[47.21px]">
          <p className='bg-green-500 rounded-full w-[47.21px] h-[47.21px] text-[23.61px] flex justify-center m-0 items-center font-bold text-white'>BH</p>
          <p className='font-poppins font-medium text-[28.21px] h-full text-white m-0 hidden xl:block'>BetaHouse</p>
        </div>

        <div className={`tab__group ${showSideBar ? 'show' : ''}`}>
          <span className="icon__container close__btn" onClick={() => setShowSideBar(!showSideBar)}>
            <FaTimes />
          </span>

          

          {/* <ul className='flex justify-evenly text-[20px] text-white w-[490px]'>
            <li>Home</li>
            <li>Properties</li>
            <li>About Us</li>
            <li>Blog</li>
            <li>Contact Us</li>
          </ul> */}
          {menu.map((list, index) => (
            <Link
              activeClass='active'
              className='tab__item name text-white font-outfit no-underline'
              to={list.name.toLowerCase()}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              key={index}
            >
              {list.name}
            </Link>
          ))}

          
        </div>

        <div className="profile">
              <div className="pro-img">
                {/* <img src={aisha} alt="" /> */}
              </div>
              <div className="select-container">
                <Dropdown>
                  <Dropdown.Toggle variant="none" id="dropdown-basic" className='text-white'>
                    {auth?.user ? auth.user.name : "My Account"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {!auth.user ? (
                      <div className="text-center">
                        <Dropdown.Item  className="first-drop">
                        <NavLink className="text-decoration-none" to="/login">Login</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item  className="first-drop">
                          <NavLink className=" text-decoration-none" to="/signup">Sign Up</NavLink>
                        </Dropdown.Item>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Dropdown.Item
                          className="first-drop"
                        >
                          <NavLink className=" text-decoration-none" to={
                            auth?.user.role === 1
                              ? "/dashboard/admin"
                              : "/dashboard/user"
                          }>
                            Dashboard
                          </NavLink>
                          
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="first-drop text-danger"
                          onClick={handleLogout}
                        >
                          Logout
                        </Dropdown.Item>
                      </div>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              </div>

        {/* <Dropdown className=''>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
          {auth?.user ? auth.user.name : "My Account"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {!auth.user ? (
              <>
                 <Dropdown.Item as={NavLink} to='/signup'>
                  Sign Up
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to='/login'>
                  Login
                </Dropdown.Item>
              </>
            ) : (
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown> */}

        <div className="nav__buttons__group">
          {/* {auth.user ? (
            <div className="profile flex items-center gap-[17px]">
              <img src={auth.user.profilePicture} alt={auth.user.name} className="rounded-full w-10 h-10" />
              <p className='text-[26px] font-medium font-outfit text-white'>{auth.user.name}</p>
            </div>
          ) : (
            <div className="profile flex items-center gap-[17px]">
              <p className='text-[26px] font-medium font-outfit text-white'></p>
            </div>
          )} */}
          <FaBarsStaggered className="menu" onClick={() => setShowSideBar(!showSideBar)} />
        </div>
      </nav>
    
      <div className="flex justify-center items-center h-full">

        <div className=" w-[80%] h-[404px] flex flex-col gap-[52px]">
          <div className="flex justify-center">
            <div className="h-[217px] w-[85%] flex flex-col gap-[26px]">
              <div className="flex justify-center">

              <h1 className='xl:text-[68px] text-[30px] font-bold font-outfit text-white'>Browse Our Properties</h1>
              </div>
              <div className="xl:h-[84px] flex justify-center items-center">

              <p className='xl:text-[26px] font-outfit text-white '>Find your perfect home among our curated properties. Start browsing now!</p>
              </div>
            </div>

          </div>
          <div className="bg-[#ffffff27] xl:h-[135px] xl:flex xl:justify-center xl:items-center flex flex-col">
            <div className="bg-white xl:h-[85px] w-[95%] xl:flex justify-between items-center rounded-lg">
              <div className="flex flex-col mx-[50px]">
                <h3 className='font-outfit text-[14px] font-semibold'>LOCATION</h3>
                <p className='font-outfit text-[15px] text-[#787878]'>e.g Gbagada</p>
              </div>
              <div className="">
                <img src={line} alt="" />
              </div>
              <div className="flex flex-col items-center">
              <h3 className='font-outfit text-[14px] font-semibold'>PROPERTY TYPE</h3>
              <p className='font-outfit text-[15px] text-[#787878]'>e.g Duplex, Bedroom Flat</p>
              </div>
              <div className="">
                <img src={line} alt="" />
              </div>
              <div className="flex flex-col items-center">
              <h3 className='font-outfit text-[14px] font-semibold'>BEDROOM</h3>
              <p className='font-outfit text-[15px] text-[#787878]'>e.g Gbagada</p>
              </div>
              <div className="bg-[#3D9970] h-[85px] w-[230px] flex flex-col justify-center items-center rounded-r-lg">
                <h3 className='font-outfit font-medium text-[20px] text-white '>Find Property</h3>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar