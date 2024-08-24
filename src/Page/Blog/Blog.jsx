import React from 'react'
import Blog1 from '../../assets/Blog1.jpg'
import Blog2 from '../../assets/Blog2.jpg'
import Blog3 from '../../assets/Blog3.jpg'
import Blog4 from '../../assets/Blog4.jpg'
import { Link } from 'react-router-dom'


const Blog = () => {
  return (
    <div className='w-full  flex  justify-center'>
      <div className='w-[90%]'>
        <h1 className='pt-5 mb-10 flex justify-start font-monserrat text-4xl font-mono'>
          News
        </h1>
        <div data-aos="fade-up"
          data-aos-duration="1000">
          <div className='w-full grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2'>
            <Link to='/fationtips'>
              <img src={Blog1} alt="" className='transition duration-300 ease-in-out hover:scale-105' />
              <h1 className='text-xl  font-semibold font-monserrat mt-4 mb-4'>Fashion Tips for Women's Polo T-shirts</h1>
              <h1 className='text-sm font-poppins mb-4'>May 30,2024</h1>
              <p className='text-md font-poppins mb-4'>Polo t-shirts women's are timeless wardrobe staples that effortlessly blend comfort with style. Originally designed for sports like tennis and golf, they have transcended their athletic roots to become versatile...</p>
            </Link>
            <Link to='/Howtostylewomen'>
              <img src={Blog2} alt="" className='transition duration-300 ease-in-out hover:scale-105' />
              <h1 className='text-xl font-monserrat font-semibold mt-4 mb-4'>How to Style Women's Shirts Tips and Tricks</h1>
              <h1 className='text-sm font-poppins mb-4'>May 30,2024</h1>
              <p className='text-md font-poppins mb-4'>In the realm of fashion, versatility and comfort are paramount, and what better garment embodies these qualities than the classic shirt? Whether it's for a casual day out, a professional...</p>
            </Link>
            <Link to='/Whatlookgood'>
              <img src={Blog3} alt="" className='transition duration-300 ease-in-out hover:scale-105' />
              <h1 className='text-xl font-monserrat font-semibold mt-4 mb-4'>What looks good with a hoodie</h1>
              <h1 className='text-sm font-poppins mb-4'>MAY 11, 2024</h1>
              <p className='text-md font-poppins mb-4'>Hoodies are a versatile and comfortable staple in many wardrobes. Whether you're lounging at home, running errands, or hitting the gym, a hoodie made from pure cotton fabric is a...</p>
            </Link>
            <Link to='/varsityjackets'>
              <img src={Blog4} alt="" className='transition duration-300 ease-in-out hover:scale-105' />
              <h1 className='text-xl font-monserrat font-semibold mt-4 mb-4'>Varsity Jackets: Tips To Style Your Varsity Jac...</h1>
              <h1 className='text-sm font-poppins mb-4'>MAY 11, 2024</h1>
              <p className='text-md font-poppins mb-4'>Varsity jackets, with their rich history rooted in American culture, have become a timeless fashion staple. Originally worn by college and high school students to showcase their athletic achievements, these...</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
