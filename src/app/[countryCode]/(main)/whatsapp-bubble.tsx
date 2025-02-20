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
        className="flex items-center space-x-2 rounded-full bg-green-500 px-4 py-2 text-white shadow-lg transition-colors hover:bg-green-600"
      >
        <span>Hast du Fragen?</span>
      </a>
    </div>
  );
};

export default WhatsAppBubble;
