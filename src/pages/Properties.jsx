import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import PropertyCards from '../components/PropertyCards'
import Discover from '../components/Discover'
import Footer from '../components/Footer'
// import { Link } from 'react-router-dom'

const Properties = () => {
  return (
    <>
    <Navbar/>
    <PropertyCards/>
    <Discover/>
    <Footer/>
    </>
  )
}

export default Properties