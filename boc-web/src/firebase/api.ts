import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { db } from "./config";

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

const TASKS_COLLECTION = "tasks";
const TEAM_MEMBERS_COLLECTION = "team_members";

// --- Tasks ---

export const getTasks = async (): Promise<Task[]> => {
  const tasksRef = collection(db, TASKS_COLLECTION);
  const q = query(tasksRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Task));
};

export const addTask = async (task: Omit<Task, "id" | "createdAt">) => {
  const tasksRef = collection(db, TASKS_COLLECTION);
  return await addDoc(tasksRef, {
    ...task,
    createdAt: serverTimestamp()
  });
};

export const updateTask = async (id: string, data: Partial<Task>) => {
  const taskRef = doc(db, TASKS_COLLECTION, id);
  return await updateDoc(taskRef, data);
};

export const deleteTask = async (id: string) => {
  const taskRef = doc(db, TASKS_COLLECTION, id);
  return await deleteDoc(taskRef);
};

// --- Team Members ---

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const teamRef = collection(db, TEAM_MEMBERS_COLLECTION);
  const q = query(teamRef, orderBy("name", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as TeamMember));
};

export const addTeamMember = async (name: string) => {
  const teamRef = collection(db, TEAM_MEMBERS_COLLECTION);
  return await addDoc(teamRef, {
    name,
    createdAt: serverTimestamp()
  });
};

export const deleteTeamMember = async (id: string) => {
  const teamRef = doc(db, TEAM_MEMBERS_COLLECTION, id);
  return await deleteDoc(teamRef);
};