export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          role: Database["public"]["Enums"]["user_role"]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          created_at?: string
          updated_at?: string
        }
      }
      site_settings: {
        Row: {
          key: string
          value: string
          updated_at: string
        }
        Insert: {
          key: string
          value: string
          updated_at?: string
        }
        Update: {
          key?: string
          value?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          slug: string
          description: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      products: {
        Row: {
          id: number
          title: string
          description: string
          price: number
          image_url: string | null
          file_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          price: number
          image_url?: string | null
          file_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          price?: number
          image_url?: string | null
          file_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      product_categories: {
        Row: {
          product_id: number
          category_id: number
        }
        Insert: {
          product_id: number
          category_id: number
        }
        Update: {
          product_id?: number
          category_id?: number
        }
      }
      courses: {
        Row: {
          id: number
          title: string
          slug: string
          description: string
          full_description: string | null
          hours: string | null
          price: number | null
          status: Database["public"]["Enums"]["course_status"]
          featured: boolean
          image_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          slug: string
          description: string
          full_description?: string | null
          hours?: string | null
          price?: number | null
          status?: Database["public"]["Enums"]["course_status"]
          featured?: boolean
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          slug?: string
          description?: string
          full_description?: string | null
          hours?: string | null
          price?: number | null
          status?: Database["public"]["Enums"]["course_status"]
          featured?: boolean
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      course_modules: {
        Row: {
          id: number
          course_id: number
          title: string
          order_index: number
          content: Json | null
          created_at: string
        }
        Insert: {
          id?: number
          course_id: number
          title: string
          order_index: number
          content?: Json | null
          created_at?: string
        }
        Update: {
          id?: number
          course_id?: number
          title?: string
          order_index?: number
          content?: Json | null
          created_at?: string
        }
      }
      services: {
        Row: {
          id: number
          title: string
          description: string
          icon: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          icon?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          icon?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: number
          title: string
          excerpt: string
          content: string
          cover_image_url: string | null
          author_id: string | null
          published_at: string | null
          status: Database["public"]["Enums"]["blog_status"]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          excerpt: string
          content: string
          cover_image_url?: string | null
          author_id?: string | null
          published_at?: string | null
          status?: Database["public"]["Enums"]["blog_status"]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          excerpt?: string
          content?: string
          cover_image_url?: string | null
          author_id?: string | null
          published_at?: string | null
          status?: Database["public"]["Enums"]["blog_status"]
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: number
          name: string
          role: string
          quote: string
          avatar_url: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          role: string
          quote: string
          avatar_url?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          role?: string
          quote?: string
          avatar_url?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      faq_items: {
        Row: {
          id: number
          question: string
          answer: string
          order_index: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          question: string
          answer: string
          order_index: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          question?: string
          answer?: string
          order_index?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      features: {
        Row: {
          id: number
          title: string
          description: string
          icon: string
          order_index: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          icon: string
          order_index: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          icon?: string
          order_index?: number
          is_active?: boolean
          created_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: number
          full_name: string
          email: string
          request_type: string
          message: string
          status: Database["public"]["Enums"]["message_status"]
          created_at: string
        }
        Insert: {
          id?: number
          full_name: string
          email: string
          request_type: string
          message: string
          status?: Database["public"]["Enums"]["message_status"]
          created_at?: string
        }
        Update: {
          id?: number
          full_name?: string
          email?: string
          request_type?: string
          message?: string
          status?: Database["public"]["Enums"]["message_status"]
          created_at?: string
        }
      }
      refund_requests: {
        Row: {
          id: number
          full_name: string
          registration_number: string
          email: string
          bank_rib: string
          account_holder: string
          bank_name: string
          reason: string | null
          status: Database["public"]["Enums"]["refund_status"]
          created_at: string
        }
        Insert: {
          id?: number
          full_name: string
          registration_number: string
          email: string
          bank_rib: string
          account_holder: string
          bank_name: string
          reason?: string | null
          status?: Database["public"]["Enums"]["refund_status"]
          created_at?: string
        }
        Update: {
          id?: number
          full_name?: string
          registration_number?: string
          email?: string
          bank_rib?: string
          account_holder?: string
          bank_name?: string
          reason?: string | null
          status?: Database["public"]["Enums"]["refund_status"]
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: number
          user_id: string | null
          total_amount: number
          status: Database["public"]["Enums"]["order_status"]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id?: string | null
          total_amount: number
          status?: Database["public"]["Enums"]["order_status"]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string | null
          total_amount?: number
          status?: Database["public"]["Enums"]["order_status"]
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: number
          quantity: number
          unit_price: number
          created_at: string
        }
        Insert: {
          id?: number
          order_id: number
          product_id: number
          quantity?: number
          unit_price: number
          created_at?: string
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: number
          quantity?: number
          unit_price?: number
          created_at?: string
        }
      }
      enrollments: {
        Row: {
          id: number
          user_id: string
          course_id: number
          status: Database["public"]["Enums"]["enrollment_status"]
          enrolled_at: string
          completed_at: string | null
        }
        Insert: {
          id?: number
          user_id: string
          course_id: number
          status?: Database["public"]["Enums"]["enrollment_status"]
          enrolled_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          course_id?: number
          status?: Database["public"]["Enums"]["enrollment_status"]
          enrolled_at?: string
          completed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "admin" | "editor" | "user"
      course_status: "upcoming" | "open" | "closed"
      blog_status: "draft" | "published"
      order_status: "pending" | "paid" | "completed" | "cancelled"
      enrollment_status: "pending" | "active" | "completed"
      refund_status: "pending" | "approved" | "rejected"
      message_status: "new" | "read" | "responded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof DatabaseWithoutInternals, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
  }
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
  }
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
  }
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
  }
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
      ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
      : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
  }
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
      ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
      : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "editor", "user"],
      course_status: ["upcoming", "open", "closed"],
      blog_status: ["draft", "published"],
      order_status: ["pending", "paid", "completed", "cancelled"],
      enrollment_status: ["pending", "active", "completed"],
      refund_status: ["pending", "approved", "rejected"],
      message_status: ["new", "read", "responded"],
    },
  },
} as const
