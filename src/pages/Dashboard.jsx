import React from 'react';
import { useParkingSlots } from '../hooks/useParkingSlots';
import { Header } from '../components/Header';
import { ParkingSummary } from '../components/ParkingSummary';
import { ParkingSlot } from '../components/ParkingSlot';
import { Legend } from '../components/Legend';

export function Dashboard() {
  const { slots, status, lastUpdated } = useParkingSlots();

  const total = slots.length;
  const occupied = slots.filter(s => s.is_occupied).length;
  const available = total - occupied;

  return (
    <div className="dashboard-container">
      <Header status={status} lastUpdated={lastUpdated} />
      
      <ParkingSummary 
        total={total} 
        available={available} 
        occupied={occupied} 
      />

      <div className="parking-lot">
        {slots.map((slot) => (
          <ParkingSlot key={slot.slot_number} slot={slot} />
        ))}
      </div>

      <Legend />
    </div>
  );
}
