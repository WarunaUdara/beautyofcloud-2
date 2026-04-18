import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  setDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { db } from "./config";
import { Task, TeamMember, Meeting } from "@/types";

const USERS_COLLECTION = "users";

const TASKS_COLLECTION = "tasks";
const TEAM_MEMBERS_COLLECTION = "team_members";
const MEETINGS_COLLECTION = "meetings";

// --- Users ---

export const checkAndInitializeUser = async (uid: string, email: string | null, name: string | null) => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // Initialize user with role 'user'
    await setDoc(userRef, {
      uid,
      email,
      name,
      role: 'user',
      createdAt: serverTimestamp()
    });
    return 'user';
  }

  // Return the existing role
  const userData = userSnap.data();
  return userData.role || 'user';
};

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

// --- Meetings / Attendance ---

export const getMeetings = async (): Promise<Meeting[]> => {
  const meetingsRef = collection(db, MEETINGS_COLLECTION);
  const q = query(meetingsRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Meeting));
};

export const addMeeting = async (title: string, description: string, date: string) => {
  const meetingsRef = collection(db, MEETINGS_COLLECTION);
  return await addDoc(meetingsRef, {
    title,
    description,
    date,
    presentMemberIds: [],
    createdAt: serverTimestamp()
  });
};

export const updateMeetingAttendance = async (meetingId: string, presentMemberIds: string[]) => {
  const meetingRef = doc(db, MEETINGS_COLLECTION, meetingId);
  return await updateDoc(meetingRef, { presentMemberIds });
};

export const deleteMeeting = async (id: string) => {
  const meetingRef = doc(db, MEETINGS_COLLECTION, id);
  return await deleteDoc(meetingRef);
};