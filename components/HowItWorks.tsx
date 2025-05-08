"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  LucideUpload,
  LucideDollarSign,
  LucideCheckCircle2,
} from "lucide-react";

export default function HowItWorks() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const steps = [
    {
      title: "Upload License",
      description:
        "Securely submit your unused software license details through our encrypted platform.",
      icon: <LucideUpload className="text-blue-600" size={36} />,
    },
    {
      title: "Get Valuation",
      description:
        "Our AI-powered system evaluates market conditions and provides a fair quote within minutes.",
      icon: <LucideDollarSign className="text-green-600" size={36} />,
    },
    {
      title: "Get Paid",
      description:
        "Accept the offer and receive fast, secure payment through your preferred method.",
      icon: <LucideCheckCircle2 className="text-purple-600" size={36} />,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 text-center px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700">
          How It Works
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-16 text-lg">
          Selling your unused software is as easy as 1-2-3.
        </p>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <Card
              key={i}
              className={`shadow-lg rounded-3xl transition-all duration-300 ${
                hoveredCard === i ? "transform -translate-y-4 shadow-xl" : ""
              }`}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="flex flex-col items-center gap-6 py-10 px-6">
                <div
                  className={`rounded-full p-5 ${
                    hoveredCard === i ? "bg-blue-50" : "bg-gray-50"
                  } transition-colors duration-300`}
                >
                  {step.icon}
                </div>
                <div>
                  <div className="text-xl font-semibold mb-2">{step.title}</div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className="text-blue-600 font-medium text-sm hidden md:block">
                  Step {i + 1}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
