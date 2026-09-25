-- Create parking_slots table
CREATE TABLE IF NOT EXISTS public.parking_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot_number INTEGER UNIQUE NOT NULL,
    is_occupied BOOLEAN NOT NULL DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert initial 4 slots
INSERT INTO public.parking_slots (slot_number, is_occupied) 
VALUES 
    (1, false),
    (2, false),
    (3, false),
    (4, false)
ON CONFLICT (slot_number) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.parking_slots ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow anonymous read access"
ON public.parking_slots
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow service role to update
CREATE POLICY "Allow service role update"
ON public.parking_slots
FOR UPDATE
TO service_role
USING (true);

-- Enable Realtime for the parking_slots table
alter publication supabase_realtime add table public.parking_slots;
