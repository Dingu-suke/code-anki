document.addEventListener("DOMContentLoaded", function() {
  require.config({
    paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.48.0/min/vs' }
  });
  require(['vs/editor/editor.main'], function() {
    monaco.editor.create(document.getElementById('editor'), {
      value: 'function x() {\nconsole.log("Hello world!");\n}',
      language: 'javascript'
    });
  });
});