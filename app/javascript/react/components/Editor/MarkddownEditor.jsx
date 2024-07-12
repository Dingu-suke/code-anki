import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState("Initial value");

  const onChange = (value) => {
    setMarkdownValue(value);
  };

  return (
  <div className="">
    <SimpleMDE value={markdownValue} onChange={onChange} />
  </div>
)}
export default MarkdownEditor;