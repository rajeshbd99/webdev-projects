// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { Tooltip } from 'react-tooltip';

import pic1 from '../../assets/11.jpg';
import pic2 from '../../assets/12.webp';
import pic3 from '../../assets/13.webp';

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "ProSports Hub | Home";
    document.title = pageTitle;
  }, [location]);
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetching products
  useEffect(() => {
    fetch('https://sports-server-ecru.vercel.app/featured-equipments')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Carousel slides
  const slides = [
    {
      title: "Welcome to Sports Store",
      description: "Your one-stop shop for all sports equipment and accessories.",
      image: pic1,
      link: '/all-equipment',
    },
    {
      title: "Premium Quality Sports Gear",
      description: "Find the best quality equipment for your favorite sports.",
      image: pic2,
      link: "/all-equipment",
    },
    {
      title: "Explore the Latest Collection",
      description: "Check out our newest arrivals and exclusive deals.",
      image: pic3,
      link: "/all-equipment",
    },
  ];

  // Carousel navigation handlers
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div>
      {/* Banner/Slider Section */}
      <div className="relative w-full h-[65vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-center justify-center">
              <div className="text-center text-white px-6 py-8">
                <Fade direction="down" duration={1000}>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">
                    {slide.title}
                  </h2>
                </Fade>
                <Fade direction="up" duration={1000}>
                  <p className="text-lg mb-6">{slide.description}</p>
                </Fade>
                <Link
                  to={slide.link}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-[0_0_15px_2px] shadow-purple-400 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_30px_6px] hover:shadow-purple-500"
                >
                  Explore Now
                </Link>

              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-800 to-gray-600 text-white p-3 rounded-full z-20 hover:bg-gray-700"
          aria-label="Previous Slide"
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-800 to-gray-600 text-white p-3 rounded-full z-20 hover:bg-gray-700"
          aria-label="Next Slide"
        >
          ❯
        </button>
      </div>

      {/* Featured Products Section */}
      <div className="my-10 mb-20 px-4">
        <Fade direction="up" duration={1000}>
          <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Featured Products
          </h2>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="transform hover:scale-105 transition-all">
                {/* Card */}
                <div className="card bg-white shadow-lg hover:shadow-2xl rounded-lg overflow-hidden p-4">
                  {/* Product Image */}
                  <figure className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {/* Special Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold py-1 px-3 rounded-md text-sm">
                      New
                    </div>
                  </figure>

                  <div className="mt-4">
                    
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                    
                    <p className="text-xl font-medium text-blue-600 mb-4">${product.price}</p>

                    
                    <Link
                      to={`/equipments/${product._id}`}
                      className="w-full inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600 transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center w-full h-48">
              <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
            </div>
          )}
        </div>
      </div>

      {/* Sports Categories Section */}
      <div className="my-10 mb-20 px-4">
        <Fade direction="up" duration={1000}>
          <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Shop by Sports Categories
          </h2>
        </Fade>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Football', 'Basketball', 'Cricket', 'Tennis'].map((category, index) => (
            <div
              key={index}
              data-tooltip-id={`tooltip-${category}`}
              data-tooltip-content={`Shop for ${category}`}
              className="p-6 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 via-red-500 to-pink-600 text-white rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all"
            >
              {/* Category Name */}
              <h3 className="text-2xl font-bold mb-4">{category}</h3>

              {/* Hover Effect: Animated Icon */}
              <div className="w-16 h-16 rounded-full bg-white text-xl flex items-center justify-center text-black mb-4 transform hover:scale-110 transition-all">
                {/* Icon for each category */}
                {category === 'Football' && '⚽'}
                {category === 'Basketball' && '🏀'}
                {category === 'Cricket' && '🏏'}
                {category === 'Tennis' && '🎾'}
              </div>

              {/* Tooltip and Link */}
              <Link to={`/all-equipment`} className="text-lg font-semibold uppercase hover:underline">
                Explore Now
              </Link>
              <Tooltip id={`tooltip-${category}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Our Services Section */}
      <div className="my-10 mb-20 px-4 py-10 bg-gradient-to-br from-blue-600 via-cyan-500 to-green-500">
        <Fade direction="up" duration={1000}>
          <h2 className="text-4xl font-extrabold text-center mb-14 text-white drop-shadow-lg">
            Our Services
          </h2>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Customization',
              description: 'Unique designs & styles tailored to your needs.',
              icon: '🎨',
            },
            {
              title: 'Fast Delivery',
              description: 'Quick and secure delivery for all your orders.',
              icon: '🚚',
            },
            {
              title: 'Customer Support',
              description: '24/7 assistance for all your queries and concerns.',
              icon: '💬',
            },
          ].map((service, index) => (
            <Fade key={index} direction="up" duration={1000} delay={index * 200}>
              <div className="relative p-6 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition hover:shadow-xl h-[250px] flex flex-col items-center justify-center">
                {/* Animated Icon */}
                <div className="absolute -top-6 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                {/* Card Content */}
                <div className="pt-10 text-center">
                  <h3 className="text-xl font-semibold text-green-700">{service.title}</h3>
                  <p className="mt-3 text-gray-600">{service.description}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
      
      {/* Latest Blogs Section */}
      <div className="my-10 mb-20 px-4">
        <Fade direction="up" duration={1000}>
          <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Latest Blogs
          </h2>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Top 5 Tips for Choosing the Right Sports Equipment',
              summary: 'A detailed guide to selecting the best gear.',
              gradient: 'from-yellow-400 via-red-400 to-pink-500',
            },
            {
              title: 'How to Maintain Your Sports Gear',
              summary: 'Tips for keeping equipment in top condition.',
              gradient: 'from-green-400 to-blue-500',
            },
            {
              title: 'The Benefits of Regular Physical Activity',
              summary: 'How staying active improves health.',
              gradient: 'from-purple-400 via-indigo-400 to-blue-500',
            },
          ].map((blog, index) => (
            <Fade key={index} direction="up" duration={1000} delay={index * 200}>
              <div
                className={`p-6 bg-gradient-to-br ${blog.gradient} shadow-lg rounded-lg transform hover:scale-105 hover:shadow-2xl transition`}
              >
                <h3 className="text-2xl font-extrabold text-white">{blog.title}</h3>
                <p className="text-gray-100 mt-4">{blog.summary}</p>
                <Link
                  to="/all-equipment"
                  className="inline-block mt-6 px-4 py-2 bg-white text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
                >
                  Read More
                </Link>
              </div>
            </Fade>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
