import React, { useCallback, useEffect, useState } from "react";
import useCodeMirror from "../useCodeMirror";

interface Props {
  initialDoc: string;
  onChange: (doc: string) => void;
}

export const TextEditor: React.FC<Props> = (props) => {
  const { onChange, initialDoc } = props;

  const handleChange = useCallback(
    (state) => onChange(state.doc.toString()),
    [onChange]
  );

  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleChange,
  });

  return (
    <div className="col-span-6 h-full overflow-y-auto" ref={refContainer}></div>
  );
};
