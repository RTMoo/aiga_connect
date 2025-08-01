// User types
export interface User {
  id: number;
  email: string;
  username: string;
  role: 'parent' | 'child' | 'trainer' | 'athlete' | 'coach';
  email_verified: boolean;
  date_joined: string;
}

// Base Profile type
export interface Profile {
  user_id: number;
  user_email: string;
  username: string;
  user_role: string;
  user_email_verified: boolean;
  first_name: string;
  last_name: string;
  birth_date?: string;
  phone?: string;
  updated_at: string;
  created_at: string;
  // Trainer specific fields
  bio?: string;
  training_zone_address?: string;
  monthly_price?: number;
  // Athlete specific fields
  height_cm?: number;
  weight_kg?: number;
  belt_grade?: string;
  // Parent specific fields
  address?: string;
}

// Profile types
export interface BaseProfile {
  id: number;
  user: User;
  created_at: string;
  updated_at: string;
}

export interface TrainerProfile extends BaseProfile {
  experience_years: number;
  belt_level: string;
  specialization: string;
  bio: string;
  hourly_rate?: number;
  students_count: number;
  rating: number;
}

export interface AthleteProfile extends BaseProfile {
  age: number;
  belt_level: string;
  weight_class: string;
  experience_years: number;
  achievements: string[];
  parent?: User;
}

export interface ParentProfile extends BaseProfile {
  children: AthleteProfile[];
  phone_number?: string;
  address?: string;
}

export interface ChildProfile extends BaseProfile {
  age: number;
  belt_level: string;
  weight_class: string;
  experience_years: number;
  achievements: string[];
  parent: User;
  grade: string;
}

// Training session types
export interface TrainingSession {
  id: number;
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: number;
  max_participants?: number;
  current_participants?: number;
  location?: string;
  trainer?: User;
  participants?: User[];
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  session_type: 'group' | 'individual';
  created_at: string;
  updated_at: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface ConfirmCodeRequest {
  email: string;
  code: string;
}

export interface AuthResponse {
  user: User;
  message?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

// Error types
export interface ApiError {
  detail: string;
  code?: string;
  field?: string;
}

// Form types
export interface CreateSessionForm {
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: number;
  max_participants?: number;
  location?: string;
  athlete_id?: number;
}

export interface UpdateProfileForm {
  bio?: string;
  experience_years?: number;
  belt_level?: string;
  specialization?: string;
  hourly_rate?: number;
  age?: number;
  weight_class?: string;
  achievements?: string[];
  phone_number?: string;
  address?: string;
}

export interface Chat {
  chat_id: number;
  second_user: string;
  last_message?: {
    text: string;
    author: string | null;
    created_at: string;
  };
  created_at: string;
}

export interface Message {
  id: number;
  chat_id: number;
  text: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface CreateChatRequest {
  to_user: string;
} 