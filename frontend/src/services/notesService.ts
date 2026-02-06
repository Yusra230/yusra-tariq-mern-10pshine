import type { Note } from "../pages/NotesDashboard";

// Helper: map server note to local note
const mapServerItemToLocalItem = (serverItem: any): Note => {
  return {
    id: serverItem._id,
    title: serverItem.title,
    content: serverItem.content,
    tags: serverItem.tags || [],
    isPinned: serverItem.isPinned,
    isArchived: serverItem.isArchived,
    color: serverItem.color,
    format: serverItem.format,
    createdAt: serverItem.createdAt,
    updatedAt: serverItem.updatedAt,
  };
};

// Get auth token from localStorage
const getToken = () => localStorage.getItem("token");

// ========== Fetch all notes ==========
export const getNotesFromServer = async (): Promise<Note[]> => {
  const token = getToken();
  const response = await fetch("http://localhost:3000/api/notes", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to fetch notes");
  }

  const items = await response.json();
  return items.map((serverItem: any) => mapServerItemToLocalItem(serverItem));
};

// ========== Add a new note ==========
export const addNotesToServer = async (
  noteData: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const token = getToken();
  const response = await fetch("http://localhost:3000/api/notes", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(noteData),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to add note");
  }

  const item = await response.json();
  return mapServerItemToLocalItem(item);
};

// ========== Update a note ==========
export const updateNotesOnServer = async (
  id: string,
  updatedFields: Partial<Omit<Note, "id" | "createdAt" | "updatedAt">>
): Promise<Note> => {
  const token = getToken();
  const response = await fetch(`http://localhost:3000/api/notes/${id}/updatenotes`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(updatedFields),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to update note");
  }

  const item = await response.json();
  return mapServerItemToLocalItem(item);
};

// ========== Delete a note ==========
export const deleteNotesFromServer = async (id: string): Promise<string> => {
  const token = getToken();
  const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to delete note");
  }

  return id; // we already know the id
};
