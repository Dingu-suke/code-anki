import React, { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  oneDark, // ダークテーマ
  oneLight // ライトテーマ
} from 'react-syntax-highlighter/dist/esm/styles/prism'

const toolbarItems = [
  {
    label: 'B',
    title: '太字',
    before: '**',
    after: '**',
    svg: (
      <svg viewBox="0 0 16 16" width="16" height="16" className="fill-current">
        <path d="M4 2h4.5a3.5 3.5 0 0 1 0 7H4V2Zm0 7h5.5a3.5 3.5 0 0 1 0 7H4V9Z"/>
      </svg>
    )
  },
  {
    label: 'I',
    title: 'イタリック',
    before: '_',
    after: '_',
    svg: (
      <svg viewBox="0 0 16 16" width="16" height="16" className="fill-current">
        <path d="M6 2.75A.75.75 0 0 1 6.75 2h6.5a.75.75 0 0 1 0 1.5h-2.505l-3.858 9H9.25a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.505l3.858-9H6.75A.75.75 0 0 1 6 2.75Z"/>
      </svg>
    )
  },
  {
    label: '```',
    title: 'コードブロック',
    before: '\n```\n',
    after: '\n```',
    svg: (
      <svg viewBox="0 0 16 16" width="16" height="16" className="fill-current">
        <path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L13.94 8 10.22 4.28a.75.75 0 0 1 1.06-1.06Z"/>
        <path d="M4.72 3.22a.75.75 0 0 1 0 1.06L1 8l3.72 3.72a.75.75 0 0 1-1.06 1.06L.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"/>
      </svg>
    )
  },
  {
    label: '•',
    title: 'リスト',
    before: '\n- ',
    after: '\n',
    svg: (
      <svg viewBox="0 0 16 16" width="16" height="16" className="fill-current">
        <path d="M2 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm3.75-1.5a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Zm0 5a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Zm0 5a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5ZM3 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/>
      </svg>
    )
  },
  {
    label: '1.',
    title: '番号付きリスト',
    before: '1. ',
    after: '\n',
    svg: (
      <svg viewBox="0 0 16 16" width="16" height="16" className="fill-current">
        <path d="M2.003 2.5a.5.5 0 0 0-.723-.447l-1.003.5a.5.5 0 0 0 .446.895l.28-.14V6H.5a.5.5 0 0 0 0 1h2.006a.5.5 0 1 0 0-1h-.503V2.5zM5 3.25a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 5 3.25zm0 5a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 5 8.25zm0 5a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75zM.924 10.32l.003-.004a.851.851 0 0 1 .144-.153A.66.66 0 0 1 1.5 10c.195 0 .306.068.374.146a.57.57 0 0 1 .128.376c0 .453-.269.682-.8 1.078l-.035.025C.692 11.98 0 12.495 0 13.5a.5.5 0 0 0 .5.5h2.003a.5.5 0 0 0 0-1H1.146c.132-.197.351-.372.654-.597l.047-.035c.47-.35 1.156-.858 1.156-1.845 0-.365-.118-.744-.377-1.038-.268-.303-.658-.484-1.126-.484-.48 0-.84.202-1.068.392a1.858 1.858 0 0 0-.348.384l-.007.011-.002.004-.001.002-.001.001a.5.5 0 0 0 .851.525zM.5 10.055l-.427-.26.427.26z"/>
      </svg>
    )
  },
  {
    label: '[x]',
    title: 'チェックリスト',
    before: '- [x] ',
    after: '',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <path d="M360-120q-100 0-170-70t-70-170v-240q0-100 70-170t170-70h240q100 0 170 70t70 170v240q0 100-70 170t-170 70H360Zm80-200 240-240-56-56-184 184-88-88-56 56 144 144Zm-80 120h240q66 0 113-47t47-113v-240q0-66-47-113t-113-47H360q-66 0-113 47t-47 113v240q0 66 47 113t113 47Zm120-280Z"/>
      </svg>
    )
  }
];

