"use client";

import { useState } from "react";
import Image from "next/image";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      name: "John D.",
      role: "IT Manager",
      company: "Acme Corp",
      quote:
        "SoftSell made the resale process effortless. We recovered 70% of our original investment on unused licenses. Fast and reliable!",
      avatar: "https://picsum.photos/seed/john123/150/150",
    },
    {
      name: "Priya M.",
      role: "Procurement Lead",
      company: "DevSolutions",
      quote:
        "We recovered value from unused licenses in just days. The valuation was fair and the payment process was smooth. Highly recommended!",
      avatar: "https://picsum.photos/seed/priya456/150/150",
    },
    {
      name: "Michael R.",
      role: "CFO",
      company: "TechGrowth Inc",
      quote:
        "SoftSell has become an essential part of our cost management strategy. We've recouped thousands on enterprise software we no longer needed.",
      avatar: "https://picsum.photos/seed/michael789/150/150",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white px-4 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700">
          What Our Clients Say
        </h2>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {reviews.map((r, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white shadow-xl rounded-3xl p-8 md:p-10 max-w-3xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-6 items-center text-left">
                      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-blue-100">
                        <Image
                          width={150}
                          height={150}
                          src={r.avatar}
                          alt={r.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-blue-600 text-5xl font-serif leading-none mb-4"></div>
                        <p className="text-gray-700 text-lg md:text-xl italic mb-6">
                          {r.quote}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="font-bold text-gray-900">
                            {r.name}
                          </div>
                          <div className="text-gray-500">•</div>
                          <div className="text-gray-700">
                            {r.role} at {r.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === i ? "bg-blue-600 w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setActiveIndex((prev) =>
                prev > 0 ? prev - 1 : reviews.length - 1
              )
            }
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:left-4 bg-white p-3 rounded-full shadow-lg text-blue-600 hover:bg-blue-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setActiveIndex((prev) =>
                prev < reviews.length - 1 ? prev + 1 : 0
              )
            }
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:right-4 bg-white p-3 rounded-full shadow-lg text-blue-600 hover:bg-blue-50 transition-colors"
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}