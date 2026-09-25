import React from 'react';

export function Legend() {
  return (
    <div className="legend">
      <div className="legend-item">
        <div className="legend-color available" />
        <span>Available</span>
      </div>
      <div className="legend-item">
        <div className="legend-color occupied" />
        <span>Occupied</span>
      </div>
    </div>
  );
}
