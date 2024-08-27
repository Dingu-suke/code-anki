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
import { Drill } from './components/Drill/Drill';
import { YourDeckList } from "./components/Deck/YourDecksIndex";
import { DeckForm } from "./components/Deck/DeckForm";
// import DeckFormContainer from '../../../docker compose up/app/javascript/react/components/deck/DeckIndex';



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
  const DeckShowRoot      = document.getElementById("deckShow");
  const DeckIndex         = document.getElementById("deckIndex");
  const YourDeckIndex     = document.getElementById("yourDeckIndex");
  const DeckCardsRoot     = document.getElementById("deckCards");
  const DeckFormRoot      = document.getElementById("deckForm");
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
  YourDeckIndex     && createRoot(YourDeckIndex)    .render(<YourDeckList />)
  DeckShowRoot      && createRoot(DeckShowRoot)     .render(<Drill />)
  DeckFormRoot      && createRoot(DeckFormRoot)     .render(<DeckForm />)
  
  AppRoot && createRoot(AppRoot).render(<App />)
})