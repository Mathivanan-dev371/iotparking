import React from 'react';
import { Car } from 'lucide-react';

export function Header({ status, lastUpdated }) {
  return (
    <header className="header">
      <div className="header-title">
        <Car size={32} color="#60a5fa" />
        <h1>Smart Parking IoT</h1>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
        <div className="status-badge">
          <div className={`status-dot ${status}`} />
          <span>
            {status === 'online' ? 'System Online' : status === 'error' ? 'Connection Error' : 'Connecting...'}
          </span>
        </div>
        <div className="last-updated">
          Last Updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </header>
  );
}
