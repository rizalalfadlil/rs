"use client"
import React from "react";

const Marquee = ({ children, speed = 10, className = "" }:any) => {
  const marqueeRef = React.useRef(null);

  return (
    <div
      className={`overflow-hidden whitespace-nowrap border ${className}`}
    >
      <div
        ref={marqueeRef}
        className="inline-block animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
};

export default Marquee;
