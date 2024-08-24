import React from 'react'
import { MdOutlineChevronRight } from "react-icons/md";
import { Link } from 'react-router-dom';
import summar1 from '../../assets/summar1.jpg'
import summar2 from '../../assets/summar2.jpg'

const MostTrending = () => {
  return (
    <div className='w-full'>
      <div className='w-full flex flex-row h-10 pl-10 items-center gap-x-3 font-serif'>
        <Link to='/'>
          Home
        </Link>
        <MdOutlineChevronRight className='h-full flex items-center mt-1' size={17} />
        <h1>
          Most Trending
        </h1>
      </div>
      <h1 className='w-full mt-5 font-semibold font-serif text-2xl pl-12'>Most Trending</h1>
      <div className='p-7'>
        <div className='w-full p-5'>
          <div className="grid lg:grid-cols-4 justify-center gap-x-3">
            <div data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="100"
              data-aos-offset="0">
              <div className="flex flex-col overflow-hidden">
                <a className="relative flex h-96 overflow-hidden" href="#">
                  <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={summar1} alt="product image" />
                  <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={summar2} alt="product image" />
                  <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                </a>
                <div className="mt-4 ">
                  <a href="#">
                    <h5 className="text-sm font-mono font-semibold flex justify-center w-full text-black"> Summer Platinum Cotton Shirt</h5>
                  </a>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p className='w-full flex justify-evenly'>
                      <span className="text-sm text-black font-bold line-through">Rs. 1,470.00</span>
                      <span className="text-sm text-green-700 font-bold text-bleck">Rs. 1,299.00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="200"
              data-aos-offset="0">
              <div className="flex flex-col  overflow-hidden">
                <a className="relative flex h-96 overflow-hidden" href="#">
                  <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={summar1} alt="product image" />
                  <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={summar2} alt="product image" />
                  <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                </a>
                <div className="mt-4 ">
                  <a href="#">
                    <h5 className="text-sm font-mono font-semibold flex justify-center w-full text-black"> Summer Platinum Cotton Shirt</h5>
                  </a>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p className='w-full flex justify-evenly'>
                      <span className="text-sm text-black font-bold line-through">Rs. 1,470.00</span>
                      <span className="text-sm text-green-700 font-bold text-bleck">Rs. 1,299.00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="300"
              data-aos-offset="0">
              <div className="flex flex-col  overflow-hidden">
                <a className="relative flex h-96 overflow-hidden" href="#">
                  <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={summar1} alt="product image" />
                  <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={summar2} alt="product image" />
                  <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                </a>
                <div className="mt-4 ">
                  <a href="#">
                    <h5 className="text-sm font-mono font-semibold flex justify-center w-full text-black"> Summer Platinum Cotton Shirt</h5>
                  </a>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p className='w-full flex justify-evenly'>
                      <span className="text-sm text-black font-bold line-through">Rs. 1,470.00</span>
                      <span className="text-sm text-green-700 font-bold text-bleck">Rs. 1,299.00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="400"
              data-aos-offset="0">
              <div className="flex flex-col overflow-hidden">
                <a className="relative flex h-96 overflow-hidden" href="#">
                  <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={summar1} alt="product image" />
                  <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={summar2} alt="product image" />
                  <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                </a>
                <div className="mt-4 ">
                  <a href="#">
                    <h5 className="text-sm font-mono font-semibold flex justify-center w-full text-black"> Summer Platinum Cotton Shirt</h5>
                  </a>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p className='w-full flex justify-evenly'>
                      <span className="text-sm text-black font-bold line-through">Rs. 1,470.00</span>
                      <span className="text-sm text-green-700 font-bold text-bleck">Rs. 1,299.00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="00"
              data-aos-offset="0">
              <div className="flex flex-col  overflow-hidden">
                <a className="relative  flex h-96 overflow-hidden" href="#">
                  <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={summar1} alt="product image" />
                  <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={summar2} alt="product image" />
                  <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                </a>
                <div className="mt-4 ">
                  <a href="#">
                    <h5 className="text-sm font-mono font-semibold flex justify-center w-full text-black"> Summer Platinum Cotton Shirt</h5>
                  </a>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p className='w-full flex justify-evenly'>
                      <span className="text-sm text-black font-bold line-through">Rs. 1,470.00</span>
                      <span className="text-sm text-green-700 font-bold text-bleck">Rs. 1,299.00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="200"
              data-aos-offset="0">
              <div className="flex flex-col  overflow-hidden">
                <a className="relative flex h-96 overflow-hidden" href="#">
                  <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={summar1} alt="product image" />
                  <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={summar2} alt="product image" />
                  <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                </a>
                <div className="mt-4 ">
                  <a href="#">
                    <h5 className="text-sm font-mono font-semibold flex justify-center w-full text-black"> Summer Platinum Cotton Shirt</h5>
                  </a>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p className='w-full flex justify-evenly'>
                      <span className="text-sm text-black font-bold line-through">Rs. 1,470.00</span>
                      <span className="text-sm text-green-700 font-bold text-bleck">Rs. 1,299.00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MostTrending
