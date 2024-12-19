import { useEffect } from "react";
import services from "../data/services.json";
import { Link, useLocation } from "react-router-dom";

const ServiceDetails = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "Career Hub | Services";
    document.title = pageTitle;
  }, [location]);

  return (
    <div className="container mx-auto px-4 py-8 overflow-x-hidden">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center my-6 text-gray-800">
        Explore Our Services
      </h1>
      <p className="text-center text-gray-600 text-base md:text-lg mb-10">
        Choose the right service to shape your future.
      </p>

      {/* Grid Layout for Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image Section */}
            <div className="overflow-hidden">
              <img
                src={service.image}
                alt={service.service_name}
                className="w-full h-48 sm:h-52 md:h-60 object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                {service.service_name}
              </h2>
              <p className="text-sm text-gray-500 mb-3">{service.category}</p>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {service.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-md md:text-lg font-medium text-gray-800">
                  {service.pricing}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  <span className="font-semibold">Counselor:</span>{" "}
                  {service.counselor}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded-full">
                  {service.rating} ★
                </span>
                <Link
                  to={`/services/${service.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-xs sm:text-sm rounded-lg transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Category Tag */}
            <div className="absolute top-4 left-4 bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
              {service.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetails;
