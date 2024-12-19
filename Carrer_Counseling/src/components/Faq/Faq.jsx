import React, { useState } from "react";

export const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How can career counseling help me?",
      answer: "Career counseling helps identify your strengths and interests to align them with suitable career paths.",
    },
    {
      question: "What services do you offer?",
      answer: "We offer career counseling, resume reviews, mock interviews, and skill development workshops.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto mb-16 px-4 py-8 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 rounded-lg shadow-lg">
      <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-lg overflow-hidden shadow-sm transition-all duration-300 ${
              activeIndex === index ? "bg-indigo-100" : "bg-white"
            }`}
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center"
              onClick={() => toggleFaq(index)}
            >
              <span className="text-lg font-semibold text-indigo-800">
                {faq.question}
              </span>
              <span
                className={`text-indigo-500 transform transition-transform ${
                  activeIndex === index ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>
            {activeIndex === index && (
              <div className="px-6 py-4 bg-indigo-50 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
