/*
  # Create registrations table

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `institution` (text)
      - `github` (text)
      - `linkedin` (text)
      - `team_name` (text)
      - `problem_statement` (text)
      - `payment_status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `registrations` table
    - Add policies for:
      - Public access to create registrations
      - Read access for all registrations
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  institution text NOT NULL,
  github text NOT NULL,
  linkedin text NOT NULL,
  team_name text NOT NULL,
  problem_statement text NOT NULL,
  payment_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow public access to create registrations
CREATE POLICY "Allow public to create registrations"
  ON registrations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow reading all registrations
CREATE POLICY "Allow reading all registrations"
  ON registrations
  FOR SELECT
  TO public
  USING (true);