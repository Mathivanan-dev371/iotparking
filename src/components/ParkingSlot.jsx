import React from "react";

// A simple sleek car SVG
const CarIcon = () => (
  <svg
    className="car-svg"
    viewBox="0 0 100 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <mask id="car-mask">
        <rect width="100" height="200" fill="white" />
        <path d="M28 75 Q50 60 72 75 L67 95 Q50 100 33 95 Z" fill="black" />
        <path
          d="M33 130 Q50 125 67 130 L72 150 Q50 160 28 150 Z"
          fill="black"
        />
        <path d="M25 25 Q35 32 45 20 L25 20 Z" fill="black" />
        <path d="M75 25 Q65 32 55 20 L75 20 Z" fill="black" />
        <ellipse cx="33" cy="178" rx="6" ry="3" fill="black" />
        <ellipse cx="67" cy="178" rx="6" ry="3" fill="black" />
      </mask>
    </defs>
    <g mask="url(#car-mask)" fill="currentColor">
      <rect x="25" y="25" width="50" height="130" rx="20" ry="20" />
      <path d="M26 68 C12 68, 12 80, 26 80 Z" />
      <path d="M74 68 C88 68, 88 80, 74 80 Z" />
    </g>
  </svg>
);

export function ParkingSlot({ slot }) {
  const isAvailable = !slot.is_occupied;

  return (
    <div className={`parking-slot ${isAvailable ? "available" : "occupied"}`}>
      <div className="slot-number">{slot.slot_number}</div>

      <div className={`car-container ${isAvailable ? "hidden" : "visible"}`}>
        <CarIcon />
      </div>

      <div className="slot-status">
        {isAvailable ? "AVAILABLE" : "OCCUPIED"}
      </div>
    </div>
  );
}
