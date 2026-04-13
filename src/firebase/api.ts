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
  type Firestore
} from "firebase/firestore";
import { db } from "./config";
import { Task, TeamMember, Meeting } from "@/types";

const TASKS_COLLECTION = "tasks";
const TEAM_MEMBERS_COLLECTION = "team_members";
const MEETINGS_COLLECTION = "meetings";

// Helper: ensures Firestore is initialized before any API call.
// These functions are only called from client components — Firebase will always
// be available in the browser. This guard satisfies TypeScript's null check.
function requireDb(): Firestore {
  if (!db) {
    throw new Error(
      "Firestore is not initialized. Ensure NEXT_PUBLIC_FIREBASE_* env vars are set."
    );
  }
  return db;
}

// --- Tasks ---

export const getTasks = async (): Promise<Task[]> => {
  const firestore = requireDb();
  const tasksRef = collection(firestore, TASKS_COLLECTION);
  const q = query(tasksRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Task));
};

export const addTask = async (task: Omit<Task, "id" | "createdAt">) => {
  const firestore = requireDb();
  const tasksRef = collection(firestore, TASKS_COLLECTION);
  return await addDoc(tasksRef, {
    ...task,
    createdAt: serverTimestamp()
  });
};

export const updateTask = async (id: string, data: Partial<Task>) => {
  const firestore = requireDb();
  const taskRef = doc(firestore, TASKS_COLLECTION, id);
  return await updateDoc(taskRef, data);
};

export const deleteTask = async (id: string) => {
  const firestore = requireDb();
  const taskRef = doc(firestore, TASKS_COLLECTION, id);
  return await deleteDoc(taskRef);
};

// --- Team Members ---

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const firestore = requireDb();
  const teamRef = collection(firestore, TEAM_MEMBERS_COLLECTION);
  const q = query(teamRef, orderBy("name", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as TeamMember));
};

export const addTeamMember = async (name: string) => {
  const firestore = requireDb();
  const teamRef = collection(firestore, TEAM_MEMBERS_COLLECTION);
  return await addDoc(teamRef, {
    name,
    createdAt: serverTimestamp()
  });
};

export const deleteTeamMember = async (id: string) => {
  const firestore = requireDb();
  const teamRef = doc(firestore, TEAM_MEMBERS_COLLECTION, id);
  return await deleteDoc(teamRef);
};

// --- Meetings / Attendance ---

export const getMeetings = async (): Promise<Meeting[]> => {
  const firestore = requireDb();
  const meetingsRef = collection(firestore, MEETINGS_COLLECTION);
  const q = query(meetingsRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Meeting));
};

export const addMeeting = async (title: string, description: string, date: string) => {
  const firestore = requireDb();
  const meetingsRef = collection(firestore, MEETINGS_COLLECTION);
  return await addDoc(meetingsRef, {
    title,
    description,
    date,
    presentMemberIds: [],
    createdAt: serverTimestamp()
  });
};

export const updateMeetingAttendance = async (meetingId: string, presentMemberIds: string[]) => {
  const firestore = requireDb();
  const meetingRef = doc(firestore, MEETINGS_COLLECTION, meetingId);
  return await updateDoc(meetingRef, { presentMemberIds });
};

export const deleteMeeting = async (id: string) => {
  const firestore = requireDb();
  const meetingRef = doc(firestore, MEETINGS_COLLECTION, id);
  return await deleteDoc(meetingRef);
};