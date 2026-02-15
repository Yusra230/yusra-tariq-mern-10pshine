import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/notesDashboard/Header";
import MobileMenu from "../components/notesDashboard/MobileMenu";
import AnimatedBackground from "../components/notesDashboard/AnimatedBackground";
import TopActionsBar from "../components/notesDashboard/TopActions";
import FilterTabs from "../components/notesDashboard/FilterTabs";
import NotesSection from "../components/notesDashboard/NotesSection";
import EmptyState from "../components/notesDashboard/EmptyState";
import GlobalStyles from "../components/notesDashboard/GlobalStyles";
import { Pin } from "lucide-react";
import { getNotesFromServer, addNotesToServer, updateNotesOnServer, deleteNotesFromServer } from '../services/notesService';

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  color: string;
  format: "plain" | "markdown" | "html";
  createdAt: string;
  updatedAt: string;
}

const NotesDashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Sample notes data
  const [notes, setNotes] = useState<Note[]>([]);
  // Load notes from server on mount
  useEffect(() => {
    getNotesFromServer().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  console.log(notes);
  // Add a new note
  const handleNewNote = async ({
    title,
    content,
    tags = [],
    isPinned = false,
    isArchived = false,
    color = "#ffffff",
    format = "plain",
  }) => {
    console.log(`New Note Added: ${title}`);
    const newNote = await addNotesToServer({
      title,
      content,
      tags,
      isPinned,
      isArchived,
      color,
      format,
    });

    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  
  // Delete a note
  const handleDeleteNote = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const deletedId = await deleteNotesFromServer(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== deletedId));
    } catch (error) {
      console.error(error);
      alert("Failed to delete note 😢");
    }
  };
  

  // Update a note (e.g., edit content, pin/unpin, archive/unarchive)
  // const handleUpdateNote = async (id, updatedFields) => {
  //   const updatedNote = await updateNotesOnServer(id, updatedFields);
  //   setNotes((prevNotes) =>
  //     prevNotes.map((note) => (note.id === id ? updatedNote : note))
  //   );
  // };

  // Optional: sort notes — pinned notes first, then by createdAt descending
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned === b.isPinned) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return a.isPinned ? -1 : 1;
  });

  
  const handleCreateNote = () => {
    console.log("Navigate to note editor");
    navigate("/noteseditor");
  };

  const handleMenuToggle = (noteId: string) => {
    setOpenMenuId(openMenuId === noteId ? null : noteId);
  };

  const handleCloseMenu = () => {
    setOpenMenuId(null);
  };

  const pinnedNotes = notes.filter((note) => note.isPinned);
  const regularNotes = notes.filter((note) => !note.isPinned);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 via-purple-50 to-indigo-100">
      <AnimatedBackground />
      <GlobalStyles />

      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <MobileMenu isOpen={isMobileMenuOpen} />

      <main
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10"
        onClick={handleCloseMenu}
      >
        <TopActionsBar
          viewMode={viewMode}
          setViewMode={setViewMode}
          notesCount={notes.length}
          onCreateNote={handleCreateNote}
        />

        <FilterTabs
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {notes.length === 0 ? (
          <EmptyState onCreateNote={handleCreateNote} />
        ) : (
          <>
            {pinnedNotes.length > 0 && (
              <NotesSection
                title="Pinned Notes"
                notes={pinnedNotes}
                viewMode={viewMode}
                icon={<Pin className="w-5 h-5 text-pink-500" />}
                openMenuId={openMenuId}
                handleMenuToggle={handleMenuToggle}
                handleDeleteNote={handleDeleteNote}
                
              />
            )}

            <NotesSection
              title="All Notes"
              notes={regularNotes}
              viewMode={viewMode}
              openMenuId={openMenuId}
              handleMenuToggle={handleMenuToggle}
              handleDeleteNote = {handleDeleteNote}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default NotesDashboard;
