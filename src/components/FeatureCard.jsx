import React from "react";

const FeatureCard = ({ progress = 100, /* ...existing props... */ }) => {
  return (
    <div className="relative flex">
      {/* Left progress bar */}
      <div
        className="absolute left-0 bottom-0"
        style={{
          width: "4px",
          height: `${progress}%`,
          backgroundImage: "linear-gradient(to bottom, #231F20, #CC181F)",
        }}
      />
      <div className="pl-6">
        {/* ...existing code... */}
      </div>
    </div>
  );
};

export default FeatureCard;
