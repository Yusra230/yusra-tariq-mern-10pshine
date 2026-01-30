// NoteEditor.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Clock, Sparkles, Tag as TagIcon } from 'lucide-react';
import { Header } from '../components/notesEditor/Header';
import { EditorToolbar } from '../components/notesEditor/EditorToolbar';
import { MainEditor } from '../components/notesEditor/MainEditor';
import { AnimatedBackground } from '../components/notesEditor/AnimatedBackground';
import { Tag } from '../components/notesEditor/Tag';
import { FooterStats } from '../components/notesEditor/FooterStats';
import { useNavigate } from 'react-router-dom';
import { addNotesToServer, updateNotesOnServer } from '../services/notesService';
import { useLocation } from "react-router-dom";

const NoteEditor: React.FC = () => {
  const location = useLocation();

  const editingNote = location.state?.note;

  const [title, setTitle] = useState(editingNote?.title || "");
  const [tags, setTags] = useState<string[]>(editingNote?.tags || []);
  const [currentTag, setCurrentTag] = useState('');
  const [isPinned, setIsPinned] = useState(editingNote?.isPinned || false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const navigate = useNavigate();

  const addTag = () => {
    if (!currentTag.trim()) return;
  
    setTags((prev) => [...prev, currentTag.trim()]);
    setCurrentTag("");
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };
  
  
  const textColors = [
    '#000000', '#ef4444', '#f97316', '#f59e0b', '#84cc16', 
    '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
  ];

  const bgColors = [
    'transparent', '#fef2f2', '#fff7ed', '#fefce8', '#f7fee7',
    '#ecfdf5', '#f0fdfa', '#eff6ff', '#f5f3ff', '#fdf4ff'
  ];

  // useEffect(() => {
  //   if (editorRef.current) {
  //     editorRef.current.focus();
  //   }
  // }, []);

  useEffect(() => {
    if (editingNote && editorRef.current) {
      editorRef.current.innerHTML = editingNote.content;
    }
  }, [editingNote]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };
  

  // const handleSave = async () => {
  //   if (!title.trim()) {
  //     alert("Title is required");
  //     return;
  //   }
  
  //   setIsSaving(true);
  
  //   try {
  //     const content = editorRef.current?.innerHTML || "";
      

  //     const savedNote = await addNotesToServer({
  //       title,
  //       content,
  //       tags,
  //       isPinned,
  //       isArchived: false,
  //       color: "#ffffff",
  //       format: "html", // because innerHTML
  //     });
  
  //     console.log("Saved note:", savedNote);
  //     alert("Note saved successfully ✨");
  
  //     // optional: reset editor after save
  //     setTitle("");
  //     editorRef.current!.innerHTML = "";
  //     setTags([]);
  
  //   } catch (error) {
  //     console.error("Error saving note:", error);
  //     alert("Failed to save note 😢");
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  // const handleUpdate = async () => {
  //   if (!title.trim()) {
  //     alert("Title is required");
  //     return;
  //   }
  
  //   if (!editingNoteId) return; // the note being edited
  
  //   setIsSaving(true);
  
  //   try {
  //     const content = editorRef.current?.innerHTML || "";
  
  //     const updatedNote = await updateNotesOnServer(editingNoteId, {
  //       title,
  //       content,
  //       tags,
  //       isPinned,
  //       isArchived,
  //       color: "#ffffff",
  //       format: "html",
  //     });
  
  //     console.log("Updated note:", updatedNote);
  
  //     // // Update UI
  //     // setNotes((prev) =>
  //     //   prev.map((note) =>
  //     //     note.id === editingNoteId ? updatedNote : note
  //     //   )
  //     // );
  
  //     alert("Note updated successfully ✨");
  
  //     // Reset editor
  //     setTitle("");
  //     editorRef.current!.innerHTML = "";
  //     setTags([]);
  //     setEditingNoteId(null);
  
  //   } catch (error) {
  //     console.error("Error updating note:", error);
  //     alert("Failed to update note 😢");
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const content = editorRef.current?.innerHTML || "";

      if (editingNote) {
        // Editing existing note
        await updateNotesOnServer(editingNote.id, {
          title,
          content,
          tags,
          isPinned,
          isArchived: false,
          color: "#ffffff",
          format: "html",
        });
        alert("Note updated successfully ✨");
      } else {
        // Creating new note
        await addNotesToServer({
                title,
                content,
                tags,
                isPinned,
                isArchived: false,
                color: "#ffffff",
                format: "html", // because innerHTML
              });
        alert("Note saved successfully ✨");
      }

      // Reset editor after save
      setTitle("");
      setTags([]);
      editorRef.current!.innerHTML = "";
      navigate('/dashboard');

    } catch (error) {
      console.error(error);
      alert("Failed to save note 😢");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to discard changes?')) {
      console.log('Cancelled, navigating back...');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 via-purple-50 to-indigo-100">
      <AnimatedBackground />
      
      <Header 
        onCancel={handleCancel}
        onSave={handleSave}
        isPinned={isPinned}
        setIsPinned={setIsPinned}
        isSaving={isSaving}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl relative z-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-pink-100 overflow-hidden">
          
          {/* Title & Tags Section */}
          <div className="p-6 sm:p-8 border-b-2 border-pink-100">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title..."
              className="w-full text-3xl sm:text-4xl font-bold text-gray-800 placeholder:text-gray-300 outline-none bg-transparent"
            />
            
            {/* Tags Input */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {tags.map((tag, index) => (
                <Tag key={index} tag={tag} onRemove={removeTag} />
              ))}
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add tag..."
                className="px-3 py-1.5 text-sm bg-transparent border-2 border-dashed border-pink-200 rounded-full outline-none focus:border-pink-400 placeholder:text-gray-400 min-w-[100px]"
              />
            </div>

            {/* Metadata */}
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span>Auto-saved</span>
              </div>
            </div>
          </div>

          {/* Editor Toolbar */}
          <EditorToolbar
            execCommand={execCommand}
            showColorPicker={showColorPicker}
            showBgColorPicker={showBgColorPicker}
            setShowColorPicker={setShowColorPicker}
            setShowBgColorPicker={setShowBgColorPicker}
            textColors={textColors}
            bgColors={bgColors}
          />

          {/* Editor Content */}
          <MainEditor editorRef={editorRef} />
        </div>

        <FooterStats />
      </main>

      <EditorStyles />
    </div>
  );
};

// Separate component for editor styles
const EditorStyles: React.FC = () => {
  return (
    <style>{`
      @keyframes blob {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }
      
      .animate-blob {
        animation: blob 7s infinite;
      }
      
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      
      .animation-delay-4000 {
        animation-delay: 4s;
      }

      [contenteditable]:empty:before {
        content: attr(data-placeholder);
        color: #d1d5db;
      }

      [contenteditable] {
        caret-color: #ec4899;
      }

      [contenteditable] blockquote {
        border-left: 4px solid #ec4899;
        padding-left: 1rem;
        color: #6b7280;
        font-style: italic;
        margin: 1rem 0;
      }

      [contenteditable] pre {
        background: #f9fafb;
        border: 2px solid #fce7f3;
        border-radius: 0.5rem;
        padding: 1rem;
        overflow-x: auto;
        font-family: 'Courier New', monospace;
        font-size: 0.875rem;
      }

      [contenteditable] a {
        color: #ec4899;
        text-decoration: underline;
      }

      [contenteditable] hr {
        border: none;
        border-top: 2px solid #fce7f3;
        margin: 1.5rem 0;
      }

      [contenteditable] ul,
      [contenteditable] ol {
        padding-left: 2rem;
        margin: 1rem 0;
      }

      [contenteditable] li {
        margin: 0.5rem 0;
      }
    `}</style>
  );
};

export default NoteEditor;