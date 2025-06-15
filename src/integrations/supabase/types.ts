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
      advocacy_campaigns: {
        Row: {
          action_items: Json | null
          campaign_name: string
          contact_officials: Json | null
          created_at: string | null
          current_signatures: number | null
          description: string | null
          id: string
          meeting_schedule: Json | null
          organizer_id: string
          petition_text: string | null
          resources: Json | null
          status: string | null
          target_outcome: string | null
          target_signatures: number | null
          updated_at: string | null
        }
        Insert: {
          action_items?: Json | null
          campaign_name: string
          contact_officials?: Json | null
          created_at?: string | null
          current_signatures?: number | null
          description?: string | null
          id?: string
          meeting_schedule?: Json | null
          organizer_id: string
          petition_text?: string | null
          resources?: Json | null
          status?: string | null
          target_outcome?: string | null
          target_signatures?: number | null
          updated_at?: string | null
        }
        Update: {
          action_items?: Json | null
          campaign_name?: string
          contact_officials?: Json | null
          created_at?: string | null
          current_signatures?: number | null
          description?: string | null
          id?: string
          meeting_schedule?: Json | null
          organizer_id?: string
          petition_text?: string | null
          resources?: Json | null
          status?: string | null
          target_outcome?: string | null
          target_signatures?: number | null
          updated_at?: string | null
        }
        Relationships: []
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
      campaign_actions: {
        Row: {
          action_name: string
          action_type: string
          campaign_id: string
          created_at: string | null
          current_participants: number | null
          description: string | null
          id: string
          legal_observers_needed: number | null
          location_address: string | null
          location_lat: number | null
          location_lng: number | null
          max_participants: number | null
          organizer_id: string
          scheduled_date: string | null
          security_considerations: string | null
        }
        Insert: {
          action_name: string
          action_type: string
          campaign_id: string
          created_at?: string | null
          current_participants?: number | null
          description?: string | null
          id?: string
          legal_observers_needed?: number | null
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          max_participants?: number | null
          organizer_id: string
          scheduled_date?: string | null
          security_considerations?: string | null
        }
        Update: {
          action_name?: string
          action_type?: string
          campaign_id?: string
          created_at?: string | null
          current_participants?: number | null
          description?: string | null
          id?: string
          legal_observers_needed?: number | null
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          max_participants?: number | null
          organizer_id?: string
          scheduled_date?: string | null
          security_considerations?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_actions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "organizing_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_stories: {
        Row: {
          campaign_id: string
          consent_for_media: boolean | null
          created_at: string | null
          id: string
          is_anonymous: boolean | null
          story_content: string
          story_tags: Json | null
          story_title: string
          storyteller_id: string
        }
        Insert: {
          campaign_id: string
          consent_for_media?: boolean | null
          created_at?: string | null
          id?: string
          is_anonymous?: boolean | null
          story_content: string
          story_tags?: Json | null
          story_title: string
          storyteller_id: string
        }
        Update: {
          campaign_id?: string
          consent_for_media?: boolean | null
          created_at?: string | null
          id?: string
          is_anonymous?: boolean | null
          story_content?: string
          story_tags?: Json | null
          story_title?: string
          storyteller_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_stories_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "organizing_campaigns"
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
      celebration_reminders: {
        Row: {
          celebration_date: string
          celebration_type: string
          created_at: string | null
          description: string | null
          elder_id: string
          id: string
          is_recurring: boolean | null
          notification_recipients: string[] | null
          recurring_interval: string | null
          reminder_days_before: number[] | null
          title: string
        }
        Insert: {
          celebration_date: string
          celebration_type: string
          created_at?: string | null
          description?: string | null
          elder_id: string
          id?: string
          is_recurring?: boolean | null
          notification_recipients?: string[] | null
          recurring_interval?: string | null
          reminder_days_before?: number[] | null
          title: string
        }
        Update: {
          celebration_date?: string
          celebration_type?: string
          created_at?: string | null
          description?: string | null
          elder_id?: string
          id?: string
          is_recurring?: boolean | null
          notification_recipients?: string[] | null
          recurring_interval?: string | null
          reminder_days_before?: number[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "celebration_reminders_elder_id_fkey"
            columns: ["elder_id"]
            isOneToOne: false
            referencedRelation: "elder_profiles"
            referencedColumns: ["id"]
          },
        ]
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
      communication_nodes: {
        Row: {
          access_level: string | null
          backup_power_hours: number | null
          callsign: string | null
          capabilities: string[] | null
          connected_nodes: string[] | null
          contact_schedule: Json | null
          coverage_radius_miles: number | null
          created_at: string | null
          equipment_details: Json | null
          frequency_bands: string[] | null
          id: string
          location_description: string
          location_lat: number | null
          location_lng: number | null
          node_type: string
          operational_status: string | null
          operator_id: string
          power_source: string
          updated_at: string | null
        }
        Insert: {
          access_level?: string | null
          backup_power_hours?: number | null
          callsign?: string | null
          capabilities?: string[] | null
          connected_nodes?: string[] | null
          contact_schedule?: Json | null
          coverage_radius_miles?: number | null
          created_at?: string | null
          equipment_details?: Json | null
          frequency_bands?: string[] | null
          id?: string
          location_description: string
          location_lat?: number | null
          location_lng?: number | null
          node_type: string
          operational_status?: string | null
          operator_id: string
          power_source: string
          updated_at?: string | null
        }
        Update: {
          access_level?: string | null
          backup_power_hours?: number | null
          callsign?: string | null
          capabilities?: string[] | null
          connected_nodes?: string[] | null
          contact_schedule?: Json | null
          coverage_radius_miles?: number | null
          created_at?: string | null
          equipment_details?: Json | null
          frequency_bands?: string[] | null
          id?: string
          location_description?: string
          location_lat?: number | null
          location_lng?: number | null
          node_type?: string
          operational_status?: string | null
          operator_id?: string
          power_source?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      community_resources: {
        Row: {
          access_instructions: string | null
          availability_status: string | null
          capacity: string | null
          contact_preference: string | null
          created_at: string | null
          description: string | null
          household_id: string | null
          id: string
          location_description: string | null
          location_lat: number | null
          location_lng: number | null
          owner_id: string
          resource_name: string
          resource_type: string
          sharing_conditions: string | null
          updated_at: string | null
        }
        Insert: {
          access_instructions?: string | null
          availability_status?: string | null
          capacity?: string | null
          contact_preference?: string | null
          created_at?: string | null
          description?: string | null
          household_id?: string | null
          id?: string
          location_description?: string | null
          location_lat?: number | null
          location_lng?: number | null
          owner_id: string
          resource_name: string
          resource_type: string
          sharing_conditions?: string | null
          updated_at?: string | null
        }
        Update: {
          access_instructions?: string | null
          availability_status?: string | null
          capacity?: string | null
          contact_preference?: string | null
          created_at?: string | null
          description?: string | null
          household_id?: string | null
          id?: string
          location_description?: string | null
          location_lat?: number | null
          location_lng?: number | null
          owner_id?: string
          resource_name?: string
          resource_type?: string
          sharing_conditions?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_resources_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
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
      corporate_violations: {
        Row: {
          company_name: string
          created_at: string | null
          description: string | null
          fine_amount: number | null
          id: string
          location_affected: string | null
          regulatory_agency: string | null
          source_documents: Json | null
          status: string | null
          violation_date: string
          violation_type: string
        }
        Insert: {
          company_name: string
          created_at?: string | null
          description?: string | null
          fine_amount?: number | null
          id?: string
          location_affected?: string | null
          regulatory_agency?: string | null
          source_documents?: Json | null
          status?: string | null
          violation_date: string
          violation_type: string
        }
        Update: {
          company_name?: string
          created_at?: string | null
          description?: string | null
          fine_amount?: number | null
          id?: string
          location_affected?: string | null
          regulatory_agency?: string | null
          source_documents?: Json | null
          status?: string | null
          violation_date?: string
          violation_type?: string
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          completed_at: string | null
          course_id: string
          enrolled_at: string | null
          id: string
          notes: string | null
          progress_percentage: number | null
          student_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          enrolled_at?: string | null
          id?: string
          notes?: string | null
          progress_percentage?: number | null
          student_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          enrolled_at?: string | null
          id?: string
          notes?: string | null
          progress_percentage?: number | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_lessons: {
        Row: {
          assignments: Json | null
          content: string
          course_id: string
          created_at: string | null
          estimated_duration_minutes: number | null
          id: string
          lesson_order: number
          resources: Json | null
          title: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          assignments?: Json | null
          content: string
          course_id: string
          created_at?: string | null
          estimated_duration_minutes?: number | null
          id?: string
          lesson_order: number
          resources?: Json | null
          title: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          assignments?: Json | null
          content?: string
          course_id?: string
          created_at?: string | null
          estimated_duration_minutes?: number | null
          id?: string
          lesson_order?: number
          resources?: Json | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string | null
          creator_id: string
          curriculum: Json | null
          description: string | null
          difficulty_level: Database["public"]["Enums"]["skill_level"]
          duration_weeks: number | null
          featured_image_url: string | null
          id: string
          learning_format: Database["public"]["Enums"]["learning_format"]
          location_details: string | null
          location_type: Database["public"]["Enums"]["location_type"]
          max_participants: number | null
          price: number | null
          resources: Json | null
          skill_ids: string[] | null
          status: Database["public"]["Enums"]["course_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          curriculum?: Json | null
          description?: string | null
          difficulty_level: Database["public"]["Enums"]["skill_level"]
          duration_weeks?: number | null
          featured_image_url?: string | null
          id?: string
          learning_format: Database["public"]["Enums"]["learning_format"]
          location_details?: string | null
          location_type: Database["public"]["Enums"]["location_type"]
          max_participants?: number | null
          price?: number | null
          resources?: Json | null
          skill_ids?: string[] | null
          status?: Database["public"]["Enums"]["course_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          curriculum?: Json | null
          description?: string | null
          difficulty_level?: Database["public"]["Enums"]["skill_level"]
          duration_weeks?: number | null
          featured_image_url?: string | null
          id?: string
          learning_format?: Database["public"]["Enums"]["learning_format"]
          location_details?: string | null
          location_type?: Database["public"]["Enums"]["location_type"]
          max_participants?: number | null
          price?: number | null
          resources?: Json | null
          skill_ids?: string[] | null
          status?: Database["public"]["Enums"]["course_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
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
      damage_reports: {
        Row: {
          access_blocked: boolean | null
          assigned_to: string | null
          created_at: string | null
          description: string
          estimated_repair_time: string | null
          id: string
          immediate_needs: string[] | null
          incident_type: string
          location_description: string
          location_lat: number | null
          location_lng: number | null
          people_affected: number | null
          photos: string[] | null
          priority_level: number | null
          reporter_id: string
          resolution_notes: string | null
          safety_hazards: string[] | null
          severity: string
          status: string | null
          updated_at: string | null
          utilities_affected: string[] | null
        }
        Insert: {
          access_blocked?: boolean | null
          assigned_to?: string | null
          created_at?: string | null
          description: string
          estimated_repair_time?: string | null
          id?: string
          immediate_needs?: string[] | null
          incident_type: string
          location_description: string
          location_lat?: number | null
          location_lng?: number | null
          people_affected?: number | null
          photos?: string[] | null
          priority_level?: number | null
          reporter_id: string
          resolution_notes?: string | null
          safety_hazards?: string[] | null
          severity: string
          status?: string | null
          updated_at?: string | null
          utilities_affected?: string[] | null
        }
        Update: {
          access_blocked?: boolean | null
          assigned_to?: string | null
          created_at?: string | null
          description?: string
          estimated_repair_time?: string | null
          id?: string
          immediate_needs?: string[] | null
          incident_type?: string
          location_description?: string
          location_lat?: number | null
          location_lng?: number | null
          people_affected?: number | null
          photos?: string[] | null
          priority_level?: number | null
          reporter_id?: string
          resolution_notes?: string | null
          safety_hazards?: string[] | null
          severity?: string
          status?: string | null
          updated_at?: string | null
          utilities_affected?: string[] | null
        }
        Relationships: []
      }
      development_projects: {
        Row: {
          address: string
          affordable_units: number | null
          created_at: string | null
          developer_name: string | null
          documents: Json | null
          id: string
          opposition_campaign_id: string | null
          project_name: string
          project_type: string | null
          public_hearing_dates: Json | null
          status: string | null
          units_proposed: number | null
          updated_at: string | null
        }
        Insert: {
          address: string
          affordable_units?: number | null
          created_at?: string | null
          developer_name?: string | null
          documents?: Json | null
          id?: string
          opposition_campaign_id?: string | null
          project_name: string
          project_type?: string | null
          public_hearing_dates?: Json | null
          status?: string | null
          units_proposed?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          affordable_units?: number | null
          created_at?: string | null
          developer_name?: string | null
          documents?: Json | null
          id?: string
          opposition_campaign_id?: string | null
          project_name?: string
          project_type?: string | null
          public_hearing_dates?: Json | null
          status?: string | null
          units_proposed?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      distribution_points: {
        Row: {
          access_requirements: string[] | null
          address: string
          available_resources: Json | null
          capacity_people_per_hour: number | null
          created_at: string | null
          current_volunteers_count: number | null
          distribution_limits: Json | null
          distribution_type: string
          id: string
          location_lat: number | null
          location_lng: number | null
          manager_id: string | null
          notes: string | null
          operating_schedule: Json | null
          point_name: string
          special_accommodations: string[] | null
          status: string | null
          updated_at: string | null
          volunteer_needed_count: number | null
        }
        Insert: {
          access_requirements?: string[] | null
          address: string
          available_resources?: Json | null
          capacity_people_per_hour?: number | null
          created_at?: string | null
          current_volunteers_count?: number | null
          distribution_limits?: Json | null
          distribution_type: string
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          manager_id?: string | null
          notes?: string | null
          operating_schedule?: Json | null
          point_name: string
          special_accommodations?: string[] | null
          status?: string | null
          updated_at?: string | null
          volunteer_needed_count?: number | null
        }
        Update: {
          access_requirements?: string[] | null
          address?: string
          available_resources?: Json | null
          capacity_people_per_hour?: number | null
          created_at?: string | null
          current_volunteers_count?: number | null
          distribution_limits?: Json | null
          distribution_type?: string
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          manager_id?: string | null
          notes?: string | null
          operating_schedule?: Json | null
          point_name?: string
          special_accommodations?: string[] | null
          status?: string | null
          updated_at?: string | null
          volunteer_needed_count?: number | null
        }
        Relationships: []
      }
      elder_group_activities: {
        Row: {
          accessibility_features: string[] | null
          activity_type: string | null
          cost_per_person: number | null
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          location_address: string | null
          location_type: string | null
          materials_needed: string[] | null
          max_participants: number | null
          organizer_id: string
          scheduled_date: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          accessibility_features?: string[] | null
          activity_type?: string | null
          cost_per_person?: number | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          location_address?: string | null
          location_type?: string | null
          materials_needed?: string[] | null
          max_participants?: number | null
          organizer_id: string
          scheduled_date: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          accessibility_features?: string[] | null
          activity_type?: string | null
          cost_per_person?: number | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          location_address?: string | null
          location_type?: string | null
          materials_needed?: string[] | null
          max_participants?: number | null
          organizer_id?: string
          scheduled_date?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      elder_group_activity_participants: {
        Row: {
          activity_id: string
          attendance_status: string | null
          id: string
          participant_id: string
          participant_type: string
          registration_date: string | null
          special_needs: string | null
          transportation_needed: boolean | null
        }
        Insert: {
          activity_id: string
          attendance_status?: string | null
          id?: string
          participant_id: string
          participant_type: string
          registration_date?: string | null
          special_needs?: string | null
          transportation_needed?: boolean | null
        }
        Update: {
          activity_id?: string
          attendance_status?: string | null
          id?: string
          participant_id?: string
          participant_type?: string
          registration_date?: string | null
          special_needs?: string | null
          transportation_needed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "elder_group_activity_participants_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "elder_group_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      elder_profiles: {
        Row: {
          accessibility_needs: string[] | null
          address: string | null
          created_at: string | null
          date_of_birth: string
          dietary_preferences: string[] | null
          dietary_restrictions: string[] | null
          elder_id: string
          emergency_contact_primary: Json | null
          emergency_contact_secondary: Json | null
          full_name: string
          hobbies: string[] | null
          id: string
          interests: string[] | null
          language_preferences: string[] | null
          medical_notes: string | null
          mobility_level: string | null
          phone_number: string | null
          preferred_visit_types: string[] | null
          special_instructions: string | null
          updated_at: string | null
        }
        Insert: {
          accessibility_needs?: string[] | null
          address?: string | null
          created_at?: string | null
          date_of_birth: string
          dietary_preferences?: string[] | null
          dietary_restrictions?: string[] | null
          elder_id: string
          emergency_contact_primary?: Json | null
          emergency_contact_secondary?: Json | null
          full_name: string
          hobbies?: string[] | null
          id?: string
          interests?: string[] | null
          language_preferences?: string[] | null
          medical_notes?: string | null
          mobility_level?: string | null
          phone_number?: string | null
          preferred_visit_types?: string[] | null
          special_instructions?: string | null
          updated_at?: string | null
        }
        Update: {
          accessibility_needs?: string[] | null
          address?: string | null
          created_at?: string | null
          date_of_birth?: string
          dietary_preferences?: string[] | null
          dietary_restrictions?: string[] | null
          elder_id?: string
          emergency_contact_primary?: Json | null
          emergency_contact_secondary?: Json | null
          full_name?: string
          hobbies?: string[] | null
          id?: string
          interests?: string[] | null
          language_preferences?: string[] | null
          medical_notes?: string | null
          mobility_level?: string | null
          phone_number?: string | null
          preferred_visit_types?: string[] | null
          special_instructions?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      emergency_activations: {
        Row: {
          activated_by: string | null
          activation_location_lat: number
          activation_location_lng: number
          activation_radius_km: number | null
          bridgefy_enabled: boolean | null
          created_at: string | null
          deactivated_at: string | null
          deactivated_by: string | null
          description: string | null
          emergency_type: string
          id: string
          is_active: boolean | null
          recovery_mode_enabled: boolean | null
          ushahidi_enabled: boolean | null
        }
        Insert: {
          activated_by?: string | null
          activation_location_lat: number
          activation_location_lng: number
          activation_radius_km?: number | null
          bridgefy_enabled?: boolean | null
          created_at?: string | null
          deactivated_at?: string | null
          deactivated_by?: string | null
          description?: string | null
          emergency_type: string
          id?: string
          is_active?: boolean | null
          recovery_mode_enabled?: boolean | null
          ushahidi_enabled?: boolean | null
        }
        Update: {
          activated_by?: string | null
          activation_location_lat?: number
          activation_location_lng?: number
          activation_radius_km?: number | null
          bridgefy_enabled?: boolean | null
          created_at?: string | null
          deactivated_at?: string | null
          deactivated_by?: string | null
          description?: string | null
          emergency_type?: string
          id?: string
          is_active?: boolean | null
          recovery_mode_enabled?: boolean | null
          ushahidi_enabled?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_activations_activated_by_fkey"
            columns: ["activated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_activations_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_alerts: {
        Row: {
          affected_areas: string[] | null
          alert_type: string
          attachments: string[] | null
          communication_methods: string[] | null
          created_at: string | null
          expiration_time: string | null
          id: string
          message: string
          sender_id: string
          severity: string
          target_languages: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          affected_areas?: string[] | null
          alert_type: string
          attachments?: string[] | null
          communication_methods?: string[] | null
          created_at?: string | null
          expiration_time?: string | null
          id?: string
          message: string
          sender_id: string
          severity: string
          target_languages?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          affected_areas?: string[] | null
          alert_type?: string
          attachments?: string[] | null
          communication_methods?: string[] | null
          created_at?: string | null
          expiration_time?: string | null
          id?: string
          message?: string
          sender_id?: string
          severity?: string
          target_languages?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
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
      emergency_shelters: {
        Row: {
          address: string
          amenities: string[] | null
          capacity_people: number
          contact_info: Json | null
          created_at: string | null
          current_occupancy: number | null
          id: string
          internet_available: boolean | null
          location_lat: number | null
          location_lng: number | null
          manager_id: string | null
          medical_facilities: boolean | null
          operating_hours: string | null
          pet_friendly: boolean | null
          power_available: boolean | null
          registration_required: boolean | null
          restrictions: string[] | null
          shelter_name: string
          shelter_type: string
          status: string | null
          updated_at: string | null
          water_available: boolean | null
          wheelchair_accessible: boolean | null
        }
        Insert: {
          address: string
          amenities?: string[] | null
          capacity_people: number
          contact_info?: Json | null
          created_at?: string | null
          current_occupancy?: number | null
          id?: string
          internet_available?: boolean | null
          location_lat?: number | null
          location_lng?: number | null
          manager_id?: string | null
          medical_facilities?: boolean | null
          operating_hours?: string | null
          pet_friendly?: boolean | null
          power_available?: boolean | null
          registration_required?: boolean | null
          restrictions?: string[] | null
          shelter_name: string
          shelter_type: string
          status?: string | null
          updated_at?: string | null
          water_available?: boolean | null
          wheelchair_accessible?: boolean | null
        }
        Update: {
          address?: string
          amenities?: string[] | null
          capacity_people?: number
          contact_info?: Json | null
          created_at?: string | null
          current_occupancy?: number | null
          id?: string
          internet_available?: boolean | null
          location_lat?: number | null
          location_lng?: number | null
          manager_id?: string | null
          medical_facilities?: boolean | null
          operating_hours?: string | null
          pet_friendly?: boolean | null
          power_available?: boolean | null
          registration_required?: boolean | null
          restrictions?: string[] | null
          shelter_name?: string
          shelter_type?: string
          status?: string | null
          updated_at?: string | null
          water_available?: boolean | null
          wheelchair_accessible?: boolean | null
        }
        Relationships: []
      }
      energy_assets: {
        Row: {
          asset_name: string
          asset_type: Database["public"]["Enums"]["energy_asset_type"]
          capacity_kw: number | null
          created_at: string | null
          id: string
          installation_date: string | null
          is_shared: boolean | null
          location_lat: number
          location_lng: number
          maintenance_schedule: Json | null
          manufacturer: string | null
          model: string | null
          owner_id: string
          production_data: Json | null
          sharing_terms: string | null
          updated_at: string | null
        }
        Insert: {
          asset_name: string
          asset_type: Database["public"]["Enums"]["energy_asset_type"]
          capacity_kw?: number | null
          created_at?: string | null
          id?: string
          installation_date?: string | null
          is_shared?: boolean | null
          location_lat: number
          location_lng: number
          maintenance_schedule?: Json | null
          manufacturer?: string | null
          model?: string | null
          owner_id: string
          production_data?: Json | null
          sharing_terms?: string | null
          updated_at?: string | null
        }
        Update: {
          asset_name?: string
          asset_type?: Database["public"]["Enums"]["energy_asset_type"]
          capacity_kw?: number | null
          created_at?: string | null
          id?: string
          installation_date?: string | null
          is_shared?: boolean | null
          location_lat?: number
          location_lng?: number
          maintenance_schedule?: Json | null
          manufacturer?: string | null
          model?: string | null
          owner_id?: string
          production_data?: Json | null
          sharing_terms?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      energy_audits: {
        Row: {
          address: string
          audit_date: string | null
          auditor_id: string | null
          baseline_usage: Json | null
          completed_improvements: string[] | null
          created_at: string | null
          energy_score: number | null
          estimated_savings: number | null
          follow_up_date: string | null
          homeowner_id: string
          id: string
          priority_improvements: string[] | null
          recommendations: Json | null
          updated_at: string | null
        }
        Insert: {
          address: string
          audit_date?: string | null
          auditor_id?: string | null
          baseline_usage?: Json | null
          completed_improvements?: string[] | null
          created_at?: string | null
          energy_score?: number | null
          estimated_savings?: number | null
          follow_up_date?: string | null
          homeowner_id: string
          id?: string
          priority_improvements?: string[] | null
          recommendations?: Json | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          audit_date?: string | null
          auditor_id?: string | null
          baseline_usage?: Json | null
          completed_improvements?: string[] | null
          created_at?: string | null
          energy_score?: number | null
          estimated_savings?: number | null
          follow_up_date?: string | null
          homeowner_id?: string
          id?: string
          priority_improvements?: string[] | null
          recommendations?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      energy_education: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string | null
          difficulty_rating: number | null
          estimated_time_hours: number | null
          helpful_votes: number | null
          id: string
          required_tools: string[] | null
          resource_links: Json | null
          safety_warnings: string[] | null
          skill_level: Database["public"]["Enums"]["skill_level"] | null
          tags: string[] | null
          title: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string | null
          difficulty_rating?: number | null
          estimated_time_hours?: number | null
          helpful_votes?: number | null
          id?: string
          required_tools?: string[] | null
          resource_links?: Json | null
          safety_warnings?: string[] | null
          skill_level?: Database["public"]["Enums"]["skill_level"] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          difficulty_rating?: number | null
          estimated_time_hours?: number | null
          helpful_votes?: number | null
          id?: string
          required_tools?: string[] | null
          resource_links?: Json | null
          safety_warnings?: string[] | null
          skill_level?: Database["public"]["Enums"]["skill_level"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      energy_installers: {
        Row: {
          average_rating: number | null
          certifications: string[] | null
          company_name: string
          contact_person: string | null
          created_at: string | null
          email: string | null
          id: string
          phone: string | null
          pricing_info: Json | null
          service_areas: string[] | null
          services: string[] | null
          total_reviews: number | null
          updated_at: string | null
          verified: boolean | null
          website: string | null
        }
        Insert: {
          average_rating?: number | null
          certifications?: string[] | null
          company_name: string
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          pricing_info?: Json | null
          service_areas?: string[] | null
          services?: string[] | null
          total_reviews?: number | null
          updated_at?: string | null
          verified?: boolean | null
          website?: string | null
        }
        Update: {
          average_rating?: number | null
          certifications?: string[] | null
          company_name?: string
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          pricing_info?: Json | null
          service_areas?: string[] | null
          services?: string[] | null
          total_reviews?: number | null
          updated_at?: string | null
          verified?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      energy_projects: {
        Row: {
          benefits: Json | null
          coordinator_id: string
          created_at: string | null
          current_participants: number | null
          description: string | null
          estimated_cost: number | null
          estimated_savings: number | null
          id: string
          location_lat: number | null
          location_lng: number | null
          project_name: string
          project_type: Database["public"]["Enums"]["energy_project_type"]
          requirements: Json | null
          status: Database["public"]["Enums"]["project_status"] | null
          target_participants: number | null
          timeline_end: string | null
          timeline_start: string | null
          updated_at: string | null
        }
        Insert: {
          benefits?: Json | null
          coordinator_id: string
          created_at?: string | null
          current_participants?: number | null
          description?: string | null
          estimated_cost?: number | null
          estimated_savings?: number | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          project_name: string
          project_type: Database["public"]["Enums"]["energy_project_type"]
          requirements?: Json | null
          status?: Database["public"]["Enums"]["project_status"] | null
          target_participants?: number | null
          timeline_end?: string | null
          timeline_start?: string | null
          updated_at?: string | null
        }
        Update: {
          benefits?: Json | null
          coordinator_id?: string
          created_at?: string | null
          current_participants?: number | null
          description?: string | null
          estimated_cost?: number | null
          estimated_savings?: number | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          project_name?: string
          project_type?: Database["public"]["Enums"]["energy_project_type"]
          requirements?: Json | null
          status?: Database["public"]["Enums"]["project_status"] | null
          target_participants?: number | null
          timeline_end?: string | null
          timeline_start?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      energy_resources: {
        Row: {
          booking_instructions: string | null
          created_at: string | null
          description: string | null
          id: string
          is_available: boolean | null
          location_lat: number | null
          location_lng: number | null
          owner_id: string
          rental_period: string | null
          rental_rate: number | null
          requirements: string | null
          resource_name: string
          resource_type: Database["public"]["Enums"]["resource_type"]
          safety_notes: string | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          booking_instructions?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_available?: boolean | null
          location_lat?: number | null
          location_lng?: number | null
          owner_id: string
          rental_period?: string | null
          rental_rate?: number | null
          requirements?: string | null
          resource_name: string
          resource_type: Database["public"]["Enums"]["resource_type"]
          safety_notes?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          booking_instructions?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_available?: boolean | null
          location_lat?: number | null
          location_lng?: number | null
          owner_id?: string
          rental_period?: string | null
          rental_rate?: number | null
          requirements?: string | null
          resource_name?: string
          resource_type?: Database["public"]["Enums"]["resource_type"]
          safety_notes?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      evacuation_routes: {
        Row: {
          accessibility_level: string
          alternative_route_ids: string[] | null
          capacity_vehicles_per_hour: number | null
          created_at: string | null
          destination_area: string
          estimated_travel_time: number | null
          hazard_warnings: string[] | null
          id: string
          last_surveyed_date: string | null
          origin_area: string
          road_conditions: string | null
          route_coordinates: Json | null
          route_description: string | null
          route_name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          accessibility_level: string
          alternative_route_ids?: string[] | null
          capacity_vehicles_per_hour?: number | null
          created_at?: string | null
          destination_area: string
          estimated_travel_time?: number | null
          hazard_warnings?: string[] | null
          id?: string
          last_surveyed_date?: string | null
          origin_area: string
          road_conditions?: string | null
          route_coordinates?: Json | null
          route_description?: string | null
          route_name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          accessibility_level?: string
          alternative_route_ids?: string[] | null
          capacity_vehicles_per_hour?: number | null
          created_at?: string | null
          destination_area?: string
          estimated_travel_time?: number | null
          hazard_warnings?: string[] | null
          id?: string
          last_surveyed_date?: string | null
          origin_area?: string
          road_conditions?: string | null
          route_coordinates?: Json | null
          route_description?: string | null
          route_name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      family_connections: {
        Row: {
          created_at: string | null
          elder_id: string
          emergency_contact_priority: number | null
          family_member_id: string
          id: string
          notification_preferences: Json | null
          relationship: string
        }
        Insert: {
          created_at?: string | null
          elder_id: string
          emergency_contact_priority?: number | null
          family_member_id: string
          id?: string
          notification_preferences?: Json | null
          relationship: string
        }
        Update: {
          created_at?: string | null
          elder_id?: string
          emergency_contact_priority?: number | null
          family_member_id?: string
          id?: string
          notification_preferences?: Json | null
          relationship?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_connections_elder_id_fkey"
            columns: ["elder_id"]
            isOneToOne: false
            referencedRelation: "elder_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      food_assets: {
        Row: {
          access_instructions: string | null
          asset_name: string
          asset_type: Database["public"]["Enums"]["food_asset_type"]
          contact_method: string | null
          created_at: string | null
          crops_varieties: string[] | null
          estimated_yield_per_season: string | null
          harvest_seasons:
            | Database["public"]["Enums"]["harvest_season"][]
            | null
          id: string
          is_public: boolean | null
          location_description: string | null
          location_lat: number
          location_lng: number
          owner_id: string
          sustainability_notes: string | null
          updated_at: string | null
        }
        Insert: {
          access_instructions?: string | null
          asset_name: string
          asset_type: Database["public"]["Enums"]["food_asset_type"]
          contact_method?: string | null
          created_at?: string | null
          crops_varieties?: string[] | null
          estimated_yield_per_season?: string | null
          harvest_seasons?:
            | Database["public"]["Enums"]["harvest_season"][]
            | null
          id?: string
          is_public?: boolean | null
          location_description?: string | null
          location_lat: number
          location_lng: number
          owner_id: string
          sustainability_notes?: string | null
          updated_at?: string | null
        }
        Update: {
          access_instructions?: string | null
          asset_name?: string
          asset_type?: Database["public"]["Enums"]["food_asset_type"]
          contact_method?: string | null
          created_at?: string | null
          crops_varieties?: string[] | null
          estimated_yield_per_season?: string | null
          harvest_seasons?:
            | Database["public"]["Enums"]["harvest_season"][]
            | null
          id?: string
          is_public?: boolean | null
          location_description?: string | null
          location_lat?: number
          location_lng?: number
          owner_id?: string
          sustainability_notes?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      food_crisis_response: {
        Row: {
          activation_date: string | null
          affected_area: Json | null
          coordinator_id: string
          created_at: string | null
          crisis_type: string
          distribution_schedule: Json | null
          id: string
          priority_level: Database["public"]["Enums"]["crisis_priority"] | null
          resource_allocation: Json | null
          response_name: string
          status: string | null
          updated_at: string | null
          volunteer_needs: Json | null
          vulnerable_households: string[] | null
        }
        Insert: {
          activation_date?: string | null
          affected_area?: Json | null
          coordinator_id: string
          created_at?: string | null
          crisis_type: string
          distribution_schedule?: Json | null
          id?: string
          priority_level?: Database["public"]["Enums"]["crisis_priority"] | null
          resource_allocation?: Json | null
          response_name: string
          status?: string | null
          updated_at?: string | null
          volunteer_needs?: Json | null
          vulnerable_households?: string[] | null
        }
        Update: {
          activation_date?: string | null
          affected_area?: Json | null
          coordinator_id?: string
          created_at?: string | null
          crisis_type?: string
          distribution_schedule?: Json | null
          id?: string
          priority_level?: Database["public"]["Enums"]["crisis_priority"] | null
          resource_allocation?: Json | null
          response_name?: string
          status?: string | null
          updated_at?: string | null
          volunteer_needs?: Json | null
          vulnerable_households?: string[] | null
        }
        Relationships: []
      }
      food_distribution_points: {
        Row: {
          accessibility_features: string[] | null
          address: string
          capacity_info: Json | null
          contact_info: Json | null
          created_at: string | null
          current_inventory: Json | null
          distribution_type: Database["public"]["Enums"]["distribution_type"]
          id: string
          last_restocked: string | null
          location_lat: number
          location_lng: number
          manager_id: string | null
          operating_hours: Json | null
          point_name: string
          temperature_sensor_id: string | null
          updated_at: string | null
        }
        Insert: {
          accessibility_features?: string[] | null
          address: string
          capacity_info?: Json | null
          contact_info?: Json | null
          created_at?: string | null
          current_inventory?: Json | null
          distribution_type: Database["public"]["Enums"]["distribution_type"]
          id?: string
          last_restocked?: string | null
          location_lat: number
          location_lng: number
          manager_id?: string | null
          operating_hours?: Json | null
          point_name: string
          temperature_sensor_id?: string | null
          updated_at?: string | null
        }
        Update: {
          accessibility_features?: string[] | null
          address?: string
          capacity_info?: Json | null
          contact_info?: Json | null
          created_at?: string | null
          current_inventory?: Json | null
          distribution_type?: Database["public"]["Enums"]["distribution_type"]
          id?: string
          last_restocked?: string | null
          location_lat?: number
          location_lng?: number
          manager_id?: string | null
          operating_hours?: Json | null
          point_name?: string
          temperature_sensor_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      food_knowledge_base: {
        Row: {
          author_id: string | null
          category: string
          climate_zones: string[] | null
          content: string
          created_at: string | null
          difficulty_level: string | null
          growing_seasons:
            | Database["public"]["Enums"]["harvest_season"][]
            | null
          helpful_votes: number | null
          id: string
          resource_links: Json | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category: string
          climate_zones?: string[] | null
          content: string
          created_at?: string | null
          difficulty_level?: string | null
          growing_seasons?:
            | Database["public"]["Enums"]["harvest_season"][]
            | null
          helpful_votes?: number | null
          id?: string
          resource_links?: Json | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string
          climate_zones?: string[] | null
          content?: string
          created_at?: string | null
          difficulty_level?: string | null
          growing_seasons?:
            | Database["public"]["Enums"]["harvest_season"][]
            | null
          helpful_votes?: number | null
          id?: string
          resource_links?: Json | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      food_production_plans: {
        Row: {
          community_goals: string | null
          coordinator_id: string
          created_at: string | null
          estimated_harvest: Json | null
          id: string
          participating_assets: string[] | null
          plan_name: string
          planting_schedule: Json | null
          resource_needs: Json | null
          status: string | null
          target_crops: Json
          target_season: Database["public"]["Enums"]["harvest_season"]
          updated_at: string | null
        }
        Insert: {
          community_goals?: string | null
          coordinator_id: string
          created_at?: string | null
          estimated_harvest?: Json | null
          id?: string
          participating_assets?: string[] | null
          plan_name: string
          planting_schedule?: Json | null
          resource_needs?: Json | null
          status?: string | null
          target_crops: Json
          target_season: Database["public"]["Enums"]["harvest_season"]
          updated_at?: string | null
        }
        Update: {
          community_goals?: string | null
          coordinator_id?: string
          created_at?: string | null
          estimated_harvest?: Json | null
          id?: string
          participating_assets?: string[] | null
          plan_name?: string
          planting_schedule?: Json | null
          resource_needs?: Json | null
          status?: string | null
          target_crops?: Json
          target_season?: Database["public"]["Enums"]["harvest_season"]
          updated_at?: string | null
        }
        Relationships: []
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
      gleaning_opportunities: {
        Row: {
          asset_id: string | null
          available_produce: string
          coordinator_id: string
          created_at: string | null
          current_volunteers: number | null
          distribution_plan: string | null
          equipment_needed: string[] | null
          estimated_quantity: string | null
          harvest_date: string
          id: string
          location_name: string
          status: string | null
          transportation_needed: boolean | null
          volunteer_spots_needed: number | null
        }
        Insert: {
          asset_id?: string | null
          available_produce: string
          coordinator_id: string
          created_at?: string | null
          current_volunteers?: number | null
          distribution_plan?: string | null
          equipment_needed?: string[] | null
          estimated_quantity?: string | null
          harvest_date: string
          id?: string
          location_name: string
          status?: string | null
          transportation_needed?: boolean | null
          volunteer_spots_needed?: number | null
        }
        Update: {
          asset_id?: string | null
          available_produce?: string
          coordinator_id?: string
          created_at?: string | null
          current_volunteers?: number | null
          distribution_plan?: string | null
          equipment_needed?: string[] | null
          estimated_quantity?: string | null
          harvest_date?: string
          id?: string
          location_name?: string
          status?: string | null
          transportation_needed?: boolean | null
          volunteer_spots_needed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gleaning_opportunities_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "food_assets"
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
      households: {
        Row: {
          accessibility_requirements: string[] | null
          address: string
          created_at: string | null
          emergency_contact_external: Json | null
          household_size: number | null
          id: string
          languages_spoken: string[] | null
          livestock_count: number | null
          location_lat: number | null
          location_lng: number | null
          name: string
          pets_count: number | null
          primary_contact_id: string
          special_needs_members: number | null
          updated_at: string | null
        }
        Insert: {
          accessibility_requirements?: string[] | null
          address: string
          created_at?: string | null
          emergency_contact_external?: Json | null
          household_size?: number | null
          id?: string
          languages_spoken?: string[] | null
          livestock_count?: number | null
          location_lat?: number | null
          location_lng?: number | null
          name: string
          pets_count?: number | null
          primary_contact_id: string
          special_needs_members?: number | null
          updated_at?: string | null
        }
        Update: {
          accessibility_requirements?: string[] | null
          address?: string
          created_at?: string | null
          emergency_contact_external?: Json | null
          household_size?: number | null
          id?: string
          languages_spoken?: string[] | null
          livestock_count?: number | null
          location_lat?: number | null
          location_lng?: number | null
          name?: string
          pets_count?: number | null
          primary_contact_id?: string
          special_needs_members?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      installer_reviews: {
        Row: {
          completion_date: string | null
          created_at: string | null
          id: string
          installer_id: string
          project_type: string | null
          rating: number | null
          review_text: string | null
          reviewer_id: string
          would_recommend: boolean | null
        }
        Insert: {
          completion_date?: string | null
          created_at?: string | null
          id?: string
          installer_id: string
          project_type?: string | null
          rating?: number | null
          review_text?: string | null
          reviewer_id: string
          would_recommend?: boolean | null
        }
        Update: {
          completion_date?: string | null
          created_at?: string | null
          id?: string
          installer_id?: string
          project_type?: string | null
          rating?: number | null
          review_text?: string | null
          reviewer_id?: string
          would_recommend?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "installer_reviews_installer_id_fkey"
            columns: ["installer_id"]
            isOneToOne: false
            referencedRelation: "energy_installers"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_config: {
        Row: {
          api_endpoint: string | null
          api_key_name: string | null
          configuration: Json | null
          created_at: string | null
          health_status: string | null
          id: string
          is_enabled: boolean | null
          last_health_check: string | null
          service_name: string
          updated_at: string | null
        }
        Insert: {
          api_endpoint?: string | null
          api_key_name?: string | null
          configuration?: Json | null
          created_at?: string | null
          health_status?: string | null
          id?: string
          is_enabled?: boolean | null
          last_health_check?: string | null
          service_name: string
          updated_at?: string | null
        }
        Update: {
          api_endpoint?: string | null
          api_key_name?: string | null
          configuration?: Json | null
          created_at?: string | null
          health_status?: string | null
          id?: string
          is_enabled?: boolean | null
          last_health_check?: string | null
          service_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      knowledge_articles: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          is_featured: boolean | null
          like_count: number | null
          skill_ids: string[] | null
          tags: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          like_count?: number | null
          skill_ids?: string[] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          like_count?: number | null
          skill_ids?: string[] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      learning_path_progress: {
        Row: {
          completed_at: string | null
          completed_courses: string[] | null
          current_course_id: string | null
          id: string
          learning_path_id: string
          started_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completed_courses?: string[] | null
          current_course_id?: string | null
          id?: string
          learning_path_id: string
          started_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completed_courses?: string[] | null
          current_course_id?: string | null
          id?: string
          learning_path_id?: string
          started_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_path_progress_current_course_id_fkey"
            columns: ["current_course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_path_progress_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          course_sequence: Json | null
          created_at: string | null
          creator_id: string
          description: string | null
          difficulty_level: Database["public"]["Enums"]["skill_level"]
          estimated_duration_weeks: number | null
          id: string
          is_public: boolean | null
          skill_ids: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          course_sequence?: Json | null
          created_at?: string | null
          creator_id: string
          description?: string | null
          difficulty_level: Database["public"]["Enums"]["skill_level"]
          estimated_duration_weeks?: number | null
          id?: string
          is_public?: boolean | null
          skill_ids?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          course_sequence?: Json | null
          created_at?: string | null
          creator_id?: string
          description?: string | null
          difficulty_level?: Database["public"]["Enums"]["skill_level"]
          estimated_duration_weeks?: number | null
          id?: string
          is_public?: boolean | null
          skill_ids?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      learning_sessions: {
        Row: {
          course_id: string | null
          created_at: string | null
          current_participants: number | null
          description: string | null
          id: string
          learning_format: Database["public"]["Enums"]["learning_format"]
          location_details: string | null
          location_type: Database["public"]["Enums"]["location_type"]
          max_participants: number | null
          meeting_url: string | null
          price: number | null
          recording_url: string | null
          scheduled_end: string
          scheduled_start: string
          session_notes: string | null
          skill_ids: string[] | null
          status: Database["public"]["Enums"]["session_status"] | null
          teacher_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          current_participants?: number | null
          description?: string | null
          id?: string
          learning_format: Database["public"]["Enums"]["learning_format"]
          location_details?: string | null
          location_type: Database["public"]["Enums"]["location_type"]
          max_participants?: number | null
          meeting_url?: string | null
          price?: number | null
          recording_url?: string | null
          scheduled_end: string
          scheduled_start: string
          session_notes?: string | null
          skill_ids?: string[] | null
          status?: Database["public"]["Enums"]["session_status"] | null
          teacher_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          current_participants?: number | null
          description?: string | null
          id?: string
          learning_format?: Database["public"]["Enums"]["learning_format"]
          location_details?: string | null
          location_type?: Database["public"]["Enums"]["location_type"]
          max_participants?: number | null
          meeting_url?: string | null
          price?: number | null
          recording_url?: string | null
          scheduled_end?: string
          scheduled_start?: string
          session_notes?: string | null
          skill_ids?: string[] | null
          status?: Database["public"]["Enums"]["session_status"] | null
          teacher_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_sessions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_cases: {
        Row: {
          assigned_advocate: string | null
          case_description: string
          case_type: string
          client_id: string
          court_dates: Json | null
          created_at: string | null
          documents: Json | null
          emergency_fund_needed: number | null
          emergency_fund_raised: number | null
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["legal_case_status"] | null
          updated_at: string | null
        }
        Insert: {
          assigned_advocate?: string | null
          case_description: string
          case_type: string
          client_id: string
          court_dates?: Json | null
          created_at?: string | null
          documents?: Json | null
          emergency_fund_needed?: number | null
          emergency_fund_raised?: number | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["legal_case_status"] | null
          updated_at?: string | null
        }
        Update: {
          assigned_advocate?: string | null
          case_description?: string
          case_type?: string
          client_id?: string
          court_dates?: Json | null
          created_at?: string | null
          documents?: Json | null
          emergency_fund_needed?: number | null
          emergency_fund_raised?: number | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["legal_case_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      legal_resources: {
        Row: {
          applicable_situations: Json | null
          category: string
          content: string
          created_by: string | null
          document_templates: Json | null
          helpful_votes: number | null
          id: string
          languages: Json | null
          last_updated: string | null
          title: string
        }
        Insert: {
          applicable_situations?: Json | null
          category: string
          content: string
          created_by?: string | null
          document_templates?: Json | null
          helpful_votes?: number | null
          id?: string
          languages?: Json | null
          last_updated?: string | null
          title: string
        }
        Update: {
          applicable_situations?: Json | null
          category?: string
          content?: string
          created_by?: string | null
          document_templates?: Json | null
          helpful_votes?: number | null
          id?: string
          languages?: Json | null
          last_updated?: string | null
          title?: string
        }
        Relationships: []
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
      member_skills: {
        Row: {
          available_for_emergency: boolean | null
          certifications: string[] | null
          created_at: string | null
          equipment_owned: string[] | null
          id: string
          notes: string | null
          proficiency_level: string
          skill_category: string
          skill_name: string
          updated_at: string | null
          user_id: string
          verified_by: string | null
          verified_date: string | null
          years_experience: number | null
        }
        Insert: {
          available_for_emergency?: boolean | null
          certifications?: string[] | null
          created_at?: string | null
          equipment_owned?: string[] | null
          id?: string
          notes?: string | null
          proficiency_level: string
          skill_category: string
          skill_name: string
          updated_at?: string | null
          user_id: string
          verified_by?: string | null
          verified_date?: string | null
          years_experience?: number | null
        }
        Update: {
          available_for_emergency?: boolean | null
          certifications?: string[] | null
          created_at?: string | null
          equipment_owned?: string[] | null
          id?: string
          notes?: string | null
          proficiency_level?: string
          skill_category?: string
          skill_name?: string
          updated_at?: string | null
          user_id?: string
          verified_by?: string | null
          verified_date?: string | null
          years_experience?: number | null
        }
        Relationships: []
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
      mesh_connections: {
        Row: {
          connection_strength: number | null
          created_at: string | null
          device_id: string
          id: string
          is_emergency_mode: boolean | null
          last_seen_at: string | null
          location_lat: number | null
          location_lng: number | null
          user_id: string | null
        }
        Insert: {
          connection_strength?: number | null
          created_at?: string | null
          device_id: string
          id?: string
          is_emergency_mode?: boolean | null
          last_seen_at?: string | null
          location_lat?: number | null
          location_lng?: number | null
          user_id?: string | null
        }
        Update: {
          connection_strength?: number | null
          created_at?: string | null
          device_id?: string
          id?: string
          is_emergency_mode?: boolean | null
          last_seen_at?: string | null
          location_lat?: number | null
          location_lng?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mesh_connections_user_id_fkey"
            columns: ["user_id"]
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
      offline_messages: {
        Row: {
          content: Json
          created_at: string | null
          delivered_at: string | null
          expires_at: string | null
          id: string
          mesh_device_id: string | null
          message_type: string
          priority: number | null
          recipient_id: string | null
          sender_id: string | null
        }
        Insert: {
          content: Json
          created_at?: string | null
          delivered_at?: string | null
          expires_at?: string | null
          id?: string
          mesh_device_id?: string | null
          message_type: string
          priority?: number | null
          recipient_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          delivered_at?: string | null
          expires_at?: string | null
          id?: string
          mesh_device_id?: string | null
          message_type?: string
          priority?: number | null
          recipient_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offline_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizing_campaigns: {
        Row: {
          campaign_name: string
          campaign_timeline: Json | null
          campaign_type: string
          coordinator_id: string
          created_at: string | null
          current_signatures: number | null
          description: string
          id: string
          media_contacts: Json | null
          petition_text: string | null
          status: Database["public"]["Enums"]["campaign_status"] | null
          target_outcome: string | null
          target_signatures: number | null
          updated_at: string | null
          victory_metrics: Json | null
        }
        Insert: {
          campaign_name: string
          campaign_timeline?: Json | null
          campaign_type: string
          coordinator_id: string
          created_at?: string | null
          current_signatures?: number | null
          description: string
          id?: string
          media_contacts?: Json | null
          petition_text?: string | null
          status?: Database["public"]["Enums"]["campaign_status"] | null
          target_outcome?: string | null
          target_signatures?: number | null
          updated_at?: string | null
          victory_metrics?: Json | null
        }
        Update: {
          campaign_name?: string
          campaign_timeline?: Json | null
          campaign_type?: string
          coordinator_id?: string
          created_at?: string | null
          current_signatures?: number | null
          description?: string
          id?: string
          media_contacts?: Json | null
          petition_text?: string | null
          status?: Database["public"]["Enums"]["campaign_status"] | null
          target_outcome?: string | null
          target_signatures?: number | null
          updated_at?: string | null
          victory_metrics?: Json | null
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
      pollution_reports: {
        Row: {
          created_at: string | null
          description: string
          health_impacts: string | null
          id: string
          location_description: string
          location_lat: number
          location_lng: number
          photos: Json | null
          pollution_type: string
          reporter_id: string | null
          suspected_source: string | null
          threat_level:
            | Database["public"]["Enums"]["environmental_threat_level"]
            | null
          verified_by_officials: boolean | null
        }
        Insert: {
          created_at?: string | null
          description: string
          health_impacts?: string | null
          id?: string
          location_description: string
          location_lat: number
          location_lng: number
          photos?: Json | null
          pollution_type: string
          reporter_id?: string | null
          suspected_source?: string | null
          threat_level?:
            | Database["public"]["Enums"]["environmental_threat_level"]
            | null
          verified_by_officials?: boolean | null
        }
        Update: {
          created_at?: string | null
          description?: string
          health_impacts?: string | null
          id?: string
          location_description?: string
          location_lat?: number
          location_lng?: number
          photos?: Json | null
          pollution_type?: string
          reporter_id?: string | null
          suspected_source?: string | null
          threat_level?:
            | Database["public"]["Enums"]["environmental_threat_level"]
            | null
          verified_by_officials?: boolean | null
        }
        Relationships: []
      }
      preparedness_items: {
        Row: {
          category: string
          checked: boolean | null
          created_at: string | null
          current_quantity: string | null
          expiration_date: string | null
          household_id: string
          id: string
          item_name: string
          last_checked_date: string | null
          location_stored: string | null
          notes: string | null
          recommended_quantity: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          checked?: boolean | null
          created_at?: string | null
          current_quantity?: string | null
          expiration_date?: string | null
          household_id: string
          id?: string
          item_name: string
          last_checked_date?: string | null
          location_stored?: string | null
          notes?: string | null
          recommended_quantity?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          checked?: boolean | null
          created_at?: string | null
          current_quantity?: string | null
          expiration_date?: string | null
          household_id?: string
          id?: string
          item_name?: string
          last_checked_date?: string | null
          location_stored?: string | null
          notes?: string | null
          recommended_quantity?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "preparedness_items_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
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
      project_showcase: {
        Row: {
          collaboration_open: boolean | null
          created_at: string | null
          creator_id: string
          demo_url: string | null
          description: string | null
          id: string
          project_images: Json | null
          project_video_url: string | null
          skill_ids: string[] | null
          source_code_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          collaboration_open?: boolean | null
          created_at?: string | null
          creator_id: string
          demo_url?: string | null
          description?: string | null
          id?: string
          project_images?: Json | null
          project_video_url?: string | null
          skill_ids?: string[] | null
          source_code_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          collaboration_open?: boolean | null
          created_at?: string | null
          creator_id?: string
          demo_url?: string | null
          description?: string | null
          id?: string
          project_images?: Json | null
          project_video_url?: string | null
          skill_ids?: string[] | null
          source_code_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      property_alerts: {
        Row: {
          alert_details: Json
          alert_type: Database["public"]["Enums"]["property_alert_type"]
          created_at: string | null
          expires_at: string | null
          id: string
          location_lat: number | null
          location_lng: number | null
          notification_sent: boolean | null
          property_address: string
          source_url: string | null
        }
        Insert: {
          alert_details: Json
          alert_type: Database["public"]["Enums"]["property_alert_type"]
          created_at?: string | null
          expires_at?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          notification_sent?: boolean | null
          property_address: string
          source_url?: string | null
        }
        Update: {
          alert_details?: Json
          alert_type?: Database["public"]["Enums"]["property_alert_type"]
          created_at?: string | null
          expires_at?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          notification_sent?: boolean | null
          property_address?: string
          source_url?: string | null
        }
        Relationships: []
      }
      recipe_exchange: {
        Row: {
          contributor_id: string
          cook_time_minutes: number | null
          created_at: string | null
          helpful_votes: number | null
          id: string
          ingredients: Json
          instructions: string
          local_substitutions: Json | null
          nutrition_notes: string | null
          prep_time_minutes: number | null
          preservation_method: string | null
          recipe_name: string
          seasonal_ingredients: string[] | null
          servings: number | null
          tags: string[] | null
        }
        Insert: {
          contributor_id: string
          cook_time_minutes?: number | null
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          ingredients: Json
          instructions: string
          local_substitutions?: Json | null
          nutrition_notes?: string | null
          prep_time_minutes?: number | null
          preservation_method?: string | null
          recipe_name: string
          seasonal_ingredients?: string[] | null
          servings?: number | null
          tags?: string[] | null
        }
        Update: {
          contributor_id?: string
          cook_time_minutes?: number | null
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          ingredients?: Json
          instructions?: string
          local_substitutions?: Json | null
          nutrition_notes?: string | null
          prep_time_minutes?: number | null
          preservation_method?: string | null
          recipe_name?: string
          seasonal_ingredients?: string[] | null
          servings?: number | null
          tags?: string[] | null
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
      rent_tracking: {
        Row: {
          created_at: string | null
          id: string
          lease_end_date: string | null
          lease_start_date: string | null
          monthly_rent: number
          property_id: string | null
          rent_increase_notices: Json | null
          tenant_id: string
          unit_number: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          lease_end_date?: string | null
          lease_start_date?: string | null
          monthly_rent: number
          property_id?: string | null
          rent_increase_notices?: Json | null
          tenant_id: string
          unit_number?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          lease_end_date?: string | null
          lease_start_date?: string | null
          monthly_rent?: number
          property_id?: string | null
          rent_increase_notices?: Json | null
          tenant_id?: string
          unit_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rent_tracking_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "rental_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_properties: {
        Row: {
          address: string
          contact_info: Json | null
          created_at: string | null
          id: string
          landlord_name: string | null
          location_lat: number | null
          location_lng: number | null
          management_company: string | null
          property_name: string | null
          property_type: string | null
          unit_count: number | null
          updated_at: string | null
        }
        Insert: {
          address: string
          contact_info?: Json | null
          created_at?: string | null
          id?: string
          landlord_name?: string | null
          location_lat?: number | null
          location_lng?: number | null
          management_company?: string | null
          property_name?: string | null
          property_type?: string | null
          unit_count?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          contact_info?: Json | null
          created_at?: string | null
          id?: string
          landlord_name?: string | null
          location_lat?: number | null
          location_lng?: number | null
          management_company?: string | null
          property_name?: string | null
          property_type?: string | null
          unit_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      resource_bookings: {
        Row: {
          borrower_id: string
          created_at: string | null
          end_date: string
          id: string
          notes: string | null
          purpose: string | null
          resource_id: string
          start_date: string
          status: string | null
        }
        Insert: {
          borrower_id: string
          created_at?: string | null
          end_date: string
          id?: string
          notes?: string | null
          purpose?: string | null
          resource_id: string
          start_date: string
          status?: string | null
        }
        Update: {
          borrower_id?: string
          created_at?: string | null
          end_date?: string
          id?: string
          notes?: string | null
          purpose?: string | null
          resource_id?: string
          start_date?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resource_bookings_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "energy_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_distributions: {
        Row: {
          created_at: string | null
          delivered_at: string | null
          delivery_location_lat: number | null
          delivery_location_lng: number | null
          donor_id: string | null
          donor_signature: string | null
          id: string
          notes: string | null
          picked_up_at: string | null
          pickup_location_lat: number | null
          pickup_location_lng: number | null
          qr_code: string | null
          quantity: number | null
          recipient_id: string | null
          recipient_signature: string | null
          resource_id: string | null
          scheduled_delivery_at: string | null
          scheduled_pickup_at: string | null
          status: string | null
          updated_at: string | null
          verification_photo_url: string | null
          volunteer_id: string | null
          volunteer_signature: string | null
        }
        Insert: {
          created_at?: string | null
          delivered_at?: string | null
          delivery_location_lat?: number | null
          delivery_location_lng?: number | null
          donor_id?: string | null
          donor_signature?: string | null
          id?: string
          notes?: string | null
          picked_up_at?: string | null
          pickup_location_lat?: number | null
          pickup_location_lng?: number | null
          qr_code?: string | null
          quantity?: number | null
          recipient_id?: string | null
          recipient_signature?: string | null
          resource_id?: string | null
          scheduled_delivery_at?: string | null
          scheduled_pickup_at?: string | null
          status?: string | null
          updated_at?: string | null
          verification_photo_url?: string | null
          volunteer_id?: string | null
          volunteer_signature?: string | null
        }
        Update: {
          created_at?: string | null
          delivered_at?: string | null
          delivery_location_lat?: number | null
          delivery_location_lng?: number | null
          donor_id?: string | null
          donor_signature?: string | null
          id?: string
          notes?: string | null
          picked_up_at?: string | null
          pickup_location_lat?: number | null
          pickup_location_lng?: number | null
          qr_code?: string | null
          quantity?: number | null
          recipient_id?: string | null
          recipient_signature?: string | null
          resource_id?: string | null
          scheduled_delivery_at?: string | null
          scheduled_pickup_at?: string | null
          status?: string | null
          updated_at?: string | null
          verification_photo_url?: string | null
          volunteer_id?: string | null
          volunteer_signature?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resource_distributions_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resource_distributions_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resource_distributions_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "community_resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resource_distributions_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_requests: {
        Row: {
          created_at: string | null
          fulfilled_by: string | null
          fulfillment_notes: string | null
          household_id: string | null
          id: string
          item_description: string
          location_for_delivery: string | null
          location_lat: number | null
          location_lng: number | null
          medical_related: boolean | null
          preferred_fulfillment_method: string | null
          quantity_needed: string | null
          request_type: string
          requester_id: string
          special_requirements: string | null
          status: string | null
          updated_at: string | null
          urgency: string
        }
        Insert: {
          created_at?: string | null
          fulfilled_by?: string | null
          fulfillment_notes?: string | null
          household_id?: string | null
          id?: string
          item_description: string
          location_for_delivery?: string | null
          location_lat?: number | null
          location_lng?: number | null
          medical_related?: boolean | null
          preferred_fulfillment_method?: string | null
          quantity_needed?: string | null
          request_type: string
          requester_id: string
          special_requirements?: string | null
          status?: string | null
          updated_at?: string | null
          urgency: string
        }
        Update: {
          created_at?: string | null
          fulfilled_by?: string | null
          fulfillment_notes?: string | null
          household_id?: string | null
          id?: string
          item_description?: string
          location_for_delivery?: string | null
          location_lat?: number | null
          location_lng?: number | null
          medical_related?: boolean | null
          preferred_fulfillment_method?: string | null
          quantity_needed?: string | null
          request_type?: string
          requester_id?: string
          special_requirements?: string | null
          status?: string | null
          updated_at?: string | null
          urgency?: string
        }
        Relationships: [
          {
            foreignKeyName: "resource_requests_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_checkins: {
        Row: {
          additional_info: string | null
          contact_method: string | null
          created_at: string | null
          household_id: string | null
          id: string
          location_description: string | null
          location_lat: number | null
          location_lng: number | null
          medical_emergency: boolean | null
          needs_assistance: string[] | null
          status: string
          user_id: string
          verified_by: string | null
        }
        Insert: {
          additional_info?: string | null
          contact_method?: string | null
          created_at?: string | null
          household_id?: string | null
          id?: string
          location_description?: string | null
          location_lat?: number | null
          location_lng?: number | null
          medical_emergency?: boolean | null
          needs_assistance?: string[] | null
          status: string
          user_id: string
          verified_by?: string | null
        }
        Update: {
          additional_info?: string | null
          contact_method?: string | null
          created_at?: string | null
          household_id?: string | null
          id?: string
          location_description?: string | null
          location_lat?: number | null
          location_lng?: number | null
          medical_emergency?: boolean | null
          needs_assistance?: string[] | null
          status?: string
          user_id?: string
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "safety_checkins_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
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
      senior_resources: {
        Row: {
          accessibility_features: string[] | null
          address: string | null
          category: string
          contact_email: string | null
          contact_phone: string | null
          cost_info: string | null
          created_at: string | null
          description: string | null
          eligibility_requirements: string | null
          hours_of_operation: Json | null
          id: string
          languages_supported: string[] | null
          rating: number | null
          resource_name: string
          service_area: string[] | null
          updated_at: string | null
          verified: boolean | null
          website_url: string | null
        }
        Insert: {
          accessibility_features?: string[] | null
          address?: string | null
          category: string
          contact_email?: string | null
          contact_phone?: string | null
          cost_info?: string | null
          created_at?: string | null
          description?: string | null
          eligibility_requirements?: string | null
          hours_of_operation?: Json | null
          id?: string
          languages_supported?: string[] | null
          rating?: number | null
          resource_name: string
          service_area?: string[] | null
          updated_at?: string | null
          verified?: boolean | null
          website_url?: string | null
        }
        Update: {
          accessibility_features?: string[] | null
          address?: string | null
          category?: string
          contact_email?: string | null
          contact_phone?: string | null
          cost_info?: string | null
          created_at?: string | null
          description?: string | null
          eligibility_requirements?: string | null
          hours_of_operation?: Json | null
          id?: string
          languages_supported?: string[] | null
          rating?: number | null
          resource_name?: string
          service_area?: string[] | null
          updated_at?: string | null
          verified?: boolean | null
          website_url?: string | null
        }
        Relationships: []
      }
      session_participants: {
        Row: {
          completed: boolean | null
          feedback_rating: number | null
          feedback_text: string | null
          id: string
          joined_at: string | null
          participant_id: string
          session_id: string
          time_credits_earned: number | null
        }
        Insert: {
          completed?: boolean | null
          feedback_rating?: number | null
          feedback_text?: string | null
          id?: string
          joined_at?: string | null
          participant_id: string
          session_id: string
          time_credits_earned?: number | null
        }
        Update: {
          completed?: boolean | null
          feedback_rating?: number | null
          feedback_text?: string | null
          id?: string
          joined_at?: string | null
          participant_id?: string
          session_id?: string
          time_credits_earned?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "session_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "learning_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_badges: {
        Row: {
          badge_image_url: string | null
          badge_name: string
          created_at: string | null
          description: string | null
          id: string
          requirements: Json | null
          skill_id: string | null
        }
        Insert: {
          badge_image_url?: string | null
          badge_name: string
          created_at?: string | null
          description?: string | null
          id?: string
          requirements?: Json | null
          skill_id?: string | null
        }
        Update: {
          badge_image_url?: string | null
          badge_name?: string
          created_at?: string | null
          description?: string | null
          id?: string
          requirements?: Json | null
          skill_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_badges_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      skills_catalog: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          prerequisites: Json | null
          skill_name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          prerequisites?: Json | null
          skill_name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          prerequisites?: Json | null
          skill_name?: string
          updated_at?: string | null
        }
        Relationships: []
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
      story_recordings: {
        Row: {
          created_at: string | null
          date_recorded: string | null
          description: string | null
          elder_id: string
          family_access_only: boolean | null
          id: string
          is_public: boolean | null
          recorded_by: string
          recording_url: string | null
          title: string
          topics: string[] | null
          transcript: string | null
        }
        Insert: {
          created_at?: string | null
          date_recorded?: string | null
          description?: string | null
          elder_id: string
          family_access_only?: boolean | null
          id?: string
          is_public?: boolean | null
          recorded_by: string
          recording_url?: string | null
          title: string
          topics?: string[] | null
          transcript?: string | null
        }
        Update: {
          created_at?: string | null
          date_recorded?: string | null
          description?: string | null
          elder_id?: string
          family_access_only?: boolean | null
          id?: string
          is_public?: boolean | null
          recorded_by?: string
          recording_url?: string | null
          title?: string
          topics?: string[] | null
          transcript?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "story_recordings_elder_id_fkey"
            columns: ["elder_id"]
            isOneToOne: false
            referencedRelation: "elder_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      support_matches: {
        Row: {
          created_at: string | null
          elder_id: string
          end_date: string | null
          id: string
          match_score: number | null
          match_type: string | null
          notes: string | null
          start_date: string | null
          status: string | null
          updated_at: string | null
          volunteer_id: string
        }
        Insert: {
          created_at?: string | null
          elder_id: string
          end_date?: string | null
          id?: string
          match_score?: number | null
          match_type?: string | null
          notes?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          volunteer_id: string
        }
        Update: {
          created_at?: string | null
          elder_id?: string
          end_date?: string | null
          id?: string
          match_score?: number | null
          match_type?: string | null
          notes?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_matches_elder_id_fkey"
            columns: ["elder_id"]
            isOneToOne: false
            referencedRelation: "elder_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_matches_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_issues: {
        Row: {
          created_at: string | null
          date_reported: string | null
          description: string
          documentation: Json | null
          id: string
          issue_type: string
          priority_level: number | null
          property_id: string | null
          reporter_id: string
          resolution_notes: string | null
          status: Database["public"]["Enums"]["tenant_issue_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_reported?: string | null
          description: string
          documentation?: Json | null
          id?: string
          issue_type: string
          priority_level?: number | null
          property_id?: string | null
          reporter_id: string
          resolution_notes?: string | null
          status?: Database["public"]["Enums"]["tenant_issue_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_reported?: string | null
          description?: string
          documentation?: Json | null
          id?: string
          issue_type?: string
          priority_level?: number | null
          property_id?: string | null
          reporter_id?: string
          resolution_notes?: string | null
          status?: Database["public"]["Enums"]["tenant_issue_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_issues_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "rental_properties"
            referencedColumns: ["id"]
          },
        ]
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
      transportation_offers: {
        Row: {
          cargo_capacity: string | null
          contact_method: string | null
          created_at: string | null
          departure_location: string
          departure_time: string | null
          destination_area: string | null
          driver_id: string
          fuel_range_miles: number | null
          id: string
          pet_friendly: boolean | null
          route_flexibility: string | null
          seats_available: number
          special_requirements: string | null
          status: string | null
          updated_at: string | null
          vehicle_type: string
          wheelchair_accessible: boolean | null
        }
        Insert: {
          cargo_capacity?: string | null
          contact_method?: string | null
          created_at?: string | null
          departure_location: string
          departure_time?: string | null
          destination_area?: string | null
          driver_id: string
          fuel_range_miles?: number | null
          id?: string
          pet_friendly?: boolean | null
          route_flexibility?: string | null
          seats_available: number
          special_requirements?: string | null
          status?: string | null
          updated_at?: string | null
          vehicle_type: string
          wheelchair_accessible?: boolean | null
        }
        Update: {
          cargo_capacity?: string | null
          contact_method?: string | null
          created_at?: string | null
          departure_location?: string
          departure_time?: string | null
          destination_area?: string | null
          driver_id?: string
          fuel_range_miles?: number | null
          id?: string
          pet_friendly?: boolean | null
          route_flexibility?: string | null
          seats_available?: number
          special_requirements?: string | null
          status?: string | null
          updated_at?: string | null
          vehicle_type?: string
          wheelchair_accessible?: boolean | null
        }
        Relationships: []
      }
      transportation_requests: {
        Row: {
          assigned_driver_id: string | null
          created_at: string | null
          destination_area: string
          household_id: string | null
          id: string
          luggage_description: string | null
          medical_priority: boolean | null
          notes: string | null
          passengers_count: number
          pets_count: number | null
          pickup_location: string
          pickup_time_preferred: string | null
          requester_id: string
          special_needs: string | null
          status: string | null
          transportation_offer_id: string | null
          updated_at: string | null
          wheelchair_needed: boolean | null
        }
        Insert: {
          assigned_driver_id?: string | null
          created_at?: string | null
          destination_area: string
          household_id?: string | null
          id?: string
          luggage_description?: string | null
          medical_priority?: boolean | null
          notes?: string | null
          passengers_count: number
          pets_count?: number | null
          pickup_location: string
          pickup_time_preferred?: string | null
          requester_id: string
          special_needs?: string | null
          status?: string | null
          transportation_offer_id?: string | null
          updated_at?: string | null
          wheelchair_needed?: boolean | null
        }
        Update: {
          assigned_driver_id?: string | null
          created_at?: string | null
          destination_area?: string
          household_id?: string | null
          id?: string
          luggage_description?: string | null
          medical_priority?: boolean | null
          notes?: string | null
          passengers_count?: number
          pets_count?: number | null
          pickup_location?: string
          pickup_time_preferred?: string | null
          requester_id?: string
          special_needs?: string | null
          status?: string | null
          transportation_offer_id?: string | null
          updated_at?: string | null
          wheelchair_needed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "transportation_requests_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transportation_requests_transportation_offer_id_fkey"
            columns: ["transportation_offer_id"]
            isOneToOne: false
            referencedRelation: "transportation_offers"
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
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string | null
          evidence_url: string | null
          id: string
          user_id: string
          verified_by: string | null
        }
        Insert: {
          badge_id: string
          earned_at?: string | null
          evidence_url?: string | null
          id?: string
          user_id: string
          verified_by?: string | null
        }
        Update: {
          badge_id?: string
          earned_at?: string | null
          evidence_url?: string | null
          id?: string
          user_id?: string
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "skill_badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string
          assigned_by: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      user_skills: {
        Row: {
          availability_schedule: Json | null
          bio: string | null
          created_at: string | null
          hourly_rate: number | null
          id: string
          is_learning: boolean | null
          is_teaching: boolean | null
          preferred_location:
            | Database["public"]["Enums"]["location_type"][]
            | null
          skill_id: string
          skill_level: Database["public"]["Enums"]["skill_level"]
          teaching_styles:
            | Database["public"]["Enums"]["teaching_style"][]
            | null
          updated_at: string | null
          user_id: string
          years_experience: number | null
        }
        Insert: {
          availability_schedule?: Json | null
          bio?: string | null
          created_at?: string | null
          hourly_rate?: number | null
          id?: string
          is_learning?: boolean | null
          is_teaching?: boolean | null
          preferred_location?:
            | Database["public"]["Enums"]["location_type"][]
            | null
          skill_id: string
          skill_level: Database["public"]["Enums"]["skill_level"]
          teaching_styles?:
            | Database["public"]["Enums"]["teaching_style"][]
            | null
          updated_at?: string | null
          user_id: string
          years_experience?: number | null
        }
        Update: {
          availability_schedule?: Json | null
          bio?: string | null
          created_at?: string | null
          hourly_rate?: number | null
          id?: string
          is_learning?: boolean | null
          is_teaching?: boolean | null
          preferred_location?:
            | Database["public"]["Enums"]["location_type"][]
            | null
          skill_id?: string
          skill_level?: Database["public"]["Enums"]["skill_level"]
          teaching_styles?:
            | Database["public"]["Enums"]["teaching_style"][]
            | null
          updated_at?: string | null
          user_id?: string
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      ushahidi_sync: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          last_synced_at: string | null
          local_incident_id: string | null
          sync_status: string | null
          ushahidi_post_id: number | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          last_synced_at?: string | null
          local_incident_id?: string | null
          sync_status?: string | null
          ushahidi_post_id?: number | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          last_synced_at?: string | null
          local_incident_id?: string | null
          sync_status?: string | null
          ushahidi_post_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ushahidi_sync_local_incident_id_fkey"
            columns: ["local_incident_id"]
            isOneToOne: false
            referencedRelation: "damage_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      utility_data: {
        Row: {
          account_number: string | null
          carbon_footprint_kg: number | null
          cost_amount: number | null
          created_at: string | null
          id: string
          meter_reading: number | null
          rate_schedule: string | null
          reading_date: string
          time_of_use_data: Json | null
          usage_kwh: number | null
          user_id: string
          utility_provider: string | null
        }
        Insert: {
          account_number?: string | null
          carbon_footprint_kg?: number | null
          cost_amount?: number | null
          created_at?: string | null
          id?: string
          meter_reading?: number | null
          rate_schedule?: string | null
          reading_date: string
          time_of_use_data?: Json | null
          usage_kwh?: number | null
          user_id: string
          utility_provider?: string | null
        }
        Update: {
          account_number?: string | null
          carbon_footprint_kg?: number | null
          cost_amount?: number | null
          created_at?: string | null
          id?: string
          meter_reading?: number | null
          rate_schedule?: string | null
          reading_date?: string
          time_of_use_data?: Json | null
          usage_kwh?: number | null
          user_id?: string
          utility_provider?: string | null
        }
        Relationships: []
      }
      visit_logs: {
        Row: {
          actual_end_time: string | null
          actual_start_time: string | null
          created_at: string | null
          elder_id: string
          elder_mood: string | null
          emergency_triggered: boolean | null
          family_notification_sent: boolean | null
          follow_up_needed: boolean | null
          follow_up_notes: string | null
          id: string
          photos: string[] | null
          tasks_completed: string[] | null
          visit_notes: string | null
          visit_request_id: string
          volunteer_id: string
        }
        Insert: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          created_at?: string | null
          elder_id: string
          elder_mood?: string | null
          emergency_triggered?: boolean | null
          family_notification_sent?: boolean | null
          follow_up_needed?: boolean | null
          follow_up_notes?: string | null
          id?: string
          photos?: string[] | null
          tasks_completed?: string[] | null
          visit_notes?: string | null
          visit_request_id: string
          volunteer_id: string
        }
        Update: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          created_at?: string | null
          elder_id?: string
          elder_mood?: string | null
          emergency_triggered?: boolean | null
          family_notification_sent?: boolean | null
          follow_up_needed?: boolean | null
          follow_up_notes?: string | null
          id?: string
          photos?: string[] | null
          tasks_completed?: string[] | null
          visit_notes?: string | null
          visit_request_id?: string
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "visit_logs_elder_id_fkey"
            columns: ["elder_id"]
            isOneToOne: false
            referencedRelation: "elder_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visit_logs_visit_request_id_fkey"
            columns: ["visit_request_id"]
            isOneToOne: false
            referencedRelation: "visit_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visit_logs_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      visit_requests: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          elder_id: string
          id: string
          location_address: string | null
          location_type: string | null
          requested_by: string
          scheduled_date: string
          special_requirements: string[] | null
          status: string | null
          updated_at: string | null
          urgency_level: string | null
          visit_type: string
          volunteer_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          elder_id: string
          id?: string
          location_address?: string | null
          location_type?: string | null
          requested_by: string
          scheduled_date: string
          special_requirements?: string[] | null
          status?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          visit_type: string
          volunteer_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          elder_id?: string
          id?: string
          location_address?: string | null
          location_type?: string | null
          requested_by?: string
          scheduled_date?: string
          special_requirements?: string[] | null
          status?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          visit_type?: string
          volunteer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "visit_requests_elder_id_fkey"
            columns: ["elder_id"]
            isOneToOne: false
            referencedRelation: "elder_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visit_requests_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_assignments: {
        Row: {
          assignment_type: string
          completion_notes: string | null
          coordinator_id: string | null
          created_at: string | null
          description: string
          equipment_needed: string[] | null
          estimated_duration_hours: number | null
          hours_logged: number | null
          id: string
          location_description: string | null
          location_lat: number | null
          location_lng: number | null
          priority_level: number | null
          safety_briefing: string | null
          skills_required: string[] | null
          start_time: string | null
          status: string | null
          team_members: string[] | null
          updated_at: string | null
          volunteer_id: string
        }
        Insert: {
          assignment_type: string
          completion_notes?: string | null
          coordinator_id?: string | null
          created_at?: string | null
          description: string
          equipment_needed?: string[] | null
          estimated_duration_hours?: number | null
          hours_logged?: number | null
          id?: string
          location_description?: string | null
          location_lat?: number | null
          location_lng?: number | null
          priority_level?: number | null
          safety_briefing?: string | null
          skills_required?: string[] | null
          start_time?: string | null
          status?: string | null
          team_members?: string[] | null
          updated_at?: string | null
          volunteer_id: string
        }
        Update: {
          assignment_type?: string
          completion_notes?: string | null
          coordinator_id?: string | null
          created_at?: string | null
          description?: string
          equipment_needed?: string[] | null
          estimated_duration_hours?: number | null
          hours_logged?: number | null
          id?: string
          location_description?: string | null
          location_lat?: number | null
          location_lng?: number | null
          priority_level?: number | null
          safety_briefing?: string | null
          skills_required?: string[] | null
          start_time?: string | null
          status?: string | null
          team_members?: string[] | null
          updated_at?: string | null
          volunteer_id?: string
        }
        Relationships: []
      }
      volunteer_matches: {
        Row: {
          accepted_at: string | null
          completed_at: string | null
          created_at: string | null
          factors: Json | null
          id: string
          match_score: number | null
          need_id: string | null
          notified_at: string | null
          status: string | null
          volunteer_id: string | null
        }
        Insert: {
          accepted_at?: string | null
          completed_at?: string | null
          created_at?: string | null
          factors?: Json | null
          id?: string
          match_score?: number | null
          need_id?: string | null
          notified_at?: string | null
          status?: string | null
          volunteer_id?: string | null
        }
        Update: {
          accepted_at?: string | null
          completed_at?: string | null
          created_at?: string | null
          factors?: Json | null
          id?: string
          match_score?: number | null
          need_id?: string | null
          notified_at?: string | null
          status?: string | null
          volunteer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_matches_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "mutual_aid_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_matches_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_profiles: {
        Row: {
          availability_days: string[] | null
          availability_times: Json | null
          background_check_date: string | null
          created_at: string | null
          full_name: string
          id: string
          languages_spoken: string[] | null
          max_hours_per_week: number | null
          phone_number: string | null
          references_verified: boolean | null
          skills: string[] | null
          specializations: string[] | null
          transportation_available: boolean | null
          updated_at: string | null
          volunteer_id: string
        }
        Insert: {
          availability_days?: string[] | null
          availability_times?: Json | null
          background_check_date?: string | null
          created_at?: string | null
          full_name: string
          id?: string
          languages_spoken?: string[] | null
          max_hours_per_week?: number | null
          phone_number?: string | null
          references_verified?: boolean | null
          skills?: string[] | null
          specializations?: string[] | null
          transportation_available?: boolean | null
          updated_at?: string | null
          volunteer_id: string
        }
        Update: {
          availability_days?: string[] | null
          availability_times?: Json | null
          background_check_date?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          languages_spoken?: string[] | null
          max_hours_per_week?: number | null
          phone_number?: string | null
          references_verified?: boolean | null
          skills?: string[] | null
          specializations?: string[] | null
          transportation_available?: boolean | null
          updated_at?: string | null
          volunteer_id?: string
        }
        Relationships: []
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
      assign_user_role: {
        Args: { target_user_id: string; new_role: string; assigner_id: string }
        Returns: undefined
      }
      calculate_network_density: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      cleanup_expired_oauth_states: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      get_users_with_roles: {
        Args: Record<PropertyKey, never>
        Returns: {
          user_id: string
          pseudonym: string
          role: string
          assigned_at: string
        }[]
      }
      update_solidarity_metrics: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      campaign_status: "planning" | "active" | "completed" | "paused"
      care_request_status:
        | "open"
        | "accepted"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
      course_status: "draft" | "published" | "archived"
      crisis_priority: "low" | "medium" | "high" | "critical"
      crop_season: "spring" | "summer" | "fall" | "winter" | "year_round"
      distribution_type:
        | "pantry"
        | "fridge"
        | "mobile"
        | "gleaning"
        | "meal_share"
      emergency_contact_relationship:
        | "parent"
        | "guardian"
        | "grandparent"
        | "relative"
        | "family_friend"
        | "other"
      energy_asset_type:
        | "solar_panel"
        | "battery"
        | "ev_charger"
        | "generator"
        | "wind_turbine"
      energy_project_type:
        | "solar_group_buy"
        | "weatherization"
        | "microgrid"
        | "efficiency"
        | "storage"
      environmental_threat_level: "low" | "medium" | "high" | "critical"
      food_asset_type:
        | "garden"
        | "fruit_tree"
        | "nut_tree"
        | "foraging_spot"
        | "chicken_coop"
        | "beehive"
        | "indoor_growing"
      fulfillment_status: "open" | "in_progress" | "fulfilled" | "expired"
      harvest_season: "spring" | "summer" | "fall" | "winter" | "year_round"
      learning_format:
        | "one_on_one"
        | "small_group"
        | "large_class"
        | "self_paced"
        | "apprenticeship"
      legal_case_status: "intake" | "active" | "resolved" | "referred"
      location_type: "in_person" | "virtual" | "hybrid"
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
      project_status:
        | "planning"
        | "organizing"
        | "active"
        | "completed"
        | "cancelled"
      property_alert_type: "sale" | "development" | "zoning" | "violation"
      reservation_status:
        | "pending"
        | "approved"
        | "active"
        | "completed"
        | "cancelled"
        | "overdue"
      resource_type: "tool" | "equipment" | "material" | "service" | "knowledge"
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
      skill_level: "beginner" | "intermediate" | "advanced" | "expert"
      soil_type: "clay" | "sandy" | "loamy" | "rocky" | "amended"
      sun_exposure: "full_sun" | "partial_sun" | "partial_shade" | "full_shade"
      teaching_style:
        | "hands_on"
        | "lecture"
        | "discussion"
        | "project_based"
        | "mentoring"
      tenant_issue_status: "open" | "in_progress" | "resolved" | "escalated"
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
      campaign_status: ["planning", "active", "completed", "paused"],
      care_request_status: [
        "open",
        "accepted",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
      ],
      course_status: ["draft", "published", "archived"],
      crisis_priority: ["low", "medium", "high", "critical"],
      crop_season: ["spring", "summer", "fall", "winter", "year_round"],
      distribution_type: [
        "pantry",
        "fridge",
        "mobile",
        "gleaning",
        "meal_share",
      ],
      emergency_contact_relationship: [
        "parent",
        "guardian",
        "grandparent",
        "relative",
        "family_friend",
        "other",
      ],
      energy_asset_type: [
        "solar_panel",
        "battery",
        "ev_charger",
        "generator",
        "wind_turbine",
      ],
      energy_project_type: [
        "solar_group_buy",
        "weatherization",
        "microgrid",
        "efficiency",
        "storage",
      ],
      environmental_threat_level: ["low", "medium", "high", "critical"],
      food_asset_type: [
        "garden",
        "fruit_tree",
        "nut_tree",
        "foraging_spot",
        "chicken_coop",
        "beehive",
        "indoor_growing",
      ],
      fulfillment_status: ["open", "in_progress", "fulfilled", "expired"],
      harvest_season: ["spring", "summer", "fall", "winter", "year_round"],
      learning_format: [
        "one_on_one",
        "small_group",
        "large_class",
        "self_paced",
        "apprenticeship",
      ],
      legal_case_status: ["intake", "active", "resolved", "referred"],
      location_type: ["in_person", "virtual", "hybrid"],
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
      project_status: [
        "planning",
        "organizing",
        "active",
        "completed",
        "cancelled",
      ],
      property_alert_type: ["sale", "development", "zoning", "violation"],
      reservation_status: [
        "pending",
        "approved",
        "active",
        "completed",
        "cancelled",
        "overdue",
      ],
      resource_type: ["tool", "equipment", "material", "service", "knowledge"],
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
      skill_level: ["beginner", "intermediate", "advanced", "expert"],
      soil_type: ["clay", "sandy", "loamy", "rocky", "amended"],
      sun_exposure: ["full_sun", "partial_sun", "partial_shade", "full_shade"],
      teaching_style: [
        "hands_on",
        "lecture",
        "discussion",
        "project_based",
        "mentoring",
      ],
      tenant_issue_status: ["open", "in_progress", "resolved", "escalated"],
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
