import React, { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  oneDark, // ダークテーマ
  oneLight // ライトテーマ
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { toolbarItems, markdownStyles } from './ToolbarOption.jsx';

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
              input: ({node, type, checked, ...props}) => {
                if (type === 'checkbox') {
                  return (
                    <input
                      type="checkbox"
                      checked={checked}
                      {...props}
                    />
                  );
                }
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
                      wrapLines={true}      // 長い行を折り返す
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