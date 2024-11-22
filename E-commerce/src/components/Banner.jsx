import { NavLink } from 'react-router-dom';
import bannerImg from '../assets/banner.jpg'
const Banner = () => {
  return (
    <div>
      <div className="container mx-auto rounded-b-2xl text-center bg-purple-500 text-white pt-16 pb-48">
        <h1 className="text-4xl font-bold max-w-3xl mx-auto">Upgrade Your Tech Accessorize with Gadget Heaven Accessories</h1>
        <p className="mt-4 max-w-2xl mx-auto mb-6">Explore the latest gadgets that will take your experience to the next level. From smart devices to the coolest accessories, we have it all!</p>
        <NavLink to="/Dashboard" className="mt-6 bg-white text-purple-500 px-6 py-2 rounded-full text-xl font-medium">Shop Now</NavLink>

      </div>
      <div className='max-w-4xl mx-auto p-4 rounded-xl backdrop-blur-lg bg-white/60 -mt-40'>
        <img src={bannerImg} alt="" className='rounded-lg' />

      </div>
    </div>
  );
};

export default Banner;
