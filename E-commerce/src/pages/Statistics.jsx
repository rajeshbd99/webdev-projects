// src/pages/Statistics.jsx
import React, { useEffect, useState } from 'react';
import { ComposedChart, Bar, Area, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLocation } from 'react-router-dom'
function Statistics() {
  // State to hold the processed data for the chart
  const [chartData, setChartData] = useState([]);

  const location=useLocation();
  useEffect(()=>{
    document.title="King Gadgets | Statistics"
  },[location])

  useEffect(() => {
    fetch('/gadget.json')
      .then((res) => res.json())
      .then((data) => {
        const processedData = data.map((item) => ({
          ...item,
          price: parseFloat(item.price.replace('$', '')), // Convert price to number
          rating: item.ratingValue // Use ratingValue instead of rating
        }));
        setChartData(processedData);
      });
  }, []);

  console.log(chartData);

  return (
    <div className="container mx-auto text-white">
      <div className='bg-purple-500 p-5'>
        <h2 className="text-3xl font-bold text-center mb-8">Statistics</h2>
        <p className="text-center mb-8">Statistical insights about the gadgets and customer preferences.</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 text-black">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="title" label={{ value: 'Product Name', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />

            {/* Area chart for Price with color */}
            <Area type="monotone" dataKey="price" fill="#82ca9d" stroke="#82ca9d" />

            {/* Bar chart for Price with color */}
            <Bar dataKey="price" barSize={20} fill="#8884d8" />

            {/* Scatter plot for Rating with color */}
            <Scatter dataKey="rating" fill="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Statistics;
