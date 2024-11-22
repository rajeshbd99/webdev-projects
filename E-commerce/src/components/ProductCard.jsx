// src/components/ProductCard.jsx
import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

function ProductCard({ gadget }) {
    const { setSelectedProduct } = useProductContext();
    const navigate=useNavigate();

    const handleViewDetails = () => {
        setSelectedProduct(gadget);
        navigate(`/product/${gadget.id}`);

    };
    return (
        <div className="border p-4 rounded-lg text-center">
            <img src={gadget.image} alt={gadget.title} className="w-full h-48 object-contain mb-4" />
            <h3 className="font-bold">{gadget.title}</h3>
            <p>Price: {gadget.price}</p>
            <button className="mt-2 bg-purple-500 text-white py-2 px-4 rounded-lg"
                onClick={handleViewDetails}>
                View Details
            </button>
        </div>
    );
}

export default ProductCard;
