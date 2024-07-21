import React from 'react'
import { data } from '../components/DB/data'
import filter from '../assets/icons/filter.png'
import locationIcon from '../assets/icons/location.png'
import bedroomIcon from '../assets/icons/bedroom.png'
import bathroomIcon from '../assets/icons/bathroom.png'
import purchase from '../assets/icons/purchase.png'
import share from '../assets/icons/share.png'
import love from '../assets/icons/love.png'
import arrowleft from '../assets/icons/arrowleft.png'
import arrowright from '../assets/icons/arrowright.png'
import arrowdown from '../assets/icons/arrowdown.png'
import Pagination from 'react-bootstrap/Pagination';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa6'

let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

const PropertyCards = () => {
  return (
    <div>
        <div className="overflow-hidden bg-white h-full w-full flex justify-center items-center">
  <div className="w-[85%] my-[40px]">
    <div className="flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="flex flex-row items-center gap-[20px]">
          <img src={filter} alt="" className='w-[18.9px] h-[18.9px]' />
          <p className='text-[21px] font-outfit'>More Filter</p>
          <p className='text-[21px] font-outfit'>Showing 1 - 10 of 15 results</p>
        </div>
        <div className="">
          <p className='flex items-center gap-[20px]'>Sort by: Default <span><img src={arrowdown} alt="" /></span></p>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap py-4 mx-auto gap-[60px] justify-center">
      {data.map((card) => (
        <div key={card.id} className="w-full sm:w-[calc(50%-30px)] lg:w-[calc(33.333%-40px)] mb-8">
          <div className="rounded-lg  shadow-lg bg-white w-[350px]">
            <div className="rounded-t-lg flex flex-col gap-36 bg-black" style={{backgroundImage: `url('${card.img}')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height:'297px'}}>
                <div className="flex justify-between p-4">
                    <div className="h-[36.19px] w-[96.49px] bg-[#3D9970] flex items-center justify-center rounded-md ">
                        <p className='text-[13px] text-white font-medium font-outfit m-0'>{card.featured}</p>
                    </div>
                    <div className="h-[36.19px] w-[96.49px] bg-[#D3D3D3B2] flex justify-center items-center rounded-md ">
                        <p className='text-[13px] text-white font-medium font-outfit m-0'>{card.saleRent}</p>
                    </div>
                </div>
                    <div className="flex justify-end gap-6 p-4">
                        <img src={card.link} alt="" className='w-[41.35px] h-[41.35px]' />
                        <img src={card.video} alt="" className='w-[41.35px] h-[41.35px]' />
                        <img src={card.picture} alt="" className='w-[41.35px] h-[41.35px]' />
                    </div>
            </div>
            {/* <img src={card.img} alt="" className='rounded-t-lg' /> */}
            <div className="p-4 flex flex-col gap-[32px]">
              <div className="flex flex-col">
                <h2 className='text-[20px] font-semibold font-outfit'>{card.name}</h2>
                <p className='flex items-center gap-[10px] text-[14px] font-outfit'><span><img src={locationIcon} alt="" /></span>{card.location}</p>
              </div>
              <div className="flex gap-[28px]">
                <p className='flex items-center gap-[10px] text-[16px] font-outfit'><span><img src={bedroomIcon} alt="" /></span>{card.bedrooms}</p>
                <p className='flex items-center gap-[10px]'><span><img src={bathroomIcon} alt="" /></span>{card.bathrooms}</p>
              </div>
              <div className="border border-grey"></div>
              <div className="flex justify-between items-center ">
                <h2 className='font-outfit text-[22px] my-2 font-semibold'>{card.price}</h2>
                <div className="flex gap-[20.84px]">
                  <img src={purchase} alt="" className='w-[18px] h-[18px]' />
                  <img src={share} alt="" className='w-[18px] h-[18px]' />
                  <img src={love} alt="" className='w-[18px] h-[18px]' />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center">
      <div className="w-[271.22px] h-[33.56px]">
        <div className="flex justify-between items-center">
          <img src={arrowleft} alt="" className='w-[20.33px] h-[25.79px]' />
          <p className='text-[25.17px] font-medium font-outfit bg-[#3D9970] w-[32px] h-[32px] flex justify-center items-center rounded-md text-white'>1</p>
          <p className='text-[25.17px] font-medium font-outfit'>2</p>
          <p className='text-[25.17px] font-medium font-outfit'>3</p>
          <p className='text-[25.17px] font-medium font-outfit'>4</p>
          <img src={arrowright} alt="" className='w-[20.33px] h-[25.79px]' />
        </div>
      </div>
    </div>
    {/* <div className='flex items-center justify-center'>
    <FaLessThan/>
    <Pagination>{items}</Pagination>
    <br />
    <FaGreaterThan />
  </div> */}
  </div>
</div>

    </div>
  );
};

export default PropertyCards