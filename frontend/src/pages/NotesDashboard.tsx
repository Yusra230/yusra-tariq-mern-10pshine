import React, { useState } from "react";
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

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  color: string;
  isPinned: boolean;
  isFavorite: boolean;
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
  const [notes] = useState<Note[]>([
    {
      id: "1",
      title: "Morning Inspiration",
      content:
        "Start each day with gratitude and positive affirmations. Remember to breathe, smile, and embrace the beauty around you.",
      tags: ["inspiration", "daily"],
      color: "from-pink-100 to-rose-100",
      isPinned: true,
      isFavorite: true,
      createdAt: "2024-12-30",
      updatedAt: "2024-12-30",
    },
    {
      id: "2",
      title: "Project Ideas",
      content:
        "Brainstorming session for the new creative project. Consider incorporating interactive elements and user feedback.",
      tags: ["work", "ideas"],
      color: "from-purple-100 to-indigo-100",
      isPinned: true,
      isFavorite: false,
      createdAt: "2024-12-29",
      updatedAt: "2024-12-30",
    },
    {
      id: "3",
      title: "Recipe Collection",
      content:
        "Healthy smoothie recipes to try this week. Spinach, banana, and almond butter combination was amazing!",
      tags: ["recipes", "health"],
      color: "from-teal-100 to-cyan-100",
      isPinned: false,
      isFavorite: true,
      createdAt: "2024-12-28",
      updatedAt: "2024-12-29",
    },
    {
      id: "4",
      title: "Book Notes",
      content:
        'Key takeaways from "Atomic Habits" - Small changes lead to remarkable results. Focus on systems, not goals.',
      tags: ["books", "learning"],
      color: "from-amber-100 to-orange-100",
      isPinned: false,
      isFavorite: false,
      createdAt: "2024-12-27",
      updatedAt: "2024-12-28",
    },
    {
      id: "5",
      title: "Travel Bucket List",
      content:
        "Places to visit: Santorini, Bali, Tokyo, Iceland. Research best times to visit and create detailed itineraries.",
      tags: ["travel", "goals"],
      color: "from-blue-100 to-indigo-100",
      isPinned: false,
      isFavorite: true,
      createdAt: "2024-12-26",
      updatedAt: "2024-12-27",
    },
    {
      id: "6",
      title: "Fitness Goals",
      content:
        "Weekly workout plan: Monday - Yoga, Wednesday - Cardio, Friday - Strength training. Stay consistent!",
      tags: ["fitness", "goals"],
      color: "from-green-100 to-emerald-100",
      isPinned: false,
      isFavorite: false,
      createdAt: "2024-12-25",
      updatedAt: "2024-12-26",
    },
  ]);

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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10" onClick={handleCloseMenu}>
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
              />
            )}

            <NotesSection
              title="All Notes"
              notes={regularNotes}
              viewMode={viewMode}
              openMenuId={openMenuId}
              handleMenuToggle={handleMenuToggle}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default NotesDashboard;
