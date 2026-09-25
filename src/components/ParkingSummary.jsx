import React from 'react';

export function ParkingSummary({ total, available, occupied }) {
  return (
    <div className="stats-grid">
      <div className="glass-panel stat-card">
        <div className="stat-title">Total Slots</div>
        <div className="stat-value total">{total}</div>
      </div>
      <div className="glass-panel stat-card">
        <div className="stat-title">Available</div>
        <div className="stat-value available">{available}</div>
      </div>
      <div className="glass-panel stat-card">
        <div className="stat-title">Occupied</div>
        <div className="stat-value occupied">{occupied}</div>
      </div>
    </div>
  );
}
