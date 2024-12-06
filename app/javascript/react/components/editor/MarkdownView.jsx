import React from 'react';
import { markdownStyles } from './ToolbarOption.jsx';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark, // ダークテーマ
  oneLight // ライトテーマ
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';

export const MarkdownView = ({ bodyValue }) => {
  return (
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
  )
}