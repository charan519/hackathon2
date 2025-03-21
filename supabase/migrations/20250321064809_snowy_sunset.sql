/*
  # Update registrations table policies

  1. Changes
    - Drop existing policies
    - Create new policies for authenticated users
  
  2. Security
    - Ensure RLS is enabled
    - Restrict inserts to authenticated users only
    - Allow users to view only their own registrations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public to create registrations" ON registrations;
DROP POLICY IF EXISTS "Allow reading all registrations" ON registrations;
DROP POLICY IF EXISTS "Authenticated users can create registrations" ON registrations;
DROP POLICY IF EXISTS "Users can read own registrations" ON registrations;

-- Ensure RLS is enabled
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Restrict inserts to authenticated users only
CREATE POLICY "Authenticated users can create registrations"
  ON registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to read only their own registrations
CREATE POLICY "Users can read own registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);