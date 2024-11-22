import aboutImg from '../assets/comapny.jpg'
import person1 from '../assets/Rajesh.jpg'
import person2 from '../assets/Durjoy.jpg'
import person3 from '../assets/Sujoy.jpg'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const AboutPage = () => {
  const location=useLocation();
  useEffect(()=>{
    document.title="King Gadgets | About"
  },[location])
    return (
      <div className="text-gray-800 container mx-auto">
        {/* Hero Section */}
        <div className="bg-purple-500 relative h-72 bg-cover bg-center">
          <div className="absolute inset-0"></div>
          <div className="flex flex-col items-center justify-center h-full text-center text-white relative z-10">
            <h1 className="text-4xl font-bold">About Us</h1>
            <p className="mt-2 text-lg">Innovating for a Smarter Tomorrow</p>
          </div>
        </div>
  
        {/* Company Description */}
        <div className="container mx-auto px-6 py-12 md:flex md:space-x-8">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              We are a team of tech enthusiasts dedicated to bringing you the latest in cutting-edge gadgets and technology. 
              From smartphones to smart homes, our goal is to make technology accessible, intuitive, and transformative.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src={aboutImg} alt="Company" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>
  
        {/* Mission Statement */}
        <div className="bg-gray-200 py-12 text-white about-bg-img" >
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
            <p className="text-white leading-relaxed max-w-2xl mx-auto">
              To simplify lives through technology by creating products that enhance connectivity, streamline processes, and 
              inspire new ways of interacting with the digital world. We believe in innovation that serves and improves everyday life.
            </p>
          </div>
        </div>
  
        {/* Team Section */}
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const teamMembers = [
    { id: 1, name: 'Rajesh Chowdhury', role: 'CEO & Founder', image:person1 },
    { id: 2, name: 'Durjoy Chowdhury', role: 'CTO', image:person2 },
    { id: 3, name: 'Sujoy Chowdhury', role: 'Head of Marketing', image:person3 },
  ];
  
  export default AboutPage;
  