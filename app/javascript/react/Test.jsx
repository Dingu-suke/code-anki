import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown.css'

const Test = () => {
  // テスト用のマークダウンテキスト
  const [isPreview, setIsPreview] = useState(false);
  const [markdown, setMarkdown] = useState(`# Hello World

~~Strikethrough text~~

- [x] Task 1
- [ ] Task 2

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |

\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`

# Hello World

~~Strikethrough text~~

- [x] Task 1
- [ ] Task 2

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |

\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`


`);

return (
  <div className="container mx-auto p-4">
    {/* タブ */}
    <div className="flex mb-4 border-b">
      <button
        className={`px-4 py-2 ${!isPreview ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => setIsPreview(false)}
      >
        Write
      </button>
      <button
        className={`px-4 py-2 ${isPreview ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => setIsPreview(true)}
      >
        Preview
      </button>
    </div>

    {/* エディタ/プレビュー */}
    {!isPreview ? (
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="w-full h-[700px] p-4 rounded font-mono border border-green-500"
          placeholder="マークダウンを入力..."
        />
    ) : (
      <div className="border border-green-500 rounded p-4 overflow-y-scroll max-h-[700px]">
        <ReactMarkdown 
          className="markdown-body prose p-4 max-w-none"
          remarkPlugins={[remarkGfm]}
          components={{
            // 見出しのスタイリング
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-3" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-bold my-2" {...props} />,
            // 段落の改行設定
            p: ({node, ...props}) => <p className="my-2 whitespace-pre-line" {...props} />
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    )}
  </div>
  );
}

export default Test