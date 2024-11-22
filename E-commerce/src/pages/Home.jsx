// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        document.title = "King Gadgets | Home";
    }, [location]);

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All Product'); // Default to show all products

    useEffect(() => {
        fetch('/gadget.json')
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    // Filter products based on selected category
    const filteredProducts = selectedCategory === 'All Product'
        ? products
        : products.filter((product) => product.category === selectedCategory);

    return (
        <div>
            <Banner />
            <div className="container mx-auto px-4">
                <h2 className="flex justify-center items-center mt-8 text-2xl font-bold mb-4">Explore Cutting-Edge Gadgets</h2>
                <section className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-3">
                        {/* Pass setSelectedCategory to Sidebar */}
                        <Sidebar setCategory={setSelectedCategory} selectedCategory={selectedCategory} />
                    </div>
                    <div className="md:col-span-9">
                        {/* Check if filteredProducts is empty */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} gadget={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 mt-8">
                                No products found in this category.
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