const markdownStyles = `
  /* リストマーカーの色 */
  .markdown-body ul li::marker {
    color: rgb(209 213 219); /* text-gray-300 相当 */
  }
  
  .markdown-body ol li::marker {
    color: rgb(209 213 219);
  }

  /* テーブルのスタイリング */
  .markdown-body table {
    border-collapse: collapse;
    width: 100%;
    margin: 1rem 0;
  }

  .markdown-body table th,
  .markdown-body table td {
    border: 1px solid rgb(75 85 99); /* gray-600 相当 */
    padding: 0.5rem;
  }

  .markdown-body table th {
    background-color: rgb(31 41 55); /* gray-800 相当 */
    color: rgb(209 213 219);
    font-weight: 600;
  }

  .markdown-body table td {
    color: rgb(209 213 219);
  }

  /* ネストされたリストのスタイリング */
  .markdown-body ul ul,
  .markdown-body ol ol,
  .markdown-body ul ol,
  .markdown-body ol ul {
    margin-left: 1.5rem;
  }

  /* チェックボックスのスタイリング */
  .markdown-body input[type="checkbox"] {
    margin-right: 0.5rem;
  }

  /* 水平線のスタイリング */
  .markdown-body hr {
    border-color: rgb(75 85 99);
    margin: 1rem 0;
  }

  /* ブロッククォートのスタイリング */
  .markdown-body blockquote {
    border-left: 4px solid rgb(75 85 99);
    padding-left: 1rem;
    margin: 1rem 0;
    color: rgb(209 213 219);
  }

  /* ベーススタイル（両方のリンクタイプに適用） */
  .markdown-body a {
    text-decoration: none;
  }

  .markdown-body a:hover {
    text-decoration: underline;
  }
`;

export const MarkdownEditor2 = React.forwardRef(({ register, watch, setValue, name, defaultValue }) => {
  // テスト用のマークダウンテキスト
  const [activeTab, setActiveTab] = useState('write');
  const textareaRef = useRef(null);
  const bodyValue = watch("body");

  // useForm の ref を分ける (競合回避)
  const { ref: registerRef, ...registerRest } = register("body", {
    required: "問題文が未入力です"
  });

  // 両方の ref を設定する関数
  const setRefs = (element) => {
    textareaRef.current = element;
    registerRef(element);
    // DOMから直接受け取ったものが仮引数elementに入る
  };

  const insertText = (before, after = '') => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = bodyValue || '';
    const selectedText = text.substring(start, end);
    
    setValue("body", 
      text.substring(0, start) +
      before +
      selectedText +
      after +
      text.substring(end),
      { shouldValidate: true }
    );

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length + selectedText.length + after.length,
        start + before.length + selectedText.length + after.length
      );
    }, 0);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange && onChange(newValue);
  };

  const handleBlur = (e) => {
    onBlur && onBlur(e);
  };

