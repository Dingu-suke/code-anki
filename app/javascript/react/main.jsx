// app/javascript/react/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import MonacoModal from "./components/editor/MonacoModal";
import MarkdownView from "./components/editorView/MarkdownView";

import { Answer } from "./components/card/AnswerCard";
import QuestionCard from "./components/card/QuiestionCard";
import { DeckInfo } from "./components/deck/DeckInfo";
import { YourDecksIndex } from "./components/deck/YourDecksIndex";
import { Drill } from './components/drill/Drill';
import CardForm from "./components/form/CardForm";
import ParentComponent from "./components/PaarentComponent";
import RunCodeEditor from './components/runCodeEditorDaisyUI/CodeEditor';
import TextBox from "./components/TextBox";
import App from "./components/window/App";
import { CardList } from "./components/card/CardIndex";
import { DrillIndex } from "./components/drill/DrillIndex";

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
  const CardIndexRoot     = document.getElementById("CardIndex");
  const DraggableModalRoot= document.getElementById("draggableModal");
  const AppRoot           = document.getElementById("window");
  const DeckShowRoot      = document.getElementById("deckShow");
  const DeckIndex         = document.getElementById("deckIndex");
  const YourDeckIndex     = document.getElementById("yourDeckIndex");
  const DeckCardsRoot     = document.getElementById("deckCards");
  const DeckFormRoot      = document.getElementById("deckForm");
  const DrillIndexRoot     = document.getElementById("drillIndex");
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
  CardIndexRoot     && createRoot(CardIndexRoot    ).render(<CardList />)
  DrillIndexRoot     && createRoot(DrillIndexRoot)    .render(<DrillIndex />)
  DraggableModalRoot&& createRoot(DraggableModalRoot).render(<ParentComponent />)
  YourDeckIndex     && createRoot(YourDeckIndex)    .render(<YourDecksIndex />)   
  DeckShowRoot      && createRoot(DeckShowRoot)     .render(<Drill />)
  DeckFormRoot      && createRoot(DeckFormRoot)     .render(<DeckInfo />)
  
  AppRoot && createRoot(AppRoot).render(<App />)  
})