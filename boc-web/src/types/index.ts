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
