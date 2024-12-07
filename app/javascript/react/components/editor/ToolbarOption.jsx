import React from 'react';

export const toolbarItems = [
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

export const markdownStyles = `
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

    /* タスクリストのスタイリング */
  .markdown-body ul li.task-list-item {
    list-style-type: none;  /* リストの・を非表示 */
    padding-left: 0;        /* 左のパディングをリセット */
    margin-left: 0;         /* 左のマージンをリセット */
  }
    
    /* チェックボックスのスタイリング */
  .markdown-body ul li.task-list-item input[type="checkbox"] {
    margin-right: 0.5em;    /* チェックボックスの右側の間隔 */
    appearance: none;       /* デフォルトのスタイルを削除 */
    width: 1rem;           /* 幅 */
    height: 1rem;          /* 高さ */
    border: 1px solid #6B7280;  /* ボーダー色 */
    border-radius: 0.25rem;     /* 角を丸く */
    background-color: #374151;  /* 背景色（明るいグレー） */
  }

  /* チェック時のスタイル */
  .markdown-body ul li.task-list-item input[type="checkbox"]:checked {
    background-color: #374151;  /* チェック時の背景色（暗いグレー） */
    border-color: #374151;      /* チェック時のボーダー色 */
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>');
    background-size: 75%;
    background-position: center;
    background-repeat: no-repeat;
  }
`;