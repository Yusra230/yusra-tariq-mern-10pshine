import React from 'react';
import { Pin, Heart, Clock, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { smartDate } from '../../utils/date';

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

interface NoteCardProps {
  note: Note;
  viewMode: 'grid' | 'list';
  isMenuOpen: boolean; 
  onMenuToggle: () => void
  handleDeleteNote: (noteId: string) => void
}


const NoteCard: React.FC<NoteCardProps> = ({ note,viewMode ,isMenuOpen, onMenuToggle,handleDeleteNote})=>{ 
const navigate = useNavigate();

const handleEditClick = (note: Note) => {
  navigate("/noteseditor", { state: { note } }); // pass the note object
};



  return (
    <div
      className={`group relative bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-xl hover:shadow-pink-200/50 hover:-translate-y-1 cursor-pointer ${
        viewMode === 'list' ? 'flex items-start' : ''
      }`}
    >
      {/* Color Strip */}
      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${note.color} rounded-t-2xl`}></div>

      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-pink-600 transition-colors">
              {note.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.content) }}
            />
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMenuToggle();
              }}
              className="p-2 rounded-lg hover:bg-pink-100 transition-colors opacity-0 group-hover:opacity-100"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {isMenuOpen && (
              <div 
                className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border-2 border-pink-100 py-2 min-w-[160px] z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => handleEditClick(note)} className="w-full px-4 py-2 text-left hover:bg-pink-50 flex items-center space-x-2 text-gray-700">
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-pink-50 flex items-center space-x-2 text-gray-700">
                  <Pin className="w-4 h-4" />
                  <span>Pin</span>
                </button>
                <button onClick={()=>{handleDeleteNote(note.id)}} className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center space-x-2 text-red-600">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 rounded-full text-xs font-semibold border border-pink-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-pink-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{smartDate(note.updatedAt)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {note.isPinned && (
              <div className="p-2 bg-pink-100 rounded-lg">
                <Pin className="w-4 h-4 text-pink-600" />
              </div>
            )}
            {note.isFavorite && (
              <div className="p-2 bg-rose-100 rounded-lg">
                <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;