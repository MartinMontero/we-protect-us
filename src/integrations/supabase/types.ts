export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      case_studies: {
        Row: {
          created_at: string | null
          description: string
          id: string
          key_principles: string[] | null
          lessons: string[] | null
          location: string
          organization: string
          outcomes: string[] | null
          relevance_score: number | null
          tags: string[] | null
          time_period: string
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          key_principles?: string[] | null
          lessons?: string[] | null
          location: string
          organization: string
          outcomes?: string[] | null
          relevance_score?: number | null
          tags?: string[] | null
          time_period: string
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          key_principles?: string[] | null
          lessons?: string[] | null
          location?: string
          organization?: string
          outcomes?: string[] | null
          relevance_score?: number | null
          tags?: string[] | null
          time_period?: string
          title?: string
        }
        Relationships: []
      }
      mutual_aid_posts: {
        Row: {
          category: Database["public"]["Enums"]["need_category"]
          created_at: string | null
          description: string
          expires_at: string | null
          id: string
          location_lat: number | null
          location_lng: number | null
          radius_km: number | null
          skills_needed: string[] | null
          status: Database["public"]["Enums"]["fulfillment_status"] | null
          time_commitment_hours: number | null
          title: string
          type: string
          updated_at: string | null
          urgency: Database["public"]["Enums"]["urgency_level"] | null
          user_id: string
        }
        Insert: {
          category: Database["public"]["Enums"]["need_category"]
          created_at?: string | null
          description: string
          expires_at?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          radius_km?: number | null
          skills_needed?: string[] | null
          status?: Database["public"]["Enums"]["fulfillment_status"] | null
          time_commitment_hours?: number | null
          title: string
          type: string
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
          user_id: string
        }
        Update: {
          category?: Database["public"]["Enums"]["need_category"]
          created_at?: string | null
          description?: string
          expires_at?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          radius_km?: number | null
          skills_needed?: string[] | null
          status?: Database["public"]["Enums"]["fulfillment_status"] | null
          time_commitment_hours?: number | null
          title?: string
          type?: string
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mutual_aid_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      oauth_states: {
        Row: {
          code_verifier: string | null
          created_at: string
          expires_at: string
          id: string
          provider: string
          redirect_url: string | null
          state: string
        }
        Insert: {
          code_verifier?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          provider: string
          redirect_url?: string | null
          state: string
        }
        Update: {
          code_verifier?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          provider?: string
          redirect_url?: string | null
          state?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          id: string
          location_lat: number | null
          location_lng: number | null
          pseudonym: string
          skills: string[] | null
          time_bank_hours: number | null
          trust_score: number | null
          updated_at: string | null
          vulnerability_factors: string[] | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          id: string
          location_lat?: number | null
          location_lng?: number | null
          pseudonym: string
          skills?: string[] | null
          time_bank_hours?: number | null
          trust_score?: number | null
          updated_at?: string | null
          vulnerability_factors?: string[] | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          pseudonym?: string
          skills?: string[] | null
          time_bank_hours?: number | null
          trust_score?: number | null
          updated_at?: string | null
          vulnerability_factors?: string[] | null
        }
        Relationships: []
      }
      reflections: {
        Row: {
          created_at: string | null
          id: string
          mutual_aid_post_id: string | null
          prompt_text: string
          prompt_type: string
          response: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          mutual_aid_post_id?: string | null
          prompt_text: string
          prompt_type: string
          response?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          mutual_aid_post_id?: string | null
          prompt_text?: string
          prompt_type?: string
          response?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reflections_mutual_aid_post_id_fkey"
            columns: ["mutual_aid_post_id"]
            isOneToOne: false
            referencedRelation: "mutual_aid_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reflections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      solidarity_metrics: {
        Row: {
          active_participants: number | null
          created_at: string | null
          date: string
          id: string
          network_density: number | null
          total_hours_exchanged: number | null
          trust_network_size: number | null
          vulnerability_support_ratio: number | null
          wealth_circulated: number | null
        }
        Insert: {
          active_participants?: number | null
          created_at?: string | null
          date?: string
          id?: string
          network_density?: number | null
          total_hours_exchanged?: number | null
          trust_network_size?: number | null
          vulnerability_support_ratio?: number | null
          wealth_circulated?: number | null
        }
        Update: {
          active_participants?: number | null
          created_at?: string | null
          date?: string
          id?: string
          network_density?: number | null
          total_hours_exchanged?: number | null
          trust_network_size?: number | null
          vulnerability_support_ratio?: number | null
          wealth_circulated?: number | null
        }
        Relationships: []
      }
      time_bank_transactions: {
        Row: {
          created_at: string | null
          description: string | null
          giver_id: string
          hours: number
          id: string
          mutual_aid_post_id: string | null
          receiver_id: string
          skill_category: string
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          giver_id: string
          hours: number
          id?: string
          mutual_aid_post_id?: string | null
          receiver_id: string
          skill_category: string
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          giver_id?: string
          hours?: number
          id?: string
          mutual_aid_post_id?: string | null
          receiver_id?: string
          skill_category?: string
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "time_bank_transactions_giver_id_fkey"
            columns: ["giver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_bank_transactions_mutual_aid_post_id_fkey"
            columns: ["mutual_aid_post_id"]
            isOneToOne: false
            referencedRelation: "mutual_aid_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_bank_transactions_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_bank_transactions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trust_relations: {
        Row: {
          created_at: string | null
          from_user_id: string
          id: string
          notes: string | null
          to_user_id: string
          trust_level: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          from_user_id: string
          id?: string
          notes?: string | null
          to_user_id: string
          trust_level?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          from_user_id?: string
          id?: string
          notes?: string | null
          to_user_id?: string
          trust_level?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trust_relations_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trust_relations_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_network_density: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      cleanup_expired_oauth_states: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_solidarity_metrics: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      fulfillment_status: "open" | "in_progress" | "fulfilled" | "expired"
      need_category:
        | "food"
        | "housing"
        | "transportation"
        | "childcare"
        | "healthcare"
        | "education"
        | "technology"
        | "labor"
        | "financial"
        | "emotional_support"
      urgency_level: "low" | "medium" | "high" | "critical"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      fulfillment_status: ["open", "in_progress", "fulfilled", "expired"],
      need_category: [
        "food",
        "housing",
        "transportation",
        "childcare",
        "healthcare",
        "education",
        "technology",
        "labor",
        "financial",
        "emotional_support",
      ],
      urgency_level: ["low", "medium", "high", "critical"],
    },
  },
} as const
