import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">PropertyPulse</h3>
            <p className="text-gray-300 mb-4">
              Your ultimate destination for finding the perfect property. Reliable, trusted, and tailored to your needs.
            </p>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} PropertyPulse. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-300 transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/all-properties" className="hover:text-blue-300 transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/all-properties" className="hover:text-blue-300 transition-colors duration-300">
                  Properties
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-300 transition-colors duration-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <div className="flex items-center mb-4">
              <FaPhoneAlt className="text-blue-300 mr-3" />
              <p className="text-gray-300">+1 234 567 890</p>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-blue-300 mr-3" />
              <p className="text-gray-300">support@propertypulse.com</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        Designed with ❤️ by PropertyPulse Team
      </div>
    </footer>
  );
};

export default Footer;
