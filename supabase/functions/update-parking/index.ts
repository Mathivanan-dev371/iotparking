import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Check method
    if (req.method !== 'POST') {
      throw new Error('Method not allowed')
    }

    // Parse JSON body
    const body = await req.json()
    const { slot_number, is_occupied } = body

    // Validation
    if (typeof slot_number !== 'number' || slot_number < 1 || slot_number > 4) {
      throw new Error('Invalid slot_number. Must be a number between 1 and 4.')
    }
    if (typeof is_occupied !== 'boolean') {
      throw new Error('Invalid is_occupied. Must be a boolean.')
    }

    // Create Supabase admin client using environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Missing Supabase environment variables')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

    // Update the database
    const { data, error } = await supabase
      .from('parking_slots')
      .update({ is_occupied, updated_at: new Date().toISOString() })
      .eq('slot_number', slot_number)
      .select()
      .single()

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({
        success: true,
        slot_number: data.slot_number,
        is_occupied: data.is_occupied
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
