import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({ onChange, initialValue = "" }) => {
  const editor = useRef(null);
  const [content, setContent] = useState(initialValue);

  const config = {
    readonly: false, // Set true for read-only mode
    height: 400,
    toolbarAdaptive: false,
    uploader: { insertImageAsBase64URI: false },
    // buttons:
    //   "source, bold, italic, underline, strikethrough, superscript, subscript, eraser, ul, ol, outdent, indent, font, fontsize, brush, paragraph, align, undo, redo, hr, link, image, video, table, symbol, fullsize, print, preview, selectall, cut, copy, paste",
    buttons:
      "source, bold, italic, underline, strikethrough, superscript, subscript, eraser, image, video, table",
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => {
          setContent(newContent);
          if (onChange) onChange(newContent);
        }}
      />
    </div>
  );
};

export default RichTextEditor;
