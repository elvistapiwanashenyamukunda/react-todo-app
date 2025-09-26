import React from "react";

export const Spinner: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <div style={{
    width: size, height: size,
    border: `${Math.max(2, Math.floor(size/8))}px solid rgba(0,0,0,0.15)`,
    borderTopColor: "#111",
    borderRadius: "50%",
    animation: "spin 0.9s linear infinite"
  }} />
);

// in index.css we add @keyframes spin