// components/EditorToolbar.tsx
import React from 'react';
import { 
  Bold, Italic, Underline, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, Link, 
  Quote, Code, Minus, Type, Highlighter,
  Undo, Redo
} from 'lucide-react';
import { ToolbarButton } from './ToolbarButton';
import { ColorPicker } from './ColorPicker';

interface EditorToolbarProps {
  execCommand: (command: string, value?: string) => void;
  showColorPicker: boolean;
  showBgColorPicker: boolean;
  setShowColorPicker: (show: boolean) => void;
  setShowBgColorPicker: (show: boolean) => void;
  textColors: string[];
  bgColors: string[];
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  execCommand,
  showColorPicker,
  showBgColorPicker,
  setShowColorPicker,
  setShowBgColorPicker,
  textColors,
  bgColors
}) => {
  const toolbarSections = [
    {
      name: 'formatting',
      buttons: [
        { icon: <Bold className="w-4 h-4" />, command: 'bold', title: 'Bold' },
        { icon: <Italic className="w-4 h-4" />, command: 'italic', title: 'Italic' },
        { icon: <Underline className="w-4 h-4" />, command: 'underline', title: 'Underline' },
      ]
    },
    {
      name: 'alignment',
      buttons: [
        { icon: <AlignLeft className="w-4 h-4" />, command: 'justifyLeft', title: 'Align Left' },
        { icon: <AlignCenter className="w-4 h-4" />, command: 'justifyCenter', title: 'Align Center' },
        { icon: <AlignRight className="w-4 h-4" />, command: 'justifyRight', title: 'Align Right' },
      ]
    },
    {
      name: 'lists',
      buttons: [
        { icon: <List className="w-4 h-4" />, command: 'insertUnorderedList', title: 'Bullet List' },
        { icon: <ListOrdered className="w-4 h-4" />, command: 'insertOrderedList', title: 'Numbered List' },
      ]
    },
    {
      name: 'elements',
      buttons: [
        { 
          icon: <Link className="w-4 h-4" />, 
          onClick: () => {
            const url = prompt('Enter URL:');
            if (url) execCommand('createLink', url);
          }, 
          title: 'Insert Link' 
        },
        { icon: <Quote className="w-4 h-4" />, command: 'formatBlock', value: 'blockquote', title: 'Quote' },
        { icon: <Code className="w-4 h-4" />, command: 'formatBlock', value: 'pre', title: 'Code Block' },
        { icon: <Minus className="w-4 h-4" />, command: 'insertHorizontalRule', title: 'Divider' },
      ]
    },
    {
      name: 'history',
      buttons: [
        { icon: <Undo className="w-4 h-4" />, command: 'undo', title: 'Undo' },
        { icon: <Redo className="w-4 h-4" />, command: 'redo', title: 'Redo' },
      ]
    }
  ];

  return (
    <div className="sticky top-[73px] bg-gradient-to-r from-pink-50 to-purple-50 border-b-2 border-pink-100 p-3 overflow-x-auto">
      <div className="flex items-center space-x-1 min-w-max">
        {/* Text Formatting */}
        <div className="flex items-center space-x-1 pr-3 border-r-2 border-pink-200">
          {toolbarSections[0].buttons.map((btn, index) => (
            <ToolbarButton
              key={index}
              icon={btn.icon}
              onClick={() => execCommand(btn.command!)}
              title={btn.title}
            />
          ))}
        </div>

        {/* Text Color & Background Color */}
        <div className="flex items-center space-x-1 pr-3 border-r-2 border-pink-200 relative">
          <ToolbarButton
            icon={<Type className="w-4 h-4" />}
            onClick={() => {
              setShowColorPicker(!showColorPicker);
              setShowBgColorPicker(false);
            }}
            title="Text Color"
            isActive={showColorPicker}
          />
          {showColorPicker && (
            <ColorPicker
              colors={textColors}
              onSelect={(color) => {
                execCommand('foreColor', color);
                setShowColorPicker(false);
              }}
              title="Text Color"
            />
          )}

          <ToolbarButton
            icon={<Highlighter className="w-4 h-4" />}
            onClick={() => {
              setShowBgColorPicker(!showBgColorPicker);
              setShowColorPicker(false);
            }}
            title="Background Color"
            isActive={showBgColorPicker}
          />
          {showBgColorPicker && (
            <ColorPicker
              colors={bgColors}
              onSelect={(color) => {
                execCommand('backColor', color);
                setShowBgColorPicker(false);
              }}
              title="Background Color"
            />
          )}
        </div>

        {/* Alignment */}
        <div className="flex items-center space-x-1 pr-3 border-r-2 border-pink-200">
          {toolbarSections[1].buttons.map((btn, index) => (
            <ToolbarButton
              key={index}
              icon={btn.icon}
              onClick={() => execCommand(btn.command!)}
              title={btn.title}
            />
          ))}
        </div>

        {/* Lists */}
        <div className="flex items-center space-x-1 pr-3 border-r-2 border-pink-200">
          {toolbarSections[2].buttons.map((btn, index) => (
            <ToolbarButton
              key={index}
              icon={btn.icon}
              onClick={() => execCommand(btn.command!)}
              title={btn.title}
            />
          ))}
        </div>

        {/* Insert Elements */}
        <div className="flex items-center space-x-1 pr-3 border-r-2 border-pink-200">
          {toolbarSections[3].buttons.map((btn, index) => (
            <ToolbarButton
              key={index}
              icon={btn.icon}
              onClick={btn.onClick || (() => execCommand(btn.command!, btn.value))}
              title={btn.title}
            />
          ))}
        </div>

        {/* History */}
        <div className="flex items-center space-x-1">
          {toolbarSections[4].buttons.map((btn, index) => (
            <ToolbarButton
              key={index}
              icon={btn.icon}
              onClick={() => execCommand(btn.command!)}
              title={btn.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};