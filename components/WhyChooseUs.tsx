"use client";

import { useState } from "react";
import { ShieldCheck, Clock, Users, TrendingUp } from "lucide-react";

const features = [
  {
    title: "Trusted & Secure",
    icon: <ShieldCheck className="text-blue-600" size={32} />,
    desc: "We use enterprise-grade encryption and secure protocols for all transactions and data.",
  },
  {
    title: "Fast Payouts",
    icon: <Clock className="text-green-600" size={32} />,
    desc: "Get your money within 24–48 hours after license verification and approval.",
  },
  {
    title: "Business-Focused",
    icon: <Users className="text-purple-600" size={32} />,
    desc: "Tailored for small businesses to large enterprises with volume-based pricing.",
  },
  {
    title: "Transparent Pricing",
    icon: <TrendingUp className="text-yellow-600" size={32} />,
    desc: "No hidden fees. Our AI-driven valuation ensures you get the most value for your software.",
  },
];

export default function WhyChooseUs() {
  const [hoveredFeature, setHoveredFeature] = useState<number|null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 px-4 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700">
          Why Choose Us
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-16 text-lg">
          SoftSell is designed to make software resale safe, fast, and valuable
          for businesses of all sizes.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className={`bg-white p-8 rounded-3xl shadow-lg transition-all duration-300 text-left ${
                hoveredFeature === i ? "transform -translate-y-2 shadow-xl" : ""
              }`}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className={`mb-6 p-4 inline-block rounded-2xl ${
                  hoveredFeature === i ? "bg-blue-50" : "bg-gray-50"
                } transition-colors duration-300`}
              >
                {f.icon}
              </div>
              <h4 className="font-bold text-xl mb-3">{f.title}</h4>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
