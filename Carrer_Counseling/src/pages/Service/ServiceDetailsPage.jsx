import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import services from "../data/services.json";

const ServiceDetailsPage = () => {
    const location = useLocation();
    useEffect(() => {
        const pageTitle = "Career Hub | Service Details";
        document.title = pageTitle;
    }, [location]);
    
    const { id } = useParams();
    const service = services.find((s) => s.id === parseInt(id));
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState("");

    if (!service) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center p-8">
                    <h1 className="text-2xl md:text-4xl font-semibold text-red-600">
                        Service Not Found 😟
                    </h1>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const handleAddComment = () => {
        if (commentInput.trim() !== "") {
            setComments([...comments, commentInput]);
            setCommentInput("");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen max-w-screen">
            <div className="relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12 px-4 text-center text-white">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative z-10">
                    <h1 className="text-2xl md:text-4xl font-extrabold mb-4">{service.service_name}</h1>
                    <p className="text-base md:text-lg mb-4">{service.category}</p>
                    <span className="text-sm md:text-xl font-semibold bg-gradient-to-r from-pink-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-md">
                        ⭐ {service.rating} / 5
                    </span>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-12 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    <div className="space-y-6 bg-indigo-100 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transform transition-transform hover:scale-105">
                        <h2 className="text-2xl md:text-4xl font-semibold text-indigo-800">
                            About the Service
                        </h2>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                            {service.description}
                        </p>
                        
                        <ul className="space-y-4 text-gray-800">
                            <li className="flex justify-between">
                                <span className="font-medium text-indigo-700">Category:</span>
                                <span>{service.category}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="font-medium text-indigo-700">Price:</span>
                                <span>{service.pricing}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="font-medium text-indigo-700">Counselor:</span>
                                <span>{service.counselor}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center justify-center bg-indigo-100 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transform transition-transform hover:scale-105">
                        <h3 className="text-xl md:text-3xl font-semibold text-indigo-800 mb-4">
                            Ready to Get Started?
                        </h3>
                        <p className="text-base md:text-lg text-gray-600 mb-6 text-center">
                            Take the first step towards your goal with expert guidance. This service is designed to help you achieve your best outcome.
                        </p>
                        <button className="px-6 md:px-8 py-3 md:py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md transform transition-all hover:bg-indigo-700 hover:scale-105">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 flex justify-center">
    <img
        src={service.image}
        alt={service.service_name}
        className="w-full max-w-[500px] h-auto rounded-lg shadow-lg object-cover"
    />
</div>

            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
                    Comments & Feedback
                </h2>
                <div className="flex items-center space-x-4 mb-6">
                    <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        onClick={handleAddComment}
                        className="bg-indigo-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all"
                    >
                        Submit
                    </button>
                </div>

                {comments.length > 0 ? (
                    <div className="space-y-4">
                        {comments.map((comment, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                <p>{comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                )}
            </div>

            <div className="bg-gradient-to-r from-indigo-500 to-pink-500 h-2"></div>
        </div>
    );
};

export default ServiceDetailsPage;
