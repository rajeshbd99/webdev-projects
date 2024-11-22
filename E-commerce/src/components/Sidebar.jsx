// src/components/Sidebar.jsx
import React from 'react';

function Sidebar({ selectedCategory, setCategory }) {
  const categories = [
    'All Product',
    'Laptops',
    'Phones',
    'Accessories',
    'Camera',
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-lg w-full text-center">
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li
            key={index}
            className={`cursor-pointer rounded-full py-2 ${selectedCategory === category ? 'bg-purple-400 font-bold' : 'hover:bg-purple-400 hover:font-bold'}`}
            onClick={() => setCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;