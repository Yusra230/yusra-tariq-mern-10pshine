// components/MainEditor.tsx
import React, { RefObject } from 'react';

interface MainEditorProps {
  editorRef: RefObject<HTMLDivElement>;
}

export const MainEditor: React.FC<MainEditorProps> = ({ editorRef }) => {
  return (
    <div className="p-6 sm:p-8 min-h-[500px]">
      <div
        ref={editorRef}
        contentEditable
        className="outline-none text-gray-800 text-lg leading-relaxed prose prose-pink max-w-none"
        style={{ minHeight: '400px' }}
        data-placeholder="Start writing your beautiful note..."
      />
    </div>
  );
};