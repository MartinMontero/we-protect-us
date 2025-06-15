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
      activity_participants: {
        Row: {
          activity_id: string
          children_ids: string[]
          emergency_contact_override: Json | null
          id: string
          parent_id: string
          permission_slip_signed: boolean | null
          signed_up_at: string | null
          special_instructions: string | null
        }
        Insert: {
          activity_id: string
          children_ids: string[]
          emergency_contact_override?: Json | null
          id?: string
          parent_id: string
          permission_slip_signed?: boolean | null
          signed_up_at?: string | null
          special_instructions?: string | null
        }
        Update: {
          activity_id?: string
          children_ids?: string[]
          emergency_contact_override?: Json | null
          id?: string
          parent_id?: string
          permission_slip_signed?: boolean | null
          signed_up_at?: string | null
          special_instructions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_participants_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "group_activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_participants_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bulk_order_participants: {
        Row: {
          bulk_order_id: string
          created_at: string | null
          id: string
          notes: string | null
          participant_id: string
          quantity_requested: number
        }
        Insert: {
          bulk_order_id: string
          created_at?: string | null
          id?: string
          notes?: string | null
          participant_id: string
          quantity_requested: number
        }
        Update: {
          bulk_order_id?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          participant_id?: string
          quantity_requested?: number
        }
        Relationships: [
          {
            foreignKeyName: "bulk_order_participants_bulk_order_id_fkey"
            columns: ["bulk_order_id"]
            isOneToOne: false
            referencedRelation: "bulk_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bulk_order_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bulk_orders: {
        Row: {
          created_at: string | null
          current_quantity: number | null
          id: string
          item_name: string
          minimum_quantity: number | null
          notes: string | null
          order_deadline: string | null
          organizer_id: string
          status: string | null
          supplier: string | null
          unit_price: number | null
        }
        Insert: {
          created_at?: string | null
          current_quantity?: number | null
          id?: string
          item_name: string
          minimum_quantity?: number | null
          notes?: string | null
          order_deadline?: string | null
          organizer_id: string
          status?: string | null
          supplier?: string | null
          unit_price?: number | null
        }
        Update: {
          created_at?: string | null
          current_quantity?: number | null
          id?: string
          item_name?: string
          minimum_quantity?: number | null
          notes?: string | null
          order_deadline?: string | null
          organizer_id?: string
          status?: string | null
          supplier?: string | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bulk_orders_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      care_messages: {
        Row: {
          attachment_url: string | null
          care_session_id: string
          created_at: string | null
          id: string
          is_emergency: boolean | null
          message_content: string
          message_type: string | null
          read_at: string | null
          sender_id: string
        }
        Insert: {
          attachment_url?: string | null
          care_session_id: string
          created_at?: string | null
          id?: string
          is_emergency?: boolean | null
          message_content: string
          message_type?: string | null
          read_at?: string | null
          sender_id: string
        }
        Update: {
          attachment_url?: string | null
          care_session_id?: string
          created_at?: string | null
          id?: string
          is_emergency?: boolean | null
          message_content?: string
          message_type?: string | null
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_messages_care_session_id_fkey"
            columns: ["care_session_id"]
            isOneToOne: false
            referencedRelation: "care_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      care_points_transactions: {
        Row: {
          care_session_id: string | null
          created_at: string | null
          description: string | null
          id: string
          member_id: string
          points_change: number
          transaction_type: string
        }
        Insert: {
          care_session_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          member_id: string
          points_change: number
          transaction_type: string
        }
        Update: {
          care_session_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          member_id?: string
          points_change?: number
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_points_transactions_care_session_id_fkey"
            columns: ["care_session_id"]
            isOneToOne: false
            referencedRelation: "care_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_points_transactions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      care_requests: {
        Row: {
          care_instructions: string | null
          caregiver_id: string | null
          children_ids: string[]
          created_at: string | null
          emergency_instructions: string | null
          end_time: string
          id: string
          is_recurring: boolean | null
          last_minute_request: boolean | null
          location_address: string
          location_lat: number | null
          location_lng: number | null
          points_offered: number
          recurring_pattern: Json | null
          requesting_parent_id: string
          start_time: string
          status: Database["public"]["Enums"]["care_request_status"] | null
          updated_at: string | null
        }
        Insert: {
          care_instructions?: string | null
          caregiver_id?: string | null
          children_ids: string[]
          created_at?: string | null
          emergency_instructions?: string | null
          end_time: string
          id?: string
          is_recurring?: boolean | null
          last_minute_request?: boolean | null
          location_address: string
          location_lat?: number | null
          location_lng?: number | null
          points_offered: number
          recurring_pattern?: Json | null
          requesting_parent_id: string
          start_time: string
          status?: Database["public"]["Enums"]["care_request_status"] | null
          updated_at?: string | null
        }
        Update: {
          care_instructions?: string | null
          caregiver_id?: string | null
          children_ids?: string[]
          created_at?: string | null
          emergency_instructions?: string | null
          end_time?: string
          id?: string
          is_recurring?: boolean | null
          last_minute_request?: boolean | null
          location_address?: string
          location_lat?: number | null
          location_lng?: number | null
          points_offered?: number
          recurring_pattern?: Json | null
          requesting_parent_id?: string
          start_time?: string
          status?: Database["public"]["Enums"]["care_request_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "care_requests_caregiver_id_fkey"
            columns: ["caregiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_requests_requesting_parent_id_fkey"
            columns: ["requesting_parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      care_sessions: {
        Row: {
          actual_end: string | null
          actual_start: string | null
          care_request_id: string
          caregiver_id: string
          check_in_photo_url: string | null
          check_out_photo_url: string | null
          children_ids: string[]
          created_at: string | null
          id: string
          incident_reports: Json | null
          location_lat: number | null
          location_lng: number | null
          parent_id: string
          points_earned: number | null
          scheduled_end: string
          scheduled_start: string
          session_notes: string | null
          status: Database["public"]["Enums"]["session_status"] | null
          updated_at: string | null
        }
        Insert: {
          actual_end?: string | null
          actual_start?: string | null
          care_request_id: string
          caregiver_id: string
          check_in_photo_url?: string | null
          check_out_photo_url?: string | null
          children_ids: string[]
          created_at?: string | null
          id?: string
          incident_reports?: Json | null
          location_lat?: number | null
          location_lng?: number | null
          parent_id: string
          points_earned?: number | null
          scheduled_end: string
          scheduled_start: string
          session_notes?: string | null
          status?: Database["public"]["Enums"]["session_status"] | null
          updated_at?: string | null
        }
        Update: {
          actual_end?: string | null
          actual_start?: string | null
          care_request_id?: string
          caregiver_id?: string
          check_in_photo_url?: string | null
          check_out_photo_url?: string | null
          children_ids?: string[]
          created_at?: string | null
          id?: string
          incident_reports?: Json | null
          location_lat?: number | null
          location_lng?: number | null
          parent_id?: string
          points_earned?: number | null
          scheduled_end?: string
          scheduled_start?: string
          session_notes?: string | null
          status?: Database["public"]["Enums"]["session_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "care_sessions_care_request_id_fkey"
            columns: ["care_request_id"]
            isOneToOne: false
            referencedRelation: "care_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_sessions_caregiver_id_fkey"
            columns: ["caregiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_sessions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      caregiver_reviews: {
        Row: {
          care_session_id: string
          caregiver_id: string
          created_at: string | null
          id: string
          rating: number
          review_text: string | null
          reviewer_id: string
          tags: string[] | null
          would_recommend: boolean | null
        }
        Insert: {
          care_session_id: string
          caregiver_id: string
          created_at?: string | null
          id?: string
          rating: number
          review_text?: string | null
          reviewer_id: string
          tags?: string[] | null
          would_recommend?: boolean | null
        }
        Update: {
          care_session_id?: string
          caregiver_id?: string
          created_at?: string | null
          id?: string
          rating?: number
          review_text?: string | null
          reviewer_id?: string
          tags?: string[] | null
          would_recommend?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "caregiver_reviews_care_session_id_fkey"
            columns: ["care_session_id"]
            isOneToOne: false
            referencedRelation: "care_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "caregiver_reviews_caregiver_id_fkey"
            columns: ["caregiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "caregiver_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
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
      children: {
        Row: {
          allergies: string[] | null
          birth_date: string
          created_at: string | null
          dietary_restrictions: string[] | null
          emergency_instructions: string | null
          favorite_activities: string[] | null
          first_name: string
          gender: string | null
          id: string
          medical_conditions: string[] | null
          medications: Json | null
          parent_id: string
          photo_url: string | null
          special_needs: string | null
          updated_at: string | null
        }
        Insert: {
          allergies?: string[] | null
          birth_date: string
          created_at?: string | null
          dietary_restrictions?: string[] | null
          emergency_instructions?: string | null
          favorite_activities?: string[] | null
          first_name: string
          gender?: string | null
          id?: string
          medical_conditions?: string[] | null
          medications?: Json | null
          parent_id: string
          photo_url?: string | null
          special_needs?: string | null
          updated_at?: string | null
        }
        Update: {
          allergies?: string[] | null
          birth_date?: string
          created_at?: string | null
          dietary_restrictions?: string[] | null
          emergency_instructions?: string | null
          favorite_activities?: string[] | null
          first_name?: string
          gender?: string | null
          id?: string
          medical_conditions?: string[] | null
          medications?: Json | null
          parent_id?: string
          photo_url?: string | null
          special_needs?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "children_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      compost_bins: {
        Row: {
          bin_name: string
          created_at: string | null
          current_stage: string | null
          estimated_ready_date: string | null
          id: string
          last_turned_date: string | null
          location_description: string | null
          notes: string | null
          temperature: number | null
          updated_at: string | null
        }
        Insert: {
          bin_name: string
          created_at?: string | null
          current_stage?: string | null
          estimated_ready_date?: string | null
          id?: string
          last_turned_date?: string | null
          location_description?: string | null
          notes?: string | null
          temperature?: number | null
          updated_at?: string | null
        }
        Update: {
          bin_name?: string
          created_at?: string | null
          current_stage?: string | null
          estimated_ready_date?: string | null
          id?: string
          last_turned_date?: string | null
          location_description?: string | null
          notes?: string | null
          temperature?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      consent_forms: {
        Row: {
          child_id: string
          created_at: string | null
          digital_signature: string | null
          expires_date: string | null
          form_data: Json | null
          form_type: string
          form_version: string
          id: string
          parent_id: string
          signed_date: string
          witness_signature: string | null
        }
        Insert: {
          child_id: string
          created_at?: string | null
          digital_signature?: string | null
          expires_date?: string | null
          form_data?: Json | null
          form_type: string
          form_version: string
          id?: string
          parent_id: string
          signed_date: string
          witness_signature?: string | null
        }
        Update: {
          child_id?: string
          created_at?: string | null
          digital_signature?: string | null
          expires_date?: string | null
          form_data?: Json | null
          form_type?: string
          form_version?: string
          id?: string
          parent_id?: string
          signed_date?: string
          witness_signature?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consent_forms_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_forms_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      current_plantings: {
        Row: {
          actual_harvest_date: string | null
          companion_plants: string[] | null
          created_at: string | null
          crop_name: string
          expected_harvest_date: string | null
          gardener_id: string
          id: string
          notes: string | null
          planted_date: string
          plot_id: string
          variety: string | null
        }
        Insert: {
          actual_harvest_date?: string | null
          companion_plants?: string[] | null
          created_at?: string | null
          crop_name: string
          expected_harvest_date?: string | null
          gardener_id: string
          id?: string
          notes?: string | null
          planted_date: string
          plot_id: string
          variety?: string | null
        }
        Update: {
          actual_harvest_date?: string | null
          companion_plants?: string[] | null
          created_at?: string | null
          crop_name?: string
          expected_harvest_date?: string | null
          gardener_id?: string
          id?: string
          notes?: string | null
          planted_date?: string
          plot_id?: string
          variety?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "current_plantings_gardener_id_fkey"
            columns: ["gardener_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "current_plantings_plot_id_fkey"
            columns: ["plot_id"]
            isOneToOne: false
            referencedRelation: "garden_plots"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_contacts: {
        Row: {
          address: string | null
          child_id: string
          created_at: string | null
          email: string | null
          id: string
          is_authorized_pickup: boolean | null
          name: string
          phone_number: string
          priority_order: number | null
          relationship: Database["public"]["Enums"]["emergency_contact_relationship"]
        }
        Insert: {
          address?: string | null
          child_id: string
          created_at?: string | null
          email?: string | null
          id?: string
          is_authorized_pickup?: boolean | null
          name: string
          phone_number: string
          priority_order?: number | null
          relationship: Database["public"]["Enums"]["emergency_contact_relationship"]
        }
        Update: {
          address?: string | null
          child_id?: string
          created_at?: string | null
          email?: string | null
          id?: string
          is_authorized_pickup?: boolean | null
          name?: string
          phone_number?: string
          priority_order?: number | null
          relationship?: Database["public"]["Enums"]["emergency_contact_relationship"]
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      garden_knowledge: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string | null
          helpful_votes: number | null
          id: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "garden_knowledge_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      garden_plots: {
        Row: {
          assigned_date: string | null
          coordinates: Json | null
          created_at: string | null
          current_gardener_id: string | null
          id: string
          notes: string | null
          plot_number: string
          raised_bed: boolean | null
          size_sqft: number
          soil_type: Database["public"]["Enums"]["soil_type"]
          status: Database["public"]["Enums"]["plot_status"] | null
          sun_exposure: Database["public"]["Enums"]["sun_exposure"]
          updated_at: string | null
          water_access: boolean | null
        }
        Insert: {
          assigned_date?: string | null
          coordinates?: Json | null
          created_at?: string | null
          current_gardener_id?: string | null
          id?: string
          notes?: string | null
          plot_number: string
          raised_bed?: boolean | null
          size_sqft: number
          soil_type: Database["public"]["Enums"]["soil_type"]
          status?: Database["public"]["Enums"]["plot_status"] | null
          sun_exposure: Database["public"]["Enums"]["sun_exposure"]
          updated_at?: string | null
          water_access?: boolean | null
        }
        Update: {
          assigned_date?: string | null
          coordinates?: Json | null
          created_at?: string | null
          current_gardener_id?: string | null
          id?: string
          notes?: string | null
          plot_number?: string
          raised_bed?: boolean | null
          size_sqft?: number
          soil_type?: Database["public"]["Enums"]["soil_type"]
          status?: Database["public"]["Enums"]["plot_status"] | null
          sun_exposure?: Database["public"]["Enums"]["sun_exposure"]
          updated_at?: string | null
          water_access?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "garden_plots_current_gardener_id_fkey"
            columns: ["current_gardener_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      group_activities: {
        Row: {
          activity_type: string
          age_max: number | null
          age_min: number | null
          cost_per_child: number | null
          created_at: string | null
          description: string | null
          id: string
          location_address: string | null
          location_lat: number | null
          location_lng: number | null
          location_name: string | null
          max_children: number | null
          organizer_id: string
          requires_permission_slip: boolean | null
          scheduled_date: string
          title: string
        }
        Insert: {
          activity_type: string
          age_max?: number | null
          age_min?: number | null
          cost_per_child?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          location_name?: string | null
          max_children?: number | null
          organizer_id: string
          requires_permission_slip?: boolean | null
          scheduled_date: string
          title: string
        }
        Update: {
          activity_type?: string
          age_max?: number | null
          age_min?: number | null
          cost_per_child?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          location_name?: string | null
          max_children?: number | null
          organizer_id?: string
          requires_permission_slip?: boolean | null
          scheduled_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_activities_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      harvest_sharing: {
        Row: {
          available_date: string | null
          claimed_at: string | null
          claimed_by: string | null
          created_at: string | null
          crop_name: string
          gardener_id: string
          id: string
          location_description: string | null
          notes: string | null
          quantity: string
          unit: string
        }
        Insert: {
          available_date?: string | null
          claimed_at?: string | null
          claimed_by?: string | null
          created_at?: string | null
          crop_name: string
          gardener_id: string
          id?: string
          location_description?: string | null
          notes?: string | null
          quantity: string
          unit: string
        }
        Update: {
          available_date?: string | null
          claimed_at?: string | null
          claimed_by?: string | null
          created_at?: string | null
          crop_name?: string
          gardener_id?: string
          id?: string
          location_description?: string | null
          notes?: string | null
          quantity?: string
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "harvest_sharing_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "harvest_sharing_gardener_id_fkey"
            columns: ["gardener_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      member_references: {
        Row: {
          contacted_date: string | null
          created_at: string | null
          id: string
          member_id: string
          notes: string | null
          reference_email: string | null
          reference_name: string
          reference_phone: string
          relationship: string
          verified: boolean | null
        }
        Insert: {
          contacted_date?: string | null
          created_at?: string | null
          id?: string
          member_id: string
          notes?: string | null
          reference_email?: string | null
          reference_name: string
          reference_phone: string
          relationship: string
          verified?: boolean | null
        }
        Update: {
          contacted_date?: string | null
          created_at?: string | null
          id?: string
          member_id?: string
          notes?: string | null
          reference_email?: string | null
          reference_name?: string
          reference_phone?: string
          relationship?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "member_references_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      member_skill_badges: {
        Row: {
          badge_type: Database["public"]["Enums"]["skill_badge_type"]
          certificate_url: string | null
          certification_date: string | null
          created_at: string | null
          expiry_date: string | null
          id: string
          member_id: string
          verified: boolean | null
        }
        Insert: {
          badge_type: Database["public"]["Enums"]["skill_badge_type"]
          certificate_url?: string | null
          certification_date?: string | null
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          member_id: string
          verified?: boolean | null
        }
        Update: {
          badge_type?: Database["public"]["Enums"]["skill_badge_type"]
          certificate_url?: string | null
          certification_date?: string | null
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          member_id?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "member_skill_badges_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      member_verification: {
        Row: {
          background_check_completed: boolean | null
          background_check_provider: string | null
          created_at: string | null
          documents_submitted: boolean | null
          id: string
          member_id: string
          references_verified: number | null
          updated_at: string | null
          verification_date: string | null
          verification_notes: string | null
          verified_by: string | null
        }
        Insert: {
          background_check_completed?: boolean | null
          background_check_provider?: string | null
          created_at?: string | null
          documents_submitted?: boolean | null
          id?: string
          member_id: string
          references_verified?: number | null
          updated_at?: string | null
          verification_date?: string | null
          verification_notes?: string | null
          verified_by?: string | null
        }
        Update: {
          background_check_completed?: boolean | null
          background_check_provider?: string | null
          created_at?: string | null
          documents_submitted?: boolean | null
          id?: string
          member_id?: string
          references_verified?: number | null
          updated_at?: string | null
          verification_date?: string | null
          verification_notes?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_verification_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_verification_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      plot_history: {
        Row: {
          created_at: string | null
          crops_grown: string[] | null
          end_date: string | null
          gardener_id: string | null
          id: string
          notes: string | null
          plot_id: string
          start_date: string
        }
        Insert: {
          created_at?: string | null
          crops_grown?: string[] | null
          end_date?: string | null
          gardener_id?: string | null
          id?: string
          notes?: string | null
          plot_id: string
          start_date: string
        }
        Update: {
          created_at?: string | null
          crops_grown?: string[] | null
          end_date?: string | null
          gardener_id?: string | null
          id?: string
          notes?: string | null
          plot_id?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "plot_history_gardener_id_fkey"
            columns: ["gardener_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plot_history_plot_id_fkey"
            columns: ["plot_id"]
            isOneToOne: false
            referencedRelation: "garden_plots"
            referencedColumns: ["id"]
          },
        ]
      }
      plot_waitlist: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          join_date: string | null
          notes: string | null
          plot_preferences: Json | null
          priority_score: number | null
          user_id: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          join_date?: string | null
          notes?: string | null
          plot_preferences?: Json | null
          priority_score?: number | null
          user_id: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          join_date?: string | null
          notes?: string | null
          plot_preferences?: Json | null
          priority_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plot_waitlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          background_check_date: string | null
          bio: string | null
          care_philosophy: string | null
          care_points_balance: number | null
          created_at: string | null
          id: string
          location_lat: number | null
          location_lng: number | null
          max_children_capacity: number | null
          phone_number: string | null
          pseudonym: string
          skills: string[] | null
          time_bank_hours: number | null
          trust_score: number | null
          updated_at: string | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          vulnerability_factors: string[] | null
          years_experience: number | null
        }
        Insert: {
          address?: string | null
          background_check_date?: string | null
          bio?: string | null
          care_philosophy?: string | null
          care_points_balance?: number | null
          created_at?: string | null
          id: string
          location_lat?: number | null
          location_lng?: number | null
          max_children_capacity?: number | null
          phone_number?: string | null
          pseudonym: string
          skills?: string[] | null
          time_bank_hours?: number | null
          trust_score?: number | null
          updated_at?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          vulnerability_factors?: string[] | null
          years_experience?: number | null
        }
        Update: {
          address?: string | null
          background_check_date?: string | null
          bio?: string | null
          care_philosophy?: string | null
          care_points_balance?: number | null
          created_at?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          max_children_capacity?: number | null
          phone_number?: string | null
          pseudonym?: string
          skills?: string[] | null
          time_bank_hours?: number | null
          trust_score?: number | null
          updated_at?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          vulnerability_factors?: string[] | null
          years_experience?: number | null
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
      seed_library: {
        Row: {
          created_at: string | null
          crop_type: string
          days_to_maturity: number | null
          donated_by: string | null
          germination_rate: number | null
          harvest_year: number | null
          id: string
          planting_instructions: string | null
          quantity_available: number | null
          updated_at: string | null
          variety_name: string
        }
        Insert: {
          created_at?: string | null
          crop_type: string
          days_to_maturity?: number | null
          donated_by?: string | null
          germination_rate?: number | null
          harvest_year?: number | null
          id?: string
          planting_instructions?: string | null
          quantity_available?: number | null
          updated_at?: string | null
          variety_name: string
        }
        Update: {
          created_at?: string | null
          crop_type?: string
          days_to_maturity?: number | null
          donated_by?: string | null
          germination_rate?: number | null
          harvest_year?: number | null
          id?: string
          planting_instructions?: string | null
          quantity_available?: number | null
          updated_at?: string | null
          variety_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "seed_library_donated_by_fkey"
            columns: ["donated_by"]
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
      tool_issues: {
        Row: {
          created_at: string | null
          id: string
          issue_description: string
          photos: string[] | null
          reporter_id: string
          reservation_id: string | null
          resolution_notes: string | null
          resolved: boolean | null
          severity: string
          tool_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          issue_description: string
          photos?: string[] | null
          reporter_id: string
          reservation_id?: string | null
          resolution_notes?: string | null
          resolved?: boolean | null
          severity?: string
          tool_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          issue_description?: string
          photos?: string[] | null
          reporter_id?: string
          reservation_id?: string | null
          resolution_notes?: string | null
          resolved?: boolean | null
          severity?: string
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_issues_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_issues_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "tool_reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_issues_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_maintenance: {
        Row: {
          completed_date: string | null
          cost: number | null
          created_at: string | null
          description: string
          id: string
          maintenance_type: string
          parts_needed: string[] | null
          photos: string[] | null
          tool_id: string
          volunteer_id: string | null
        }
        Insert: {
          completed_date?: string | null
          cost?: number | null
          created_at?: string | null
          description: string
          id?: string
          maintenance_type: string
          parts_needed?: string[] | null
          photos?: string[] | null
          tool_id: string
          volunteer_id?: string | null
        }
        Update: {
          completed_date?: string | null
          cost?: number | null
          created_at?: string | null
          description?: string
          id?: string
          maintenance_type?: string
          parts_needed?: string[] | null
          photos?: string[] | null
          tool_id?: string
          volunteer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_maintenance_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_maintenance_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_reservations: {
        Row: {
          actual_return_date: string | null
          borrower_id: string
          created_at: string | null
          end_date: string
          id: string
          notes: string | null
          start_date: string
          status: Database["public"]["Enums"]["reservation_status"] | null
          time_credits_earned: number | null
          tool_id: string
          updated_at: string | null
        }
        Insert: {
          actual_return_date?: string | null
          borrower_id: string
          created_at?: string | null
          end_date: string
          id?: string
          notes?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["reservation_status"] | null
          time_credits_earned?: number | null
          tool_id: string
          updated_at?: string | null
        }
        Update: {
          actual_return_date?: string | null
          borrower_id?: string
          created_at?: string | null
          end_date?: string
          id?: string
          notes?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["reservation_status"] | null
          time_credits_earned?: number | null
          tool_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_reservations_borrower_id_fkey"
            columns: ["borrower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_reservations_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tools: {
        Row: {
          availability_status: boolean | null
          category: Database["public"]["Enums"]["tool_category"]
          condition: Database["public"]["Enums"]["tool_condition"]
          created_at: string | null
          description: string | null
          estimated_value: number | null
          id: string
          location_description: string | null
          location_lat: number | null
          location_lng: number | null
          name: string
          owner_id: string | null
          photos: string[] | null
          purchase_date: string | null
          qr_code: string | null
          updated_at: string | null
        }
        Insert: {
          availability_status?: boolean | null
          category: Database["public"]["Enums"]["tool_category"]
          condition?: Database["public"]["Enums"]["tool_condition"]
          created_at?: string | null
          description?: string | null
          estimated_value?: number | null
          id?: string
          location_description?: string | null
          location_lat?: number | null
          location_lng?: number | null
          name: string
          owner_id?: string | null
          photos?: string[] | null
          purchase_date?: string | null
          qr_code?: string | null
          updated_at?: string | null
        }
        Update: {
          availability_status?: boolean | null
          category?: Database["public"]["Enums"]["tool_category"]
          condition?: Database["public"]["Enums"]["tool_condition"]
          created_at?: string | null
          description?: string | null
          estimated_value?: number | null
          id?: string
          location_description?: string | null
          location_lat?: number | null
          location_lng?: number | null
          name?: string
          owner_id?: string | null
          photos?: string[] | null
          purchase_date?: string | null
          qr_code?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tools_owner_id_fkey"
            columns: ["owner_id"]
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
      work_parties: {
        Row: {
          created_at: string | null
          description: string | null
          duration_hours: number | null
          id: string
          max_participants: number | null
          organizer_id: string
          scheduled_date: string
          status: Database["public"]["Enums"]["work_party_status"] | null
          tasks: Json | null
          title: string
          tools_needed: string[] | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_hours?: number | null
          id?: string
          max_participants?: number | null
          organizer_id: string
          scheduled_date: string
          status?: Database["public"]["Enums"]["work_party_status"] | null
          tasks?: Json | null
          title: string
          tools_needed?: string[] | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_hours?: number | null
          id?: string
          max_participants?: number | null
          organizer_id?: string
          scheduled_date?: string
          status?: Database["public"]["Enums"]["work_party_status"] | null
          tasks?: Json | null
          title?: string
          tools_needed?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "work_parties_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      work_party_participants: {
        Row: {
          attended: boolean | null
          id: string
          participant_id: string
          signed_up_at: string | null
          work_party_id: string
        }
        Insert: {
          attended?: boolean | null
          id?: string
          participant_id: string
          signed_up_at?: string | null
          work_party_id: string
        }
        Update: {
          attended?: boolean | null
          id?: string
          participant_id?: string
          signed_up_at?: string | null
          work_party_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_party_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_party_participants_work_party_id_fkey"
            columns: ["work_party_id"]
            isOneToOne: false
            referencedRelation: "work_parties"
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
      care_request_status:
        | "open"
        | "accepted"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
      crop_season: "spring" | "summer" | "fall" | "winter" | "year_round"
      emergency_contact_relationship:
        | "parent"
        | "guardian"
        | "grandparent"
        | "relative"
        | "family_friend"
        | "other"
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
      plot_status: "available" | "assigned" | "reserved" | "maintenance"
      reservation_status:
        | "pending"
        | "approved"
        | "active"
        | "completed"
        | "cancelled"
        | "overdue"
      session_status:
        | "scheduled"
        | "checked_in"
        | "in_progress"
        | "checked_out"
        | "completed"
        | "emergency"
      skill_badge_type:
        | "cpr_certified"
        | "first_aid"
        | "special_needs"
        | "infant_care"
        | "toddler_specialist"
        | "homework_help"
        | "music_activities"
        | "outdoor_activities"
      soil_type: "clay" | "sandy" | "loamy" | "rocky" | "amended"
      sun_exposure: "full_sun" | "partial_sun" | "partial_shade" | "full_shade"
      tool_category:
        | "power_tools"
        | "garden_equipment"
        | "kitchen_appliances"
        | "camping_gear"
        | "party_supplies"
        | "electronics"
        | "hand_tools"
        | "cleaning_equipment"
        | "automotive"
        | "sports_recreation"
        | "home_improvement"
        | "art_craft"
      tool_condition:
        | "excellent"
        | "good"
        | "fair"
        | "needs_repair"
        | "out_of_service"
      urgency_level: "low" | "medium" | "high" | "critical"
      verification_status:
        | "pending"
        | "documents_submitted"
        | "references_pending"
        | "background_check_pending"
        | "approved"
        | "rejected"
        | "suspended"
      work_party_status: "planned" | "active" | "completed" | "cancelled"
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
      care_request_status: [
        "open",
        "accepted",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
      ],
      crop_season: ["spring", "summer", "fall", "winter", "year_round"],
      emergency_contact_relationship: [
        "parent",
        "guardian",
        "grandparent",
        "relative",
        "family_friend",
        "other",
      ],
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
      plot_status: ["available", "assigned", "reserved", "maintenance"],
      reservation_status: [
        "pending",
        "approved",
        "active",
        "completed",
        "cancelled",
        "overdue",
      ],
      session_status: [
        "scheduled",
        "checked_in",
        "in_progress",
        "checked_out",
        "completed",
        "emergency",
      ],
      skill_badge_type: [
        "cpr_certified",
        "first_aid",
        "special_needs",
        "infant_care",
        "toddler_specialist",
        "homework_help",
        "music_activities",
        "outdoor_activities",
      ],
      soil_type: ["clay", "sandy", "loamy", "rocky", "amended"],
      sun_exposure: ["full_sun", "partial_sun", "partial_shade", "full_shade"],
      tool_category: [
        "power_tools",
        "garden_equipment",
        "kitchen_appliances",
        "camping_gear",
        "party_supplies",
        "electronics",
        "hand_tools",
        "cleaning_equipment",
        "automotive",
        "sports_recreation",
        "home_improvement",
        "art_craft",
      ],
      tool_condition: [
        "excellent",
        "good",
        "fair",
        "needs_repair",
        "out_of_service",
      ],
      urgency_level: ["low", "medium", "high", "critical"],
      verification_status: [
        "pending",
        "documents_submitted",
        "references_pending",
        "background_check_pending",
        "approved",
        "rejected",
        "suspended",
      ],
      work_party_status: ["planned", "active", "completed", "cancelled"],
    },
  },
} as const
