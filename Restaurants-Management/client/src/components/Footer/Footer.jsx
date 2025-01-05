import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="p-10 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white rounded-t-2xl">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">DineFusion</h2>
          <p className="text-sm">
            Your go-to destination for delightful culinary experiences. 
            Savor the fusion of flavors and ambiance since <strong>2024</strong>.
          </p>
          <p className="mt-4 text-sm">
            © 2024 DineFusion. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#about" className="hover:underline">About Us</a>
            </li>
            <li>
              <a href="#menu" className="hover:underline">Our Menu</a>
            </li>
            <li>
              <a href="#reservations" className="hover:underline">Reservations</a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">
            <strong>Email:</strong> support@dinefusion.com
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> +1 987 654 3210
          </p>
          <p className="text-sm">
            <strong>Address:</strong> 456 Culinary Avenue
          </p>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-lg">
            <a href="#!" aria-label="Facebook" className="hover:text-blue-500">
              <FaFacebook />
            </a>
            <a href="#!" aria-label="Twitter" className="hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="#!" aria-label="Instagram" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#!" aria-label="LinkedIn" className="hover:text-blue-300">
              <FaLinkedin />
            </a>
            <a href="#!" aria-label="YouTube" className="hover:text-red-500">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-white/20 pt-4 text-center">
        <p className="text-sm">
          Crafted with ❤️ by <strong>DineFusion Team</strong>. Savor the moment!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
