/* eslint-disable no-unused-vars */
import React from "react";
import Blog1 from "../../assets/Blog1.jpg";
import Blog2 from "../../assets/Blog2.jpg";
import Blog3 from "../../assets/Blog3.jpg";
import Blog4 from "../../assets/Blog4.jpg";
import { Link } from "react-router-dom";

const BlogPost = ({ image, title, date, excerpt, link }) => (
  <Link to={link} className="group">
    <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover transition duration-300 ease-in-out group-hover:scale-105"
      />
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
          {title}
        </h2>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-gray-600">{excerpt}</p>
      </div>
    </div>
  </Link>
);

const Blog = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">
          News
        </h1>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <BlogPost
            image={Blog1}
            title="Fashion Tips for Women's Polo T-shirts"
            date="May 30, 2024"
            excerpt="Polo t-shirts women's are timeless wardrobe staples that effortlessly blend comfort with style. Originally designed for sports like tennis and golf, they have transcended their athletic roots to become versatile..."
            link="/fationtips"
          />
          <BlogPost
            image={Blog2}
            title="How to Style Women's Shirts Tips and Tricks"
            date="May 30, 2024"
            excerpt="In the realm of fashion, versatility and comfort are paramount, and what better garment embodies these qualities than the classic shirt? Whether it's for a casual day out, a professional..."
            link="/Howtostylewomen"
          />
          <BlogPost
            image={Blog3}
            title="What looks good with a hoodie"
            date="MAY 11, 2024"
            excerpt="Hoodies are a versatile and comfortable staple in many wardrobes. Whether you're lounging at home, running errands, or hitting the gym, a hoodie made from pure cotton fabric is a..."
            link="/Whatlookgood"
          />
          <BlogPost
            image={Blog4}
            title="Varsity Jackets: Tips To Style Your Varsity Jac..."
            date="MAY 11, 2024"
            excerpt="Varsity jackets, with their rich history rooted in American culture, have become a timeless fashion staple. Originally worn by college and high school students to showcase their athletic achievements, these..."
            link="/varsityjackets"
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
