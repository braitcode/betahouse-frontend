import React from 'react'
import location from '../assets/icons/location.png'
import phone from '../assets/icons/phone.png'
import mail from '../assets/icons/mail.png'

const Footer = () => {
  return (
      <div>
          <div className="bg-[#035A33] xl:h-[541px] w-full xl:flex xl:flex-col xl:justify-center xl:items-center xl:gap-[5rem]">
              <div className="w-full flex flex-col items-center gap-[1rem]">
                  <div className="w-[90%] flex flex-col justify-between gap-[6rem] xl:my-0 my-4">
                      <div className="xl:flex xl:flex-row xl:justify-between flex flex-col gap-[15px] md:flex md:flex-row">
                          <div className="xl:w-[373px] w-[300px] flex flex-col justify-between">
                              <div className="flex gap-[15px]">
                                  <p className="bg-green-500 rounded-full w-[47.21px] h-[47.21px] text-[23.61px] flex justify-center items-center font-bold text-white">BH</p>
                                  <p className="font-poppins font-medium text-[28.21px] h-full text-white">BetaHouse</p>
                              </div>
                              <div>
                                  <p className="text-[16px] text-white font-outfit">Discover, rent and find your ideal home hassle-free with BetaHouse. Take control of your rental journey today!</p>
                              </div>
                              <div className="xl:w-[242px] flex flex-col xl:gap-[15px] gap-[10px]">
                                  <p className="text-[15px] text-white font-outfit flex gap-[10px] items-center">
                                      <span><img src={location} alt="" /></span>95 Tinubu Estate, Lekki, Lagos
                                  </p>
                                  <p className="text-[15px] text-white font-outfit flex gap-[10px] items-center">
                                      <span><img src={phone} alt="" /></span>+234 675 8935 675
                                  </p>
                                  <p className="text-[15px] text-white font-outfit flex gap-[10px] items-center">
                                      <span><img src={mail} alt="" /></span>support@rentbetahouse.com
                                  </p>
                              </div>
                          </div>
                          <div className="flex flex-col gap-[20px]">
                              <h2 className="text-[23px] text-white font-outfit font-semibold">Quick Links</h2>
                              <div className="flex flex-col gap-[15px] text-[18px] text-white font-outfit">
                                  <p>Home</p>
                                  <p>Properties</p>
                                  <p>About</p>
                                  <p>Contact Us</p>
                                  <p>Blog</p>
                              </div>
                          </div>
                          <div className="flex flex-col gap-[20px]">
                              <h2 className="text-[23px] text-white font-outfit font-semibold">More</h2>
                              <div className="flex flex-col gap-[15px] text-[18px] text-white font-outfit">
                                  <p>Agents</p>
                                  <p>Affordable Houses</p>
                                  <p>FAQ's</p>
                              </div>
                          </div>
                          <div className="flex flex-col gap-[20px]">
                              <h2 className="text-[23px] text-white font-outfit font-semibold">Popular Search</h2>
                              <div className="flex flex-col gap-[15px] text-[18px] text-white font-outfit">
                                  <p>Apartment for sale</p>
                                  <p>Apartment for rent</p>
                                  <p>3 bedroom flat</p>
                                  <p>Bungalow</p>
                              </div>
                          </div>
                      </div>
                      <div className="border border-[#6F6F6F] w-"></div>
                  </div>
                  <div className="xl:flex xl:justify-between w-full px-[5%]">
                      <p className="text-white">Copyright 2023 Betahouse | Designed by Michael.fig</p>
                      <p className="text-white">Privacy Policy</p>
                  </div>
              </div>
          </div>

      </div>
  )
}

export default Footer