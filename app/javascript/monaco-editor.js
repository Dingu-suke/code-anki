import * as monaco from 'monaco-editor';

// monaco editor のインスタンスを作成するための関数
function createEditor() {
    const editorElement = document.getElementById('editor');
    if (editorElement) {
        monaco.editor.create(editorElement, {
            value: "puts 'Hello, Ruby!'",
            language: 'ruby'
        });
    }
}

document.addEventListener('DOMContentLoaded', createEditor);