/*
  # Update registrations table schema and policies

  1. Changes
    - Drop existing policies
    - Ensure user_id references users table correctly
    - Recreate policies with proper security
  
  2. Security
    - Enable RLS on registrations table
    - Restrict inserts to authenticated users only
    - Allow users to view only their own registrations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public to create registrations" ON registrations;
DROP POLICY IF EXISTS "Allow reading all registrations" ON registrations;

-- Ensure RLS is enabled
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Update table definition
ALTER TABLE registrations 
  ALTER COLUMN user_id DROP DEFAULT, -- Remove random UUID
  ALTER COLUMN user_id SET NOT NULL, -- Ensure user_id is always required
  ADD CONSTRAINT registrations_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) 
    ON DELETE CASCADE; -- Automatically delete registrations if user is deleted

-- Restrict inserts to authenticated users only
CREATE POLICY "Authenticated users can create registrations"
  ON registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE users.id = registrations.user_id));

-- Allow users to read only their own registrations
CREATE POLICY "Users can read own registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
