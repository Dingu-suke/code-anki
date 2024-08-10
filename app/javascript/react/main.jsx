// app/javascript/react/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import MonacoModal from "./components/Editor/MonacoModal";
import MarkdownView from "./components/EditorView/MarkdownView";

import RunCodeEditor from './components/RunCodeEditorDaisyUI/CodeEditor';
import TextBox from "./components/TextBox";
import Test from "./test/test";
import { Answer } from "./components/card/AnswerCard";
import QuestionCard from "./components/card/QuiestionCard";
import { CardList } from "./components/card/CardIndex";
import CardForm from './components/Form/CardForm';
import ParentComponent from "./components/PaarentComponent";
import App from "./components/Window/App";
import DeckFormContainer from "./components/deck/DeckIndex";
import { Drill } from './components/Drill/Drill';



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
  const markdownEditorRoot= document.getElementById("markdownEditor");
  const cardIndexRoot     = document.getElementById("cardIndex");
  const DraggableModalRoot= document.getElementById("draggableModal");
  const AppRoot           = document.getElementById("window");
  const DeckFormRoot      = document.getElementById("deck");
  const DeckShowRoot      = document.getElementById("deckShow");

  // -------------------------------------------------------------------------

  monacoModalRoot   && createRoot(monacoModalRoot)  .render(<MonacoModal />);
  monacoEditorRoot  && createRoot(monacoEditorRoot) .render(<MonacoEditor />);  
  monacoInsertRoot  && createRoot(monacoInsertRoot) .render(<MonacoInsert />);

  textBoxRoot       && createRoot(textBoxRoot)      .render(<TextBox />);

  quiestionCardRoot && createRoot(quiestionCardRoot).render(<QuestionCard />);
  answerCardRoot    && createRoot(answerCardRoot)   .render(<Answer />);
  cardFormRoot      && createRoot(cardFormRoot)     .render(<CardForm />);

  runCodeEditorRoot && createRoot(runCodeEditorRoot).render(<RunCodeEditor />);
  markdownViewRoot  && createRoot(markdownViewRoot) .render(<MarkdownView />);
  cardIndexRoot     && createRoot(cardIndexRoot)    .render(<CardList />)
  DraggableModalRoot&& createRoot(DraggableModalRoot).render(<ParentComponent />)
  DeckFormRoot      && createRoot(DeckFormRoot)     .render(<DeckFormContainer />)
  DeckShowRoot      && createRoot(DeckShowRoot)     .render(<Drill />)
  AppRoot && createRoot(AppRoot).render(<App />)
})