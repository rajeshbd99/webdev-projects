import { NavLink } from 'react-router-dom';

const TopFoodCard = ({ food }) => {
  const { name, image, price, purchaseCount, _id } = food;

  return (
    <div className="card bg-gradient-to-r from-white to-gray-100 shadow-lg hover:shadow-2xl border rounded-xl overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 left-2 bg-yellow-400 text-black text-sm font-semibold px-3 py-1 rounded-full">
          Top Pick
        </span>
      </div>
      <div className="card-body p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Food Name */}
        <h2 className="text-xl font-extrabold mb-3 text-gray-900">{name}</h2>

        {/* Price and Purchases */}
        <p className="text-md text-gray-700 mb-2">
          <span className="font-semibold text-gray-800">Price:</span>
          <span className="text-green-600 font-bold ml-1">${price.toFixed(2)}</span>
        </p>
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-medium text-gray-700">Total Purchases:</span>
          <span className="text-blue-600 ml-1">{purchaseCount}</span>
        </p>

        {/* Call-to-Action and Notice */}
        <div className="flex justify-between items-center mt-4">
          <NavLink
            to={`/foods/${_id}`}
            className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full shadow hover:from-yellow-300 hover:to-yellow-400 transition duration-300"
          >
            View Details
          </NavLink>
          <span className="text-sm text-slate-500 italic">
            Limited Stock Available
          </span>
        </div>
      </div>

    </div>
  );
};

export default TopFoodCard;
