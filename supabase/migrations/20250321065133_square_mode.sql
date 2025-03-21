/*
  # Create domain-specific registration tables

  1. New Tables
    - `ai_ml_registrations`
    - `web3_registrations`
    - `open_innovation_registrations`
    - `team_members` (shared across domains)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- AI & ML Registrations
CREATE TABLE IF NOT EXISTS ai_ml_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  team_name text NOT NULL,
  team_size int NOT NULL CHECK (team_size BETWEEN 3 AND 5),
  project_title text NOT NULL,
  project_description text NOT NULL,
  tech_stack text[] NOT NULL,
  ml_framework text NOT NULL,
  dataset_description text,
  model_architecture text,
  evaluation_metrics text[],
  github_repo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ai_ml_registrations ENABLE ROW LEVEL SECURITY;

-- Web3 Registrations
CREATE TABLE IF NOT EXISTS web3_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  team_name text NOT NULL,
  team_size int NOT NULL CHECK (team_size BETWEEN 3 AND 5),
  project_title text NOT NULL,
  project_description text NOT NULL,
  tech_stack text[] NOT NULL,
  blockchain_platform text NOT NULL,
  smart_contract_details text,
  token_economics text,
  web3_integrations text[],
  github_repo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE web3_registrations ENABLE ROW LEVEL SECURITY;

-- Open Innovation Registrations
CREATE TABLE IF NOT EXISTS open_innovation_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  team_name text NOT NULL,
  team_size int NOT NULL CHECK (team_size BETWEEN 3 AND 5),
  project_title text NOT NULL,
  project_description text NOT NULL,
  tech_stack text[] NOT NULL,
  innovation_category text NOT NULL,
  target_audience text,
  impact_assessment text,
  scalability_plan text,
  github_repo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE open_innovation_registrations ENABLE ROW LEVEL SECURITY;

-- Team Members table (shared across all domains)
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ai_ml_registration_id uuid REFERENCES ai_ml_registrations(id),
  web3_registration_id uuid REFERENCES web3_registrations(id),
  open_innovation_registration_id uuid REFERENCES open_innovation_registrations(id),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  institution text NOT NULL,
  branch text NOT NULL,
  year_of_study int NOT NULL,
  github_profile text,
  linkedin_profile text,
  role text NOT NULL,
  is_team_lead boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  -- Ensure only one registration type is set
  CONSTRAINT one_registration_type CHECK (
    (CASE WHEN ai_ml_registration_id IS NOT NULL THEN 1 ELSE 0 END +
     CASE WHEN web3_registration_id IS NOT NULL THEN 1 ELSE 0 END +
     CASE WHEN open_innovation_registration_id IS NOT NULL THEN 1 ELSE 0 END) = 1
  )
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Policies for AI & ML Registrations
CREATE POLICY "Users can create ai_ml registrations"
  ON ai_ml_registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own ai_ml registrations"
  ON ai_ml_registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own ai_ml registrations"
  ON ai_ml_registrations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for Web3 Registrations
CREATE POLICY "Users can create web3 registrations"
  ON web3_registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own web3 registrations"
  ON web3_registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own web3 registrations"
  ON web3_registrations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for Open Innovation Registrations
CREATE POLICY "Users can create open innovation registrations"
  ON open_innovation_registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own open innovation registrations"
  ON open_innovation_registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own open innovation registrations"
  ON open_innovation_registrations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for Team Members
CREATE POLICY "Users can create team members for ai_ml"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (
    ai_ml_registration_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM ai_ml_registrations 
      WHERE id = ai_ml_registration_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create team members for web3"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (
    web3_registration_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM web3_registrations 
      WHERE id = web3_registration_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create team members for open innovation"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (
    open_innovation_registration_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM open_innovation_registrations 
      WHERE id = open_innovation_registration_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view team members for ai_ml"
  ON team_members
  FOR SELECT
  TO authenticated
  USING (
    ai_ml_registration_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM ai_ml_registrations 
      WHERE id = ai_ml_registration_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view team members for web3"
  ON team_members
  FOR SELECT
  TO authenticated
  USING (
    web3_registration_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM web3_registrations 
      WHERE id = web3_registration_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view team members for open innovation"
  ON team_members
  FOR SELECT
  TO authenticated
  USING (
    open_innovation_registration_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM open_innovation_registrations 
      WHERE id = open_innovation_registration_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update team members for ai_ml"
  ON team_members
  FOR UPDATE
  TO authenticated
  USING (
    ai_ml_registration_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM ai_ml_registrations 
      WHERE id = ai_ml_registration_id AND user_id = auth.uid()
    )
  )
  WITH CHECK (
    ai_ml_registration_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM ai_ml_registrations 
      WHERE id = ai_ml_registration_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update team members for web3"
  ON team_members
  FOR UPDATE
  TO authenticated
  USING (
    web3_registration_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM web3_registrations 
      WHERE id = web3_registration_id AND user_id = auth.uid()
    )
  )
  WITH CHECK (
    web3_registration_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM web3_registrations 
      WHERE id = web3_registration_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update team members for open innovation"
  ON team_members
  FOR UPDATE
  TO authenticated
  USING (
    open_innovation_registration_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM open_innovation_registrations 
      WHERE id = open_innovation_registration_id AND user_id = auth.uid()
    )
  )
  WITH CHECK (
    open_innovation_registration_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM open_innovation_registrations 
      WHERE id = open_innovation_registration_id AND user_id = auth.uid()
    )
  );