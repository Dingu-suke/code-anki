import { useContext } from "react";
import { EditorContext } from "./EditorContext";

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('EdiotrProvider で使用してください')
  }
  return context;
}