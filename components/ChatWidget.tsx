"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: "bot" | "user" }>
  >([{ text: "Hello! How can I help you today?", sender: "bot" }]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const questions = [
    "How do I sell my license?",
    "How long does payment take?",
    "Which license types do you accept?",
    "Is my data secure?",
  ];

  const answers: Record<string, string> = {
    "How do I sell my license?":
      "To sell your license, simply click the 'Sell My Licenses' button on our homepage. You'll need to complete a short form with details about your software license. Our team will review and provide a valuation within 24 hours.",
    "How long does payment take?":
      "After accepting our offer, payments are typically processed within 24–48 hours. We support various payment methods including direct bank transfer, PayPal, and crypto.",
    "Which license types do you accept?":
      "We accept most enterprise software licenses including Microsoft, Adobe, Oracle, SAP, Autodesk, VMware, and many others. Even if your software isn't listed, reach out and we'll evaluate it.",
    "Is my data secure?":
      "Absolutely! Your data security is our priority. We use end-to-end encryption, maintain SOC 2 compliance, and never share your information with third parties. All transactions are securely processed and documented.",
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuestion = (q: string) => {
    addMessage(q, "user");
    getResponse(q);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    addMessage(inputMessage, "user");
    getResponse(inputMessage);
    setInputMessage("");
  };

  const addMessage = (text: string, sender: "bot" | "user") => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const getResponse = async (query: string) => {
    setIsTyping(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const botResponse = getHardcodedResponse(query);

      addMessage(botResponse, "bot");
    } catch (error) {
      console.error("Error getting response:", error);
      addMessage(
        "Sorry, I encountered an error. Please try again later.",
        "bot"
      );
    } finally {
      setIsTyping(false);
    }
  };

  const getHardcodedResponse = (q: string): string => {
    if (q in answers) {
      return answers[q];
    }

    const lowerQ = q.toLowerCase();

    if (lowerQ.includes("sell") || lowerQ.includes("license")) {
      return "To sell your license, simply click the 'Sell My Licenses' button on our homepage. You'll need to complete a short form with details about your software license. Our team will review and provide a valuation within 24 hours.";
    } else if (
      lowerQ.includes("payment") ||
      lowerQ.includes("pay") ||
      lowerQ.includes("money")
    ) {
      return "After accepting our offer, payments are typically processed within 24–48 hours. We support various payment methods including direct bank transfer, PayPal, and crypto.";
    } else if (lowerQ.includes("accept") || lowerQ.includes("type")) {
      return "We accept most enterprise software licenses including Microsoft, Adobe, Oracle, SAP, Autodesk, VMware, and many others. Even if your software isn't listed, reach out and we'll evaluate it.";
    } else if (
      lowerQ.includes("secure") ||
      lowerQ.includes("security") ||
      lowerQ.includes("data")
    ) {
      return "Absolutely! Your data security is our priority. We use end-to-end encryption, maintain SOC 2 compliance, and never share your information with third parties. All transactions are securely processed and documented.";
    } else if (
      lowerQ.includes("hello") ||
      lowerQ.includes("hi") ||
      lowerQ.includes("hey")
    ) {
      return "Hello there! How can I assist you with software license reselling today?";
    } else {
      return "Thanks for your question. I'd be happy to help with that. Could you provide a bit more detail so I can give you the most accurate information?";
    }
  };

  const showNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex + 1 >= questions.length ? 0 : prevIndex + 1
    );
  };

  const showPrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex - 1 < 0 ? questions.length - 1 : prevIndex - 1
    );
  };

  const closeChat = () => {
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {open ? (
        <div className="bg-white rounded-3xl shadow-2xl w-80 md:w-96 mb-4 overflow-hidden flex flex-col transition-all duration-300 ease-in-out h-[500px] relative">
          <button
            onClick={closeChat}
            className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
            aria-label="Close chat"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2 rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center">
            <button
              onClick={showPrevQuestion}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-4 h-4"
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

            <div className="flex-1 mx-2">
              <button
                onClick={() => handleQuestion(questions[currentQuestionIndex])}
                className="w-full bg-white border border-gray-200 hover:border-indigo-300 text-sm rounded-full px-4 py-2 text-gray-600 hover:bg-indigo-50 transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {questions[currentQuestionIndex]}
              </button>

              <div className="mt-2 h-1 bg-gray-200 rounded-full w-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <button
              onClick={showNextQuestion}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-4 h-4"
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

          <form
            onSubmit={handleInputSubmit}
            className="p-4 border-t border-gray-100 flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={inputMessage.trim() === ""}
              className={`bg-indigo-500 text-white rounded-full w-10 h-10 flex items-center justify-center
                ${
                  inputMessage.trim() === ""
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-600"
                }`}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </form>
        </div>
      ) : null}

      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 group"
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
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <span className="max-w-0 overflow-hidden transition-all duration-300 group-hover:max-w-xs whitespace-nowrap">
          Chat with us
        </span>
      </button>
    </div>
  );
}
