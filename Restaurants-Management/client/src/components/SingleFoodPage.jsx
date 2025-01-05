import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner'; 

const SingleFoodPage = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "DineFusion | Food";
    document.title = pageTitle;
  }, [location]);
  const { id } = useParams(); 
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(`https://restaurants-server-theta.vercel.app/foods/${id}`, { withCredentials: true }); // Correct URL scheme
        if (!response.ok) {
          throw new Error(`Error fetching food: ${response.statusText}`);
        }
        const data = await response.json();
        setFood(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  const handlePurchase = () => {
    navigate(`/purchase/${id}`); 
  };


  const formatPrice = (price) => {
    return typeof price === 'number' && !isNaN(price) ? price.toFixed(2) : 'N/A';
  };

  if (loading) return <Spinner />; 
  if (error) return <div className="text-center text-xl font-semibold text-red-500">Error: {error}</div>;
  if (!food) return <div className="text-center text-xl font-semibold">Food not found</div>;

  return (
    <div className="py-16 bg-gray-50">
      <section className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12">
        {/* Food Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w- h-80 overflow-hidden rounded-xl shadow-xl transform hover:scale-105 transition-all duration-500">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-40 transition duration-300 ease-in-out"></div>
            <div className="absolute bottom-4 left-4 text-white font-semibold text-xl p-2 bg-black bg-opacity-60 rounded-md">
              <span>{food.name}</span>
            </div>
          </div>
        </div>

        {/* Food Details Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900 hover:text-indigo-600 transition-colors duration-300">{food.name}</h1>
          <p className="text-lg text-gray-700">{food.description}</p>
          <div className="flex items-center gap-4 text-xl font-semibold text-gray-800">
            <span className="text-green-600">Price: ${formatPrice(food.price)}</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-600">Available Quantity: {food.quantity}</span>
          </div>
          <div className="flex items-center gap-4 text-lg text-gray-600">
            <span>Purchase Count: {food.purchaseCount || 0}</span>
          </div>

          {/* Purchase Button */}
          <button
            onClick={handlePurchase}
            className={`px-8 py-4 mt-6 rounded-lg text-white font-bold transition-all duration-300 transform ${food.quantity > 0
              ? 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'} shadow-lg`}
            disabled={food.quantity <= 0}
          >
            {food.quantity > 0 ? 'Purchase Now' : 'Out of Stock'}
          </button>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="container mx-auto px-6 md:px-12 py-12 bg-white rounded-lg shadow-lg mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Details</h2>
        <p className="text-lg text-gray-600">{food.additionalInfo || 'No additional information available.'}</p>
      </section>
    </div>
  );
};

export default SingleFoodPage;
