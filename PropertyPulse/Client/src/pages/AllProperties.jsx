import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MdVerified, MdStar } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import { HiOutlineInformationCircle, HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineSearch, HiOutlineFilter, HiOutlineChevronDown } from "react-icons/hi";


const AllProperties = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "PropertyPulse | All Properties";
    document.title = pageTitle;
  }, [location]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const { user } = useContext(AuthContext);

  const { data: properties = [], isLoading, refetch } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await axios.get(`https://real-estate-flax-psi.vercel.app/properties`, { withCredentials: true });
      return data;
    },
  })

  // Filter properties based on the search query
  const filteredProperties = properties?.filter((property) =>
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort properties based on price range
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const priceA = parseInt(a.priceRange.split('-')[0]);
    const priceB = parseInt(b.priceRange.split('-')[0]);

    if (sortOrder === 'lowToHigh') {
      return priceA - priceB;
    }
    if (sortOrder === 'highToLow') {
      return priceB - priceA;
    }
    return 0;
  });
  isLoading && <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4 mt-20 mb-20">
      <div className="flex justify-between gap-4 mb-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location"
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
              <HiOutlineSearch className="text-xl" />
            </span>
          </div>
        </div>

        {/* Sort */}
        <div className="mb-6">
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">Sort by Price</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
            <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
              <HiOutlineFilter className="text-xl" />
            </span>
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400">
              <HiOutlineChevronDown className="text-xl" />
            </span>
          </div>
        </div>

      </div>

      {/* Properties List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sortedProperties?.length > 0 ? (
          sortedProperties?.map((property) => (
            <div
              key={property._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transform transition duration-300 hover:scale-105"
            >
              {/* Property Image Section */}
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.propertyTitle}
                  className="w-full h-52 object-cover"
                />
                <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1 shadow">
                  <MdStar className="text-yellow-300" /> Featured
                </div>
                <div className="absolute top-3 right-3 bg-blue-600 text-white p-2 rounded-full shadow">
                  <MdVerified className="text-white text-lg" />
                </div>
              </div>
              {/* Card Content */}
              <div className="p-4">
                <div className='flex justify-between gap-2'>
                  <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
                    {property.propertyTitle}
                  </h3>
                  <p
                    className={`text-sm font-bold mb-3 flex items-center gap-2 ${property.verificationStatus === "verified"
                      ? "text-green-600"
                      : property.verificationStatus === "rejected"
                        ? "text-red-600"
                        : "text-gray-500"
                      }`}
                  >
                    <BsShieldCheck className="text-xl" />
                    {property.verificationStatus.charAt(0).toUpperCase() +
                      property.verificationStatus.slice(1)}
                  </p>
                </div>
                <div className=' flex justify-between gap-2'>
                  <p className="text-red-500 font-bold text-lg mb-2">
                    ${property.priceRange}
                  </p>
                  <p className="text-base font-semibold text-gray-600 flex items-center gap-2 mb-4">
                    <HiOutlineLocationMarker className="text-blue-500" />
                    {property.location}
                  </p>
                </div>

                {/* Agent Info */}
                <div className="flex justify-center items-center gap-3 mb-4">
                  <img
                    src={property.agentPhoto}
                    alt={property.agentName}
                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{property.agentName}</p>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex gap-3">
                  <Link to={`/property/details/${property._id}`} className="w-full">
                    <button className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-600 transition duration-300">
                      <HiOutlineInformationCircle />
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No properties found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
