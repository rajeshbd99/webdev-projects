// src/components/Modal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, children, totalAmount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6 text-center">
        {/* Green Checkmark Icon */}
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-4xl" />
        </div>
        
        {/* Payment Success Message */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Successfully</h2>
        <p className="text-gray-600 mb-4">Thanks for purchasing.</p>
        <p className="font-semibold text-gray-800">Total: ${totalAmount.toFixed(2)}</p>
        
        {/* Close Button */}
        <button
          className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition duration-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  totalAmount: PropTypes.number.isRequired,
};

export default Modal;