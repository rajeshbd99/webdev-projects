import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const About = () => {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = "Career Hub | About Us";
    document.title = pageTitle;
  }, [location]);

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://i.ibb.co/hKwbHM2/headshot-photographer-in-Singapore-Theresa-Olesen-8-1024x1024.jpg",
      bio: "An inspiring leader with 15+ years in career counseling and personal development.",
    },
    {
      name: "James Smith",
      role: "Head Counselor",
      image: "https://i.ibb.co/NjYXkYF/compressed-5e3b8ad23f166e411145b0d275eceecc.webp",
      bio: "Certified career coach with expertise in helping individuals achieve their professional dreams.",
    },
    {
      name: "Emily Davis",
      role: "Operations Manager",
      image: "https://i.ibb.co/HCr0KtX/Womens-Corporate-Headshots-Photography-by-Orlandosydney-com-202300353.jpg",
      bio: "Ensures smooth operations and exceptional service delivery for our clients.",
    },
  ];

  const testimonials = [
    {
      name: "Alice Parker",
      feedback:
        "Thanks to their career counseling, I landed my dream job! The team is highly professional and truly cares.",
      rating: 5,
    },
    {
      name: "Michael Brown",
      feedback:
        "Their workshops gave me the confidence to excel in interviews. Highly recommended!",
      rating: 4.8,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16 px-4 md:px-6 lg:px-12 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-base md:text-xl mb-6">
            Empowering you to achieve your career goals and unlock your full
            potential.
          </p>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
          <div className="text-center p-6 bg-indigo-100 rounded-lg shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-indigo-700 mb-4">
              Our Mission
            </h2>
            <p className="text-sm md:text-base text-gray-700">
              To guide individuals towards meaningful careers through expert
              advice and personalized counseling.
            </p>
          </div>
          <div className="text-center p-6 bg-purple-100 rounded-lg shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-purple-700 mb-4">
              Our Vision
            </h2>
            <p className="text-sm md:text-base text-gray-700">
              A world where everyone has access to the tools and resources to
              achieve their dream careers.
            </p>
          </div>
          <div className="text-center p-6 bg-pink-100 rounded-lg shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-pink-700 mb-4">
              Our Values
            </h2>
            <p className="text-sm md:text-base text-gray-700">
              Integrity, empowerment, and lifelong learning are at the heart of
              everything we do.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-4 md:px-6 lg:px-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full mb-4"
                />
                <h3 className="text-lg md:text-xl font-bold text-indigo-700">
                  {member.name}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {member.role}
                </p>
                <p className="mt-4 text-sm md:text-base text-gray-700">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4 md:px-6 lg:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What People Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 rounded-lg shadow-lg transform transition-transform hover:scale-105"
            >
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                {testimonial.name}
              </h3>
              <p className="mt-2 text-sm md:text-base text-gray-700">
                {testimonial.feedback}
              </p>
              <div className="mt-4 text-yellow-500">
                {"⭐".repeat(Math.floor(testimonial.rating))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16 px-4 md:px-6 lg:px-12 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to Unlock Your Potential?
          </h2>
          <p className="text-sm md:text-base mb-8">
            Join thousands of others who have transformed their lives with our
            guidance.
          </p>
          <button className="px-6 md:px-8 py-3 md:py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-md transform transition-transform hover:scale-105">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};
