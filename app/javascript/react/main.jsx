// app/javascript/react/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import MonacoModal from "./components/Editor/MonacoModal";
import MonacoEditor from "./components/Editor/MonacoEditor";
import TextBox from "./components/TextBox";
import QuestionCard from "./components/card/QuiestionCard";
import AnswerCard from "./components/card/AnserCard";
import CardForm from "./components/form/CardForm";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "./js/theme";
import CodeEditor from './components/runCodeDaisyUI/CodeEditor';

document.addEventListener("DOMContentLoaded", () => {
  const monacoModalRoot   = document.getElementById("monacoModal");
  const monacoEditorRoot  = document.getElementById("monacoEditor");  
  const monacoInsertRoot  = document.getElementById("monacoInsert");

  const textBoxRoot       = document.getElementById("textBox");

  const quiestionCardRoot = document.getElementById("questionCard");
  const answerCardRoot    = document.getElementById("answerCard");
  const cardFormRoot      = document.getElementById("cardForm");
  
  const runCodeEditorRoot = document.getElementById("runCodeEditor");

  // -------------------------------------------------------------------------

  monacoModalRoot   && createRoot(monacoModalRoot)  .render(<MonacoModal />);
  monacoEditorRoot  && createRoot(monacoEditorRoot) .render(<MonacoEditor />);  
  monacoInsertRoot  && createRoot(monacoInsertRoot) .render(<MonacoInsert />);

  textBoxRoot       && createRoot(textBoxRoot)      .render(<TextBox />);

  quiestionCardRoot && createRoot(quiestionCardRoot).render(<QuestionCard />);
  answerCardRoot    && createRoot(answerCardRoot)   .render(<AnswerCard />);
  cardFormRoot      && createRoot(cardFormRoot)     .render(<CardForm />);

  runCodeEditorRoot && createRoot(runCodeEditorRoot).render(<CodeEditor />);
})