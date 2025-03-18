import { NextResponse } from 'next/server';
import { Team } from '@/models/team.model';
import { supabaseClient } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabaseClient
      .from('teams')
      .select('*')
      .order('created_at', { ascending: false });

    console.log("---------",data);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data as Team[]);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    const { data, error } = await supabaseClient
      .from('teams')
      .insert([{ name }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data as Team);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 