import React from "react";

export const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alice Johnson",
      feedback:
        "The career counseling sessions were a game-changer for me. I found clarity and direction for my future.",
      image: "https://i.ibb.co/gdJpNqm/qlu41urxedascl20wc9lhkrlkhvp.png",
    },
    {
      id: 2,
      name: "Mark Smith",
      feedback:
        "Thanks to the resume review service, I landed interviews at top companies. It truly exceeded my expectations!",
      image: "https://i.ibb.co/bKXFZDk/premium-photo-1682144187125-b55e638cf286.jpg",
    },
    {
      id: 3,
      name: "Samantha Lee",
      feedback:
        "This service gave me the confidence to pursue my dream job. I’m thrilled with the results!",
      image: "https://i.ibb.co/WKxC4LY/aid1lg6zbqit3t04iwwl7ry6pvw0.jpg",
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-12">
          Hear From Our Happy Clients
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Testimonial Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full shadow-md"
                />
              </div>
              {/* Testimonial Content */}
              <blockquote className="text-gray-600 italic text-center">
                “{testimonial.feedback}”
              </blockquote>
              {/* Client Name */}
              <div className="text-center mt-4">
                <h3 className="font-semibold text-lg text-indigo-700">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500">Verified Client</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-indigo-800">
            Ready to Take the First Step?
          </h3>
          <p className="text-gray-600 mt-2 mb-6">
            Join the thousands of clients who have transformed their careers
            with our expert guidance.
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transform transition-all hover:scale-105">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};
