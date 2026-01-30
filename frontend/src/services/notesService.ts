import type { Note } from "../pages/NotesDashboard";

// Fetch all notes
export const getNotesFromServer = async (): Promise<Note[]> => {
  const response = await fetch("http://localhost:3000/api/notes");
  const items = await response.json();
  return items.map((serverItem: any) => mapServerItemToLocalItem(serverItem));
};

// Add a new note
export const addNotesToServer = async (
  noteData: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const response = await fetch("http://localhost:3000/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};

// Update a note
export const updateNotesOnServer = async (
  id: string,
  updatedFields: Partial<Omit<Note, "id" | "createdAt" | "updatedAt">>
): Promise<Note> => {
  const response = await fetch(`http://localhost:3000/api/notes/${id}/updatenotes`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields),
  });
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};

// Delete a note
export const deleteNotesFromServer = async (id: string): Promise<string> => {
  const response = await fetch(`http://localhost:3000/api/notes/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete note"); // handle errors
  return id; // we already know the id
};


// Mapping function
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
