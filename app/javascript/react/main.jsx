// app/javascript/react/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import MonacoModal from "./components/Editor/MonacoModal";
import MonacoEditor from "./components/Editor/MonacoEditor";
import TextBox from "./components/TextBox";
import QuestionCard from "./components/card/QuiestionCard";
import AnswerCard from "./components/card/AnserCard";
import CardForm from "./components/Form/CardForm";
import RunCodeEditor from './components/RunCodeEditorDaisyUI/CodeEditor';
import MarkdownView from "./components/EditorView/MarkdownView";
import MarkdownEditor from "./components/Editor/MarkddownEditor";


document.addEventListener("DOMContentLoaded", () => {
  const monacoModalRoot   = document.getElementById("monacoModal");
  const monacoEditorRoot  = document.getElementById("monacoEditor");  
  const monacoInsertRoot  = document.getElementById("monacoInsert");

  const textBoxRoot       = document.getElementById("textBox");

  const quiestionCardRoot = document.getElementById("questionCard");
  const answerCardRoot    = document.getElementById("answerCard");
  const cardFormRoot      = document.getElementById("cardForm");
  
  const runCodeEditorRoot = document.getElementById("runCodeEditor");
  const markdownViewRoot  = document.getElementById("markdownView");
  const markdownEditorRoot= document.getElemecntById("markdownEditor");

  // -------------------------------------------------------------------------

  monacoModalRoot   && createRoot(monacoModalRoot)  .render(<MonacoModal />);
  monacoEditorRoot  && createRoot(monacoEditorRoot) .render(<MonacoEditor />);  
  monacoInsertRoot  && createRoot(monacoInsertRoot) .render(<MonacoInsert />);

  textBoxRoot       && createRoot(textBoxRoot)      .render(<TextBox />);

  quiestionCardRoot && createRoot(quiestionCardRoot).render(<QuestionCard />);
  answerCardRoot    && createRoot(answerCardRoot)   .render(<AnswerCard />);
  cardFormRoot      && createRoot(cardFormRoot)     .render(<CardForm />);

  runCodeEditorRoot && createRoot(runCodeEditorRoot) .render(<RunCodeEditor />);
  markdownViewRoot  && createRoot(markdownViewRoot)  .render(<MarkdownView />);
  markdownEditorRoot&& createRoot(markdownEditorRoot).render(<MarkdownEditor />);

})