return (
  <div className="container mx-auto bg-slate-900 border-2 border-gray-600 rounded-2xl px-4 h-[595px]">
    <div className="text-cyan-500 pt-6 pl-5 text-xl font-bold pb-3">
      {name}
    </div>
    {/* タブ */}
    <div className="flex mb-4 border-b border border-b-slate-500 border-gray-800 overflow-x-scroll">
      <button
        type="button"
        className={`px-4 py-2 ${activeTab === 'write' ? 'border-b-2 border-sky-400' : ''} text-gray-400 hover:text-cyan-400`}
        onClick={() => setActiveTab('write')}
      >
        Write
      </button>
      <button
        type="button"
        className={`px-4 py-2 ${activeTab === 'preview' ? 'border-b-2 border-sky-400' : ''} text-gray-400 hover:text-cyan-400`}
        onClick={() => setActiveTab('preview')}
      >
        Preview
      </button>
      <div className="flex-grow" />
      {activeTab === 'write' &&
        (
          <div className="flex gap-1 bg-gray-800 justify-end">
          {toolbarItems.map((item, index) => (
            <button
              key={index}
              className="p-2 hover:bg-gray-700 rounded text-gray-200 hover:text-gray-200"
              onClick={() => insertText(item.before, item.after)}
              type="button"
              title={item.title}
            >
              {item.svg}
            </button>
            ))}
          </div>
        )}
    </div>

    {/* エディタ/プレビュー */}
    {activeTab === 'write' ? (
        <textarea
          name={name}
          value={bodyValue}
          onChange={(e) => setValue("body", e.target.value)}  // フィールド名を指定
          ref={setRefs}
          className="w-full h-[428px] p-4 rounded font-mono border-2 placeholder-slate-500 border-cyan-950 text-gray-300 bg-slate-900
          focus:border-cyan-950 focus:ring-cyan-950 focus:outline-none resize-none"
          placeholder="(マークダウンがサポートされています)"
          {...registerRest} 
        />
    ) : (
        <><style>{markdownStyles}</style>
        <div className="border-2 border-blue-950 rounded p-4 overflow-y-scroll h-[428px] text-gray-400">
          <ReactMarkdown
            className="markdown-body prose p-2 max-w-none text-gray-400"
            remarkPlugins={[remarkGfm]}
            components={{
              // 見出しのスタイリング
              h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-4 text-gray-300" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-bold my-3 text-gray-300" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl font-bold my-2 text-gray-300" {...props} />,
              // 段落の改行設定
              p: ({ node, ...props }) => <p className="my-2 whitespace-pre-line text-gray-300" {...props} />,
              strong: ({ node, ...props }) => (
                <strong className="font-bold text-gray-300" {...props} />
              ),
              ul: ({ node, ...props }) => <ul className="list-disc text-gray-300" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal text-gray-300" {...props} />,
              li: ({ node, ordered, ...props }) => <li className="text-gray-300" {...props} />,
              // イタリックのスタイリング
              em: ({ node, ...props }) => (
                <em className="italic text-gray-300" {...props} />
              ),
              a: ({node, href, children, ...props}) => {
                // テキストとURLが異なる場合はMarkdown記法とみなす
                const linkText = Array.isArray(children) ? children.join('') : children;
                const isMarkdownLink = href !== linkText;
            
                return (
                  <a
                    href={href}
                    className={`${isMarkdownLink ? 'text-orange-400' : 'text-blue-400'} no-underline hover:underline`}
                    {...props}
                    target="_blank"           // 新しいタブで開く
                    rel="noopener noreferrer" // セキュリティ対策
                  >
                    {children}
                  </a>
                );
              },
              // コードのスタイリング
              code({ node, inline, className, children, ...props }) {
                // 言語の判定
                const match = /language-(\w+)/.exec(className || '')
                const language = match ? match[1] : ''

                return !inline ? (
                  <div className="relative group">
                    {language && (
                      <div className="500 py-1 px-2 flex-grow">
                        <span className="text-sm font-mono border py-2 px-3 border-slate-700 border-bg-500 bg-slate-900 text-gray-300 font-bold rounded-md">
                          {`${language}`}
                        </span>
                      </div>
                    )}
                    <SyntaxHighlighter
                      style={oneDark} // (もしくは oneLightを指定)
                      language={language}
                      PreTag="div"
                      className="rounded-md bg-black"
                      showLineNumbers={true} // 行番号を表示
                      wrapLines={true} // 長い行を折り返す                
                      customStyle={{
                        background: '#000000', // コードブロックの背景の色
                      }}
                      lineProps={{
                        style: {
                          background: '#000000', // 一行ごとのbgの色とcustomStyleのbgを統一
                          borderLeft: '4px solid transparent'
                        }
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className="" {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {bodyValue}
          </ReactMarkdown>
        </div></>
    )}
  </div>
  );
})