import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export function useParkingSlots() {
  const [slots, setSlots] = useState([
    { slot_number: 1, is_occupied: false },
    { slot_number: 2, is_occupied: false },
    { slot_number: 3, is_occupied: false },
    { slot_number: 4, is_occupied: false }
  ]);
  const [status, setStatus] = useState('connecting'); // connecting, online, error
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Initial fetch
    const fetchSlots = async () => {
      try {
        const { data, error } = await supabase
          .from('parking_slots')
          .select('*')
          .order('slot_number', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          setSlots(data);
          setStatus('online');
          setLastUpdated(new Date());
        }
      } catch (err) {
        console.error('Error fetching parking slots:', err);
        setStatus('error');
      }
    };

    fetchSlots();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('parking_slots_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'parking_slots'
        },
        (payload) => {
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            setSlots((currentSlots) => {
              const newSlots = [...currentSlots];
              const index = newSlots.findIndex((s) => s.slot_number === payload.new.slot_number);
              if (index !== -1) {
                newSlots[index] = { ...newSlots[index], ...payload.new };
              } else if (payload.eventType === 'INSERT') {
                newSlots.push(payload.new);
                newSlots.sort((a, b) => a.slot_number - b.slot_number);
              }
              return newSlots;
            });
            setLastUpdated(new Date());
            setStatus('online');
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setStatus('online');
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          setStatus('error');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { slots, status, lastUpdated };
}
