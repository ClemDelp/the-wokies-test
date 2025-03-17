#!/bin/bash

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "Supabase CLI is not installed. Installing..."
    brew install supabase/tap/supabase
fi

# Create migrations directory if it doesn't exist
mkdir -p supabase/migrations

# Create a new migration file
TIMESTAMP=$(date +%Y%m%d%H%M%S)
MIGRATION_FILE="supabase/migrations/${TIMESTAMP}_create_tables.sql"

# Write SQL to migration file
cat > "$MIGRATION_FILE" << 'EOL'
-- Create players table
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    mail TEXT NOT NULL UNIQUE,
    state TEXT NOT NULL CHECK (state IN ('RECEIVED_INVITE', 'ACCEPTED', 'REJECTED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create players_teams table
CREATE TABLE IF NOT EXISTS players_teams (
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (player_id, team_id)
);
EOL

# Initialize Supabase project if not already initialized
if [ ! -f "supabase/config.toml" ]; then
    echo "Initializing Supabase project..."
    supabase init
fi

# Link to Supabase project if not already linked
if [ ! -f "supabase/.env" ]; then
    echo "Please enter your Supabase project reference ID:"
    read PROJECT_REF
    supabase link --project-ref $PROJECT_REF
fi

# Push the migration to Supabase
echo "Pushing migration to Supabase..."
supabase db push

echo "Database initialization complete!" 