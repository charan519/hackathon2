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
    - Add policies for authenticated users to:
      - Read their own registrations
      - Create new registrations
      - Update their own registrations
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
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

CREATE POLICY "Users can read own registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create registrations"
  ON registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own registrations"
  ON registrations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);