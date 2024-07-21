import React from 'react';
import semiduplex from '../assets/images/semiduplex.png';
import specialduplex from '../assets/images/specialduplex.png';
import splithouse from '../assets/images/splithouse.png';
import twinduplex from '../assets/images/twinduplex.png';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

const Discover = () => {
  return (
      <div>
          <div className="xl:h-[650px] w-full flex justify-center items-center">
              <div className="flex flex-col w-[90%] xl:h-[538px] gap-[72px] my-4">
                  <div className="flex justify-center items-center h-[54px]">
                      <h1 className='xl:text-[50px] text-[30px] font-semibold font-outfit xl:font-medium'>Discover Our Popular Properties</h1>
                  </div>
                  <div className="flex items-center justify-center overflow-x-auto">
                      <div className="hidden xl:block bg-[#F4F4F4] h-[54px] w-[54px] xl:flex xl:justify-center xl:items-center rounded-full cursor-pointer">
                          <FaArrowLeftLong className='w-[22px] h-[26px]' />
                      </div>
                      <div className="xl:flex xl:flex-row xl:gap-[23px] xl:px-4 flex flex-col gap-[15px]">
                          <img src={semiduplex} alt="" className='shadow-lg xl:w-[240px] w-[340px] object-cover' />
                          <img src={specialduplex} alt="" className='shadow-lg xl:w-[240px] w-[340px] object-cover' />
                          <img src={splithouse} alt="" className='shadow-lg xl:w-[240px] w-[340px] object-cover' />
                          <img src={twinduplex} alt="" className='shadow-lg xl:w-[240px] w-[340px] object-cover' />
                      </div>
                      <div className="hidden xl:block bg-[#3D9970] h-[54px] w-[54px] xl:flex xl:justify-center xl:items-center rounded-full cursor-pointer">
                          <FaArrowRightLong className='w-[22px] h-[26px]' />
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Discover;
