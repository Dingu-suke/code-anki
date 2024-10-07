import React from 'react'
import {createRoot} from 'react-dom/client'
import Markdown from 'react-markdown'

const markdown = '# Hi, *Pluto*!'

const MarkdownView = () => (
  <Markdown>{markdown}</Markdown>
)
export default MarkdownView;