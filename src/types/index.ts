import { Timestamp } from "firebase/firestore";

export interface Task {
  id?: string;
  title: string;
  assignees: string[];
  status: "Todo" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  createdAt?: Timestamp;
}

export interface TeamMember {
  id?: string;
  name: string;
  createdAt?: Timestamp;
}

export interface Meeting {
  id?: string;
  title: string;
  description: string;
  date: string;
  presentMemberIds: string[];
  createdAt?: Timestamp;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  points: number;
}

export interface Quiz {
  id?: string;
  title: string;
  description: string;
  timeLimit: number;
  questions: Question[];
  isActive: boolean;
  createdAt?: Timestamp;
}

export interface QuizSubmission {
  id?: string;
  quizId: string;
  userName: string;
  userEmail: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  completedAt?: Timestamp;
}
