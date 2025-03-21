export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      registrations: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          phone: string
          institution: string
          github: string
          linkedin: string
          team_name: string
          problem_statement: string
          payment_status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          phone: string
          institution: string
          github: string
          linkedin: string
          team_name: string
          problem_statement: string
          payment_status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          phone?: string
          institution?: string
          github?: string
          linkedin?: string
          team_name?: string
          problem_statement?: string
          payment_status?: string
          created_at?: string
        }
      }
    }
  }
}