import React from "react";

// Option A: Using an inline SVG for the WhatsApp icon
// Option B: Use a library like `react-icons` if you prefer (see the comment below)

const WhatsAppBubble = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://wa.me/123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      >
        {/* Option A: Inline SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M380.9 97.1C339.4 55.6 285.3 32 229.2 32 132.7 32 
          52.6 112 52.6 208.4c0 37.7 10.1 74.6 29.2 106l-31 
          90.5 92.8-30.6c30.6 16.8 65.1 25.7 100.2 25.7h.1c96.5 
          0 176.6-80 176.6-176.4.1-56.2-23.4-110.2-65.6-152.5zm-110 
          306.5c-27.3 0-54.1-7.2-77.4-20.8l-5.5-3.3-55 18.2 
          18.3-53.6-3.6-5.7c-18.6-29.4-28.3-63.5-28.3-98.4 
          0-97.6 79.5-177.1 177.1-177.1 47.4 0 92 18.5 
          125.6 52.1 33.6 33.5 52 78 52 125.4-.1 97.6-79.6 
          177.2-177.2 177.2zm97.9-131.6c-5.3-2.6-31.3-15.4-36.2-17.1-4.9-1.8-8.5-2.6-12.1 
          2.6-3.6 5.3-14 17.1-17.1 20.6-3.1 3.5-6.2 4-11.5 1.3-5.3-2.6-22.3-8.2-42.5-26.2 
          -15.7-14-26.2-31.3-29.3-36.6-3.1-5.3-.3-8.2 
          2.3-10.8 2.3-2.3 5.3-6.2 7.9-9.3 
          2.6-3.1 3.5-5.3 5.3-8.8 1.8-3.5 .9-6.6-.4-9.3-1.3-2.6-12.1-29.3-16.6-40.3 
          -4.4-10.6-9-9.1-12.1-9.3-3.1-.2-6.6-.2-10.1-.2s-9.3 
          1.3-14.1 6.6c-4.8 5.3-18.6 18.2-18.6 44.4s19.1 51.4 
          21.8 55c2.6 3.5 37.6 57.3 91.1 80.3 53.5 23.1 53.5 
          15.4 63.2 14.4 9.7-.9 31-12.6 35.3-24.8 4.4-12.2 
          4.4-22.6 3.1-24.8-1.3-2.2-4.9-3.5-10.2-6.1z" />
        </svg>
        {/* Option B (alternative): 
            <FaWhatsapp size={20} /> // if using: npm install react-icons
        */}
        <span>Hast du Fragen?</span>
      </a>
    </div>
  );
};

export default WhatsAppBubble;
