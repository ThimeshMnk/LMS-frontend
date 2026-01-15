export interface Lecture {
  id: number;
  title: string;
  duration: string;
  gdrive_id: string;
  thumbnail: string | null;
  created_at: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  teacher_name: string;
  enrollment_key_required: boolean;
  lectures_count: number;
  lectures?: Lecture[]; 
}

// Response Wrapper
export interface ApiResponse<T> {
  data: T;
}

export interface Option {
  id: number;
  question_id: number;
  option_text: string;
  // We don't include 'is_correct' here for students! 
  // The backend will check the answer.
}

export interface Question {
  id: number;
  lecture_id: number;
  question_text: string;
  options: Option[];
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
}