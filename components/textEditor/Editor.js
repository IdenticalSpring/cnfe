import React, { useRef, useMemo } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Editor = ({ value, onChange, placeholder }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
      minHeight: 200,
      maxHeight: 400,
    }),
    [placeholder]
  );

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => onChange(newContent)}
      />
    </div>
  );
};

export default Editor;