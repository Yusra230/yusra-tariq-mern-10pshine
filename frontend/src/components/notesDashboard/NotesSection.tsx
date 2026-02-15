import React from 'react';
import { Pin, TrendingUp } from 'lucide-react';
import NoteCard from './NoteCard';

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

interface NotesSectionProps {
  title: string;
  notes: Note[];
  viewMode: 'grid' | 'list';
  icon?: React.ReactNode;
  openMenuId : string | null;
  handleMenuToggle : (noteId: string) => void;
  handleDeleteNote : (noteId: string) => void
}

const NotesSection: React.FC<NotesSectionProps> = ({ title, notes, viewMode, icon, openMenuId, handleMenuToggle,handleDeleteNote}) => {
  if (notes.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center space-x-2 mb-4">
        {icon || <TrendingUp className="w-5 h-5 text-purple-500" />}
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      <div className={`grid gap-6 ${
        viewMode === 'grid'
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1' 
      }`}>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} viewMode={viewMode} isMenuOpen={openMenuId === note.id}
          onMenuToggle={() => handleMenuToggle(note.id)} handleDeleteNote={handleDeleteNote}/>
        ))}
      </div>
    </div>
  );
};

export default NotesSection;