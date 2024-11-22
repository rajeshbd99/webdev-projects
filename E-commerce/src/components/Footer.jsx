import React from 'react';

const Footer = () => {
  return (
    <footer className="text-black p-10 bg-gray-100">
            <div className='text-center mb-16'>
                <h1 className='text-3xl font-bold mb-3'>Gadget Heaven</h1>
                <p className='font-medium text-[#09080F99]'>Leading the way in cutting-edge technology and innovation.</p>
            </div>
            <div className='grid md:grid-cols-3 grid-cols-1 mx-auto text-center items-start'>
            <nav className='grid grid-cols-1 md:mb-0 mb-4'>
                <h6 className="font-bold mb-4">Services</h6>
                <a className="link link-hover text-[#09080F99]">Product Support</a>
                <a className="link link-hover text-[#09080F99]">Order Tracking</a>
                <a className="link link-hover text-[#09080F99]">Shipping & Delivery</a>
                <a className="link link-hover text-[#09080F99]">Returns</a>
            </nav>
            <nav className='grid grid-cols-1 md:mb-0 mb-4'>
                <h6 className="font-bold mb-4">Company</h6>
                <a className="link link-hover text-[#09080F99]">About us</a>
                <a className="link link-hover text-[#09080F99]">Careers</a>
                <a className="link link-hover text-[#09080F99]">Contact</a>
            </nav>
            <nav className='grid grid-cols-1 md:mb-0 mb-4'>
                <h6 className="font-bold mb-4">Legal</h6>
                <a className="link link-hover text-[#09080F99]">Terms of use</a>
                <a className="link link-hover text-[#09080F99]">Privacy policy</a>
                <a className="link link-hover text-[#09080F99]">Cookie policy</a>
            </nav>
            </div>
 </footer>
  );
};

export default Footer;
