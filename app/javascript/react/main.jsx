// app/javascript/react/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import MonacoModal from "./components/MonacoModal";
import MonacoEditor from "./components/MonacoEditor";
import TextBox from "./components/TextBox";

document.addEventListener("DOMContentLoaded", () => {
  const monacoModalRoot = document.getElementById("monacoModal");
  const monacoEditorRoot = document.getElementById("monacoEditor");
  const monacoInsertRoot = document.getElementById("monacoInsert");
  const textBoxRoot = document.getElementById("textBox");

  if (monacoModalRoot) {
    createRoot(monacoModalRoot).render(<MonacoModal />);
  }

  if (monacoEditorRoot) {
    createRoot(monacoEditorRoot).render(<MonacoEditor />);
  }

  if (monacoInsertRoot) {
    createRoot(monacoInsertRoot).render(<MonacoInsert />);
  }
  
  if (textBoxRoot) {
    createRoot(textBoxRoot).render(<TextBox />)
  }
});