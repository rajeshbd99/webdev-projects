import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopFoodCard from '../../components/TopFoodCard';
import backgroundImage from '../../assets/banner.jpg';
import specialDish1 from '../../assets/extra1.jpg';
import specialDish2 from '../../assets/extra2.jpg';
import specialDish3 from '../../assets/extra3.jpg';
import { Circles } from 'react-loader-spinner';

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "DineFusion | Home";
    document.title = pageTitle;
  }, [location]);
  const [topFoods, setTopFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://restaurants-server-theta.vercel.app/foods');
        const data = await response.json();
        const sortedFoods = data.sort((a, b) => b.purchaseCount - a.purchaseCount);
        setTopFoods(sortedFoods);
      } catch (error) {
        console.error('Error fetching top foods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="">
      {/* Banner Section */}
      <section
        className="relative h-[600px] bg-cover bg-center flex items-center mt-10 mb-10 rounded-2xl"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
        }}
      >
        <div className="container mx-auto px-6 lg:px-12 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-6xl font-extrabold mb-6 leading-tight">
              Welcome to <span className="text-yellow-400">DineFusion</span>
            </h1>
            <p className="text-lg lg:text-xl mb-8">
              Explore a symphony of flavors and indulge in exquisite culinary experiences. Let's make every meal memorable!
            </p>
            <div className="flex justify-center gap-4">
              <NavLink
                to="/foods"
                className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition duration-300"
              >
                Explore All Foods
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Top Foods Section */}
      <section className="py-16 bg-gradient-to-r from-orange-100 via-white to-orange-100 mt-10 mb-10 rounded-2xl">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-extrabold text-slate-800 text-center mb-12">
            Explore Our <span className="text-orange-400">Top Foods</span>
          </h2>
          <p className="text-center text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
            Discover the best dishes curated just for you. Relish the flavors that have won hearts and taste buds alike!
          </p>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                visible={true}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {topFoods.slice(0, 6).map((food) => (
                <TopFoodCard key={food._id} food={food} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <NavLink
              to="/foods"
              className="inline-block px-8 py-4 bg-yellow-600 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-500 hover:shadow-xl transition duration-300"
            >
              Browse All Foods
            </NavLink>
          </div>
        </div>
      </section>

      {/* Chef's Specials Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-100 via-white to-yellow-100 mt-10 mb-10 rounded-2xl">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center text-slate-900 mb-4">
            Chef's <span className="text-yellow-400">Specials</span>
          </h2>
          <p className="text-xl text-center text-slate-600 max-w-4xl mx-auto mb-12">
            Available for a limited time, don't miss the chance to savor these mouthwatering delights!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[specialDish1, specialDish2, specialDish3].map((image, index) => (
              <div
                key={index}
                className="card bg-white border-2 border-yellow-300 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={image}
                  alt={`Special Dish ${index + 1}`}
                  className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Special Dish {index + 1}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    A delightful blend of flavors crafted by our expert chefs.
                  </p>
                  <button
                    className="btn btn-primary px-6 py-2 rounded-full text-white text-sm font-semibold bg-yellow-600 hover:bg-yellow-500 transition-all duration-300"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
