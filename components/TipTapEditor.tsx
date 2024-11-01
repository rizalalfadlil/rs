import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "./ui/button";
import { Bold, Italic, Strikethrough } from "lucide-react";
const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={
            editor.isActive("paragraph") ? "default" : "outline"
          }
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          P
        </Button>
        <Button
          variant={
            editor.isActive("bold") ? "default" : "outline"
          }
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold/>
        </Button>
        <Button
          variant={
            editor.isActive("italic") ? "default" : "outline"
          }
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic/>
        </Button>
        <Button
          variant={
            editor.isActive("strike") ? "default" : "outline"
          }
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough/>
        </Button>
      </div>
    </div>
  );
};

const TiptapEditor = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: any;
  placeholder: string;
}) => {
  // Inisialisasi editor dengan konten awal dan konfigurasi placeholder
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "", // Mengatur konten awal
    onUpdate: ({ editor }) => {
      // Menghandle perubahan teks
      onChange && onChange(editor.getHTML());
    },
  });

  // Sinkronisasi editor jika `value` berubah
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="space-y-4 border p-4 rounded-md divide-y">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        placeholder={placeholder}
        className=""
      />
    </div>
  );
};

export default TiptapEditor;
