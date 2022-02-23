import { useEffect, useState, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, highlightActiveLine } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { history, historyKeymap } from "@codemirror/history";
import { indentOnInput } from "@codemirror/language";
import { bracketMatching } from "@codemirror/matchbrackets";
import { lineNumbers, highlightActiveLineGutter } from "@codemirror/gutter";
import {
  defaultHighlightStyle,
  HighlightStyle,
  tags,
} from "@codemirror/highlight";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { oneDark } from "@codemirror/theme-one-dark";

const colors = {
  text: "#adbac7",
  bg: "#22272e",
  guttersBg: "#22272e",
  guttermarkerText: "#22272e",
  guttermarkerSubtleText: "#636e7b",
  linenumberText: "#768390",
  cursor: "#cdd9e5",
  selectionBg: "rgba(108,182,255,0.3)",
  activelineBg: "#2d333b",
  matchingbracketText: "#adbac7",
  linesBg: "#22272e",
  syntax: {
    comment: "#768390",
    constant: "#6cb6ff",
    entity: "#dcbdfb",
    keyword: "#f47067",
    storage: "#f47067",
    string: "#96d0ff",
    support: "#6cb6ff",
    variable: "#f69d50",
  },
};

export const transparentTheme = EditorView.theme({
  "&": {
    height: "100%",
    color: colors.text,
    backgroundColor: colors.bg,
    colorScheme: "dark",
    overflow: "auto",
    fontSize: "12px",
    "font-variant-numeric": "tabular-nums",
    fontFamily: `Consolas, "Courier New", monospace`,
  },
  ".cm-content": {
    paddingBlock: "10px",
    caretColor: colors.cursor,
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: colors.cursor,
  },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection":
    {
      backgroundColor: colors.selectionBg,
      borderRadius: "5px",
    },

  ".cm-searchMatch": {
    backgroundColor: "#72a1ff59",
    border: "1px solid #457dff",
    borderRadius: "3px",
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "#61ffcc2f",
    borderRadius: "3px",
  },

  ".cm-selectionMatch": {
    backgroundColor: "#1aabff36",
    borderRadius: "5px",
  },
  ".cm-activeLine": {
    backgroundColor: colors.activelineBg,
    borderRadius: "5px",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "transparent",
    color: "#E1E4E8",
  },

  ".cm-matchingBracket, .cm-nonmatchingBracket": {
    backgroundColor: "#25686C",
    borderRadius: "3px",
    color: colors.matchingbracketText,
  },

  ".cm-gutters": {
    backgroundColor: colors.guttersBg,
    color: colors.guttermarkerSubtleText,
    border: "none",
  },
  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: "#ddd",
  },
  ".cm-lineNumbers": {
    "min-width": "5ch",
  },
  ".cm-foldGutter .cm-gutterElement": {
    transition: "color 0.25s ease",
    fontFamily: "Material Icons",
    paddingInline: "5px",
  },

  ".cm-tooltip": {
    border: "1px solid #181a1f",
    backgroundColor: colors.activelineBg,
    padding: "5px",
    "border-radius": "5px",
    "box-shadow": "0px 0px 15px rgb(20 20 20 / 25%)",
  },
  ".cm-tooltip.cm-tooltip-autocomplete": {
    "& > ul > li": {
      "border-radius": "3px",
    },
    "& > ul > li[aria-selected]": {
      backgroundColor: colors.bg,
      color: colors.text,
    },
  },
});

const syntaxHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: "1.6em",
    fontWeight: "bold",
  },
  {
    tag: tags.heading2,
    fontSize: "1.4em",
    fontWeight: "bold",
  },
  {
    tag: tags.heading3,
    fontSize: "1.2em",
    fontWeight: "bold",
  },
]);

import type React from "react";

interface Props {
  initialDoc: string;
  onChange?: (state: EditorState) => void;
}

const useCodeMirror = <T extends Element>(
  props: Props
): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null);
  const [editorView, setEditorView] = useState<EditorView>();
  const { onChange } = props;

  useEffect(() => {
    if (!refContainer.current) return;

    const startState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap]),
        lineNumbers(),
        highlightActiveLineGutter(),
        history(),
        indentOnInput(),
        bracketMatching(),
        defaultHighlightStyle.fallback,
        highlightActiveLine(),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        oneDark,
        transparentTheme,
        syntaxHighlighting,
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    });
    setEditorView(view);
  }, [refContainer]);

  return [refContainer, editorView];
};

export default useCodeMirror;
