import React from 'react';

export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  ruby: "3.0.1",
  php: "8.2.3",
  go: "1.16.2",
  java: "15.0.2",
  csharp: "6.12.0",
}

export const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Javascript");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "TypeScript" });\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Python")\n`,
  csharp:'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'PHP';\necho $name;\n",
};

export const LANGUAGE_LABELS = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  ruby: "Ruby",
  php: "PHP",
  go: "Go",
  java: "Java",
  csharp: "C#"
}

export const CATEGORY = {
  methodLearning: "メソッド学習",
  algorithm: "アルゴリズム",
  refactoring: "リファクタリング",
  tradeOff: "トレードオフ"
}

export const LANGUAGE_LOGO = {
  javascript: <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="24px" height="24px"><path fill="#ffd600" d="M6,42V6h36v36H6z"/><path fill="#000001" d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"/></svg>,
  typescript: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px"><rect width="36" height="36" x="6" y="6" fill="#1976d2"/><polygon fill="#fff" points="27.49,22 14.227,22 14.227,25.264 18.984,25.264 18.984,40 22.753,40 22.753,25.264 27.49,25.264"/><path fill="#fff" d="M39.194,26.084c0,0-1.787-1.192-3.807-1.192s-2.747,0.96-2.747,1.986 c0,2.648,7.381,2.383,7.381,7.712c0,8.209-11.254,4.568-11.254,4.568V35.22c0,0,2.152,1.622,4.733,1.622s2.483-1.688,2.483-1.92 c0-2.449-7.315-2.449-7.315-7.878c0-7.381,10.658-4.469,10.658-4.469L39.194,26.084z"/></svg>,
  python: <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="24px" height="24px"><linearGradient id="goqfu1ZNmEnUrQDJEQ1bUa" x1="10.458" x2="26.314" y1="12.972" y2="26.277" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#26abe7"/><stop offset="1" stop-color="#086dbf"/></linearGradient><path fill="url(#goqfu1ZNmEnUrQDJEQ1bUa)" d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2 H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104 c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672 C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498 c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"/><linearGradient id="goqfu1ZNmEnUrQDJEQ1bUb" x1="35.334" x2="23.517" y1="37.911" y2="21.034" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#feb705"/><stop offset="1" stop-color="#ffda1c"/></linearGradient><path fill="url(#goqfu1ZNmEnUrQDJEQ1bUb)" d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2 h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104 c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672 C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498 c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"/></svg>,
  java: <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="24px" height="24px"><path fill="#d43a02" d="M23.65,24.898c-0.998-1.609-1.722-2.943-2.725-5.455C19.229,15.2,31.24,11.366,26.37,3.999	c2.111,5.089-7.577,8.235-8.477,12.473C17.07,20.37,23.645,24.898,23.65,24.898z"/><path fill="#d43a02" d="M23.878,17.27c-0.192,2.516,2.229,3.857,2.299,5.695c0.056,1.496-1.447,2.743-1.447,2.743	s2.728-0.536,3.579-2.818c0.945-2.534-1.834-4.269-1.548-6.298c0.267-1.938,6.031-5.543,6.031-5.543S24.311,11.611,23.878,17.27z"/><linearGradient id="P9ujQJgz7XN9Qbny9S64Ha" x1="22.677" x2="30.737" y1="21.174" y2="43.318" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5c65d6"/><stop offset=".999" stop-color="#464eb0"/></linearGradient><path fill="url(#P9ujQJgz7XN9Qbny9S64Ha)" d="M32.084,25.055c1.754-0.394,3.233,0.723,3.233,2.01c0,2.901-4.021,5.643-4.021,5.643 s6.225-0.742,6.225-5.505C37.521,24.053,34.464,23.266,32.084,25.055z M29.129,27.395c0,0,1.941-1.383,2.458-1.902 c-4.763,1.011-15.638,1.147-15.638,0.269c0-0.809,3.507-1.638,3.507-1.638s-7.773-0.112-7.773,2.181 C11.683,28.695,21.858,28.866,29.129,27.395z"/><linearGradient id="P9ujQJgz7XN9Qbny9S64Hb" x1="19.498" x2="27.296" y1="22.77" y2="44.196" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5c65d6"/><stop offset=".999" stop-color="#464eb0"/></linearGradient><path fill="url(#P9ujQJgz7XN9Qbny9S64Hb)" d="M27.935,29.571 c-4.509,1.499-12.814,1.02-10.354-0.993c-1.198,0-2.974,0.963-2.974,1.889c0,1.857,8.982,3.291,15.63,0.572L27.935,29.571z"/><linearGradient id="P9ujQJgz7XN9Qbny9S64Hc" x1="18.698" x2="26.59" y1="23.455" y2="45.14" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5c65d6"/><stop offset=".999" stop-color="#464eb0"/></linearGradient><path fill="url(#P9ujQJgz7XN9Qbny9S64Hc)" d="M18.686,32.739 c-1.636,0-2.695,1.054-2.695,1.822c0,2.391,9.76,2.632,13.627,0.205l-2.458-1.632C24.271,34.404,17.014,34.579,18.686,32.739z"/><linearGradient id="P9ujQJgz7XN9Qbny9S64Hd" x1="18.03" x2="25.861" y1="24.198" y2="45.712" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5c65d6"/><stop offset=".999" stop-color="#464eb0"/></linearGradient><path fill="url(#P9ujQJgz7XN9Qbny9S64Hd)" d="M36.281,36.632 c0-0.936-1.055-1.377-1.433-1.588c2.228,5.373-22.317,4.956-22.317,1.784c0-0.721,1.807-1.427,3.477-1.093l-1.42-0.839 C11.26,34.374,9,35.837,9,37.017C9,42.52,36.281,42.255,36.281,36.632z"/><linearGradient id="P9ujQJgz7XN9Qbny9S64He" x1="20.725" x2="28.228" y1="24.582" y2="45.197" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5c65d6"/><stop offset=".999" stop-color="#464eb0"/></linearGradient><path fill="url(#P9ujQJgz7XN9Qbny9S64He)" d="M39,38.604 c-4.146,4.095-14.659,5.587-25.231,3.057C24.341,46.164,38.95,43.628,39,38.604z"/></svg>,
  csharp: <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="24px" height="24px"><path fill="#00c853" d="M22.903,3.286c0.679-0.381,1.515-0.381,2.193,0c3.355,1.883,13.451,7.551,16.807,9.434 C42.582,13.1,43,13.804,43,14.566c0,3.766,0,15.101,0,18.867c0,0.762-0.418,1.466-1.097,1.847 c-3.355,1.883-13.451,7.551-16.807,9.434c-0.679,0.381-1.515,0.381-2.193,0c-3.355-1.883-13.451-7.551-16.807-9.434 C5.418,34.899,5,34.196,5,33.434c0-3.766,0-15.101,0-18.867c0-0.762,0.418-1.466,1.097-1.847 C9.451,10.837,19.549,5.169,22.903,3.286z"/><path fill="#69f0ae" d="M5.304,34.404C5.038,34.048,5,33.71,5,33.255c0-3.744,0-15.014,0-18.759 c0-0.758,0.417-1.458,1.094-1.836c3.343-1.872,13.405-7.507,16.748-9.38c0.677-0.379,1.594-0.371,2.271,0.008 c3.343,1.872,13.371,7.459,16.714,9.331c0.27,0.152,0.476,0.335,0.66,0.576L5.304,34.404z"/><path fill="#fff" d="M24,10c-7.73,0-14,6.27-14,14s6.27,14,14,14s14-6.27,14-14S31.73,10,24,10z M24,31 c-3.86,0-7-3.14-7-7s3.14-7,7-7s7,3.14,7,7S27.86,31,24,31z"/><path fill="#00e676" d="M42.485,13.205c0.516,0.483,0.506,1.211,0.506,1.784c0,3.795-0.032,14.589,0.009,18.384 c0.004,0.396-0.127,0.813-0.323,1.127L23.593,24L42.485,13.205z"/><path fill="#fff" d="M34 20H35V28H34zM37 20H38V28H37z"/><path fill="#fff" d="M32 25H40V26H32zM32 22H40V23H32z"/></svg>,
  php: <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64" width="24px" height="24px"><path fill="#b5c4e0" d="M32 14A31 18.174 0 1 0 32 50.348A31 18.174 0 1 0 32 14Z"/><path fill="#ced9ed" d="M32,14C14.879,14,1,22.137,1,32.174s13.879,18.174,31,18.174s31-8.137,31-18.174S49.121,14,32,14z M32,45.348c-15.322,0-26-6.942-26-13.174C6,25.943,16.678,19,32,19s26,6.943,26,13.174C58,38.405,47.322,45.348,32,45.348z"/><path fill="#8d6c9e" d="M42.435 26.435l-2.733 14.826h3.566l.71-4.043h2.219c4.645 0 7.172-1.076 8.117-5.062.813-3.425-1.264-5.72-4.69-5.72H42.435zM46.786 34.522h-2.305l1.018-5.391h2.778c2.302 0 2.786 1.038 2.666 2.193C50.634 34.297 48.78 34.522 46.786 34.522zM14.13 26.435l-2.733 14.826h3.566l.71-4.043h2.219c4.645 0 7.172-1.076 8.117-5.062.813-3.425-1.264-5.72-4.69-5.72H14.13zM18.481 34.522h-2.305l1.018-5.391h2.778c2.302 0 2.786 1.038 2.666 2.193C22.329 34.297 20.476 34.522 18.481 34.522zM39.311 27.415c-.762-.698-2.104-.98-4.105-.98h-3.153l1.124-5.391H29.64l-3.379 16.174h3.538l1.706-8.087h2.828c.902 0 1.497.151 1.775.449.276.301.337.867.177 1.686l-1.291 5.952h3.593l1.399-6.44C40.286 29.234 40.059 28.102 39.311 27.415z"/><path fill="#8d6c9f" d="M32 51.348c-17.645 0-32-8.602-32-19.174S14.355 13 32 13c17.645 0 32 8.602 32 19.174S49.645 51.348 32 51.348zM32 15C15.458 15 2 22.704 2 32.174s13.458 17.174 30 17.174 30-7.704 30-17.174S48.542 15 32 15zM58.693 50.667c-.33 0-.653-.163-.845-.463l-1.074-1.687c-.297-.466-.159-1.084.307-1.381.464-.296 1.083-.16 1.381.307l1.074 1.687c.297.466.159 1.084-.307 1.381C59.063 50.616 58.877 50.667 58.693 50.667zM54.446 53.004c-.375 0-.734-.212-.905-.573l-.854-1.809c-.235-.499-.021-1.096.478-1.331.501-.237 1.095-.021 1.331.478l.854 1.809c.235.499.021 1.096-.478 1.331C54.734 52.974 54.589 53.004 54.446 53.004zM49.969 54.817c-.414 0-.802-.26-.945-.673l-.654-1.891c-.181-.522.097-1.092.618-1.272s1.091.097 1.272.618l.654 1.891c.181.522-.097 1.092-.618 1.272C50.188 54.8 50.077 54.817 49.969 54.817zM45.344 56.171c-.451 0-.86-.308-.971-.766l-.47-1.944c-.13-.536.2-1.077.737-1.206.529-.131 1.076.2 1.206.737l.47 1.944c.13.536-.2 1.077-.737 1.206C45.501 56.162 45.422 56.171 45.344 56.171zM40.621 57.093c-.487 0-.914-.356-.988-.853l-.296-1.979c-.081-.546.295-1.055.842-1.137.552-.074 1.056.296 1.137.842l.296 1.979c.081.546-.295 1.055-.842 1.137C40.72 57.089 40.67 57.093 40.621 57.093zM35.841 57.596c-.522 0-.963-.406-.997-.936l-.129-1.996c-.035-.551.383-1.026.934-1.063.544-.027 1.027.383 1.063.934l.129 1.996c.035.551-.383 1.026-.934 1.063C35.885 57.595 35.862 57.596 35.841 57.596z"/><g><path fill="#8d6c9f" d="M21.862,21.161c-0.448,0-0.856-0.304-0.97-0.759c-0.133-0.536,0.194-1.079,0.729-1.212 c1.345-0.334,2.766-0.618,4.224-0.845c0.547-0.084,1.057,0.289,1.142,0.834c0.085,0.546-0.289,1.057-0.834,1.142 c-1.4,0.218-2.762,0.49-4.049,0.81C22.023,21.152,21.942,21.161,21.862,21.161z"/></g><g><path fill="#8d6c9f" d="M6.999,29.997c-0.163,0-0.328-0.04-0.481-0.124c-0.481-0.266-0.659-0.869-0.396-1.352 c0.109-0.2,2.767-4.925,11.424-8.091c0.516-0.191,1.092,0.077,1.282,0.596c0.19,0.519-0.077,1.093-0.596,1.282 c-7.884,2.883-10.334,7.133-10.357,7.175C7.692,29.812,7.35,29.997,6.999,29.997z"/></g></svg>,
  go: <svg height="30" viewBox="16.8 16.1 72.9 27.6" width="30" xmlns="http://www.w3.org/2000/svg"><switch><g fill="#00acd7"><path d="m22.3 24.7c-.1 0-.2-.1-.1-.2l.7-1c.1-.1.2-.2.4-.2h12.6c.1 0 .2.1.1.2l-.6.9c-.1.1-.2.2-.4.2zm-5.3 3.2c-.1 0-.2-.1-.1-.2l.7-1c.1-.1.2-.2.4-.2h16.1c.1 0 .2.1.2.2l-.3 1c0 .1-.2.2-.3.2zm8.5 3.3c-.1 0-.2-.1-.1-.2l.5-.9c.1-.1.2-.2.4-.2h7c.1 0 .2.1.2.2l-.1.8c0 .1-.1.2-.2.2zm36.6-7.2-5.9 1.5c-.5.1-.6.2-1-.4-.5-.6-.9-1-1.7-1.3-2.2-1.1-4.4-.8-6.4.5-2.4 1.5-3.6 3.8-3.6 6.7 0 2.8 2 5.1 4.8 5.5 2.4.3 4.4-.5 6-2.3.3-.4.6-.8 1-1.3h-6.8c-.7 0-.9-.5-.7-1.1.5-1.1 1.3-2.9 1.8-3.8.1-.2.4-.6.9-.6h12.8c-.1 1-.1 1.9-.2 2.9-.4 2.5-1.3 4.9-2.9 6.9-2.5 3.3-5.8 5.4-10 6-3.5.5-6.7-.2-9.5-2.3-2.6-2-4.1-4.6-4.5-7.8-.5-3.8.7-7.3 3-10.3 2.5-3.3 5.8-5.4 9.9-6.1 3.3-.6 6.5-.2 9.3 1.7 1.9 1.2 3.2 2.9 4.1 5 .1.4 0 .5-.4.6z"/><path d="m73.7 43.5c-3.2-.1-6.1-1-8.6-3.1-2.1-1.8-3.4-4.1-3.8-6.8-.6-4 .5-7.5 2.9-10.6 2.6-3.4 5.7-5.1 9.9-5.9 3.6-.6 7-.3 10 1.8 2.8 1.9 4.5 4.5 5 7.9.6 4.8-.8 8.6-4 11.9-2.3 2.4-5.2 3.8-8.4 4.5-1.1.2-2.1.2-3 .3zm8.4-14.2c0-.5 0-.8-.1-1.2-.6-3.5-3.8-5.5-7.2-4.7-3.3.7-5.4 2.8-6.2 6.1-.6 2.7.7 5.5 3.2 6.7 1.9.8 3.9.7 5.7-.2 2.9-1.4 4.4-3.7 4.6-6.7z"/></g></switch></svg>, 
  ruby: <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64" width="24px" height="24px"><ellipse cx="32" cy="61" opacity=".3" rx="19" ry="3"/><path fill="#cd2e42" d="M52.97,19l-1.8,28.36c-0.05,0.76-0.37,1.43-0.88,1.93c-0.5,0.5-1.17,0.83-1.93,0.87L18,52l0.11-0.11	c-2.39,0-4.46-0.58-6.03-1.82c-0.24-0.19-0.47-0.39-0.69-0.61c-1.4-1.41-2.15-3.31-2.33-5.53c-0.03-0.31-0.05-0.62-0.05-0.94L9,43	V30.57c0-0.16,0.02-0.32,0.06-0.47c0.04-0.18,0.11-0.36,0.21-0.53l4.43-7.09L14,22l4.5-4.5l4.1-4.1c0.26-0.26,0.56-0.5,0.88-0.7	l7.09-4.43c0.17-0.1,0.35-0.17,0.53-0.21C31.25,8.02,31.41,8,31.57,8H44l-0.01,0.01c0.32,0,0.64,0.01,0.95,0.04	c2.34,0.16,4.32,0.93,5.77,2.39C52.7,12.45,53.4,15.46,52.97,19z"/><path fill="#a8172d" d="M50.29,49.29c-0.5,0.5-1.17,0.83-1.93,0.87L18,52l0.11-0.11c-2.39,0-4.46-0.58-6.03-1.82L31,30	L50.29,49.29z"/><ellipse cx="31.049" cy="29.951" fill="#fd3c4f" rx="27.7" ry="14.142" transform="rotate(-44.781 31.048 29.95)"/><polygon fill="#ffa1ac" points="14,38 18.5,52 25,34"/><path fill="#ffa1ac" d="M14,38l-4.94,5.93L9,44V30.57c0-0.16,0.02-0.32,0.06-0.47L14,38z"/><polygon fill="#ffa1ac" points="35,24 30.5,29.5 25,34 41,40"/><polygon fill="#ffa1ac" points="39,13 53,17.5 35,24"/><path fill="#ffa1ac" d="M45,8l-0.06,0.05L39,13l-7.9-4.94C31.25,8.02,31.41,8,31.57,8H45z"/><path fill="#fd3c4f" d="M39,13l-4,11l-4.5,5.5L25,34l-11,4l-4.94-7.9c0.04-0.18,0.11-0.36,0.21-0.53l4.43-7.09	c0.2-0.32,0.44-0.62,0.7-0.88l4.1-4.1l4.1-4.1c0.26-0.26,0.56-0.5,0.88-0.7l7.09-4.43c0.17-0.1,0.35-0.17,0.53-0.21L39,13z"/><path fill="#fff" d="M35.56,8c0.09,1.76-0.74,3.51-2.34,4.51l-7.09,4.43	l-8.19,8.19l-4.43,7.09c-0.95,1.52-2.58,2.35-4.25,2.35c-0.09,0-0.17,0-0.26-0.01v-3.99c0-0.16,0.02-0.32,0.06-0.47	c0.04-0.18,0.11-0.36,0.21-0.53l4.43-7.09L14,22l4.5-4.5l4.1-4.1c0.26-0.26,0.56-0.5,0.88-0.7l7.09-4.43	c0.17-0.1,0.35-0.17,0.53-0.21C31.25,8.02,31.41,8,31.57,8H35.56z" opacity=".3"/><path d="M47.03,33.68l-0.74,11.6l-11.59,0.7c-2.76,0.17-4.86,2.54-4.69,5.29	l18.35-1.11c0.76-0.04,1.43-0.37,1.93-0.87c0.51-0.5,0.83-1.17,0.88-1.93l1.16-18.35C49.59,28.84,47.2,30.93,47.03,33.68z" opacity=".15"/><path fill="#fff" d="M22.5,20c-0.384,0-0.768-0.146-1.061-0.439c-0.586-0.586-0.586-1.535,0-2.121l1.71-1.71	c0.971-0.971,2.085-1.773,3.312-2.387l1.367-0.685c0.739-0.368,1.642-0.069,2.013,0.671c0.37,0.74,0.07,1.642-0.671,2.013	l-1.368,0.685c-0.938,0.469-1.79,1.082-2.532,1.824l-1.71,1.71C23.268,19.854,22.884,20,22.5,20z"/></svg>,
}

export const LanguageIcon = ({ language, size = 24 }) => {
  console.log("LanguageIcon", language)
  const getIcon = (iconSvg) => {
    return React.cloneElement(iconSvg, { width: size, height: size });
  };

  const icons = {
    javascript: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#ffd600" d="M6,42V6h36v36H6z"/><path fill="#000001" d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"/></svg>,
    typescript: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="36" height="36" x="6" y="6" fill="#1976d2"/><polygon fill="#fff" points="27.49,22 14.227,22 14.227,25.264 18.984,25.264 18.984,40 22.753,40 22.753,25.264 27.49,25.264"/><path fill="#fff" d="M39.194,26.084c0,0-1.787-1.192-3.807-1.192s-2.747,0.96-2.747,1.986 c0,2.648,7.381,2.383,7.381,7.712c0,8.209-11.254,4.568-11.254,4.568V35.22c0,0,2.152,1.622,4.733,1.622s2.483-1.688,2.483-1.92 c0-2.449-7.315-2.449-7.315-7.878c0-7.381,10.658-4.469,10.658-4.469L39.194,26.084z"/></svg>,
    python: <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" ><linearGradient id="goqfu1ZNmEnUrQDJEQ1bUa" x1="10.458" x2="26.314" y1="12.972" y2="26.277" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#26abe7"/><stop offset="1" stop-color="#086dbf"/></linearGradient><path fill="url(#goqfu1ZNmEnUrQDJEQ1bUa)" d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2 H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104 c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672 C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498 c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"/><linearGradient id="goqfu1ZNmEnUrQDJEQ1bUb" x1="35.334" x2="23.517" y1="37.911" y2="21.034" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#feb705"/><stop offset="1" stop-color="#ffda1c"/></linearGradient><path fill="url(#goqfu1ZNmEnUrQDJEQ1bUb)" d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2 h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104 c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672 C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498 c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"/></svg>,
    java: <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" ><path fill="#d43a02" d="M23.65,24.898c-0.998-1.609-1.722-2.943-2.725-5.455C19.229,15.2,31.24,11.366,26.37,3.999	c2.111,5.089-7.577,8.235-8.477,12.473C17.07,20.37,23.645,24.898,23.65,24.898z"/><path fill="#d43a02" d="M23.878,17.27c-0.192,2.516,2.229,3.857,2.299,5.695c0.056,1.496-1.447,2.743-1.447,2.743	s2.728-0.536,3.579-2.818c0.945-2.534-1.834-4.269-1.548-6.298c0.267-1.938,6.031-5.543,6.031-5.543S24.311,11.611,23.878,17.27z"/><linearGradient id="P9ujQJgz7XN9Qbny9S64Ha" x1="22.677" x2="30.737" y1="21.174" y2="43.318" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5c65d6"/><stop offset=".999" stop-color="#464eb0"/></linearGradient><path fill="url(#P9ujQJgz7XN9Qbny9S64Ha)" d="M32.084,25.055c1.754-0.394,3.233,0.723,3.233,2.01c0,2.901-4.021,5.643-4.021,5.643 s6.225-0.742,6.225-5.505C37.521,24.053,34.464,23.266,32.084,25.055z M29.129,27.395c0,0,1.941-1.383,2.458-1.902 c-4.763,1.011-15.638,1.147-15.638,0.269c0-0.809,3.507-1.638,3.507-1.638s-7.773-0.112-7.773,2.181 C11.683,28.695,21.858,28.866,29.129,27.395z"/><linearGradient id="P9ujQJgz7XN9Qbny9S64Hb" x1="19.498" x2="27.296" y1="22.77" y2="44.196" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5c65d6"/><stop offset=".999" stop-color="#464eb0"/></linearGradient><path fill="url(#P9ujQJgz7XN9Qbny9S64Hb)" d="M27.935,29.571 c-4.509,1.499-12.814,1.02-10.354-0.993c-1.198,0-2.974,0.963-2.974,1.889c0,1.857,8.982,3.291,15.63,0.572L27.935,29.571z"/><linearGradient id="P9ujQJgz7XN9Qbny9S64Hc" x1="18.698" x2="26.59" y1="23.455" y2="45.14" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5c65d6"/><stop offset=".999" stop-color="#464eb0"/></linearGradient><path fill="url(#P9ujQJgz7XN9Qbny9S64Hc)" d="M18.686,32.739 c-1.636,0-2.695,1.054-2.695,1.822c0,2.391,9.76,2.632,13.627,0.205l-2.458-1.632C24.271,34.404,17.014,34.579,18.686,32.739z"/><linearGradient id="P9ujQJgz7XN9Qbny9S64Hd" x1="18.03" x2="25.861" y1="24.198" y2="45.712" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5c65d6"/><stop offset=".999" stop-color="#464eb0"/></linearGradient><path fill="url(#P9ujQJgz7XN9Qbny9S64Hd)" d="M36.281,36.632 c0-0.936-1.055-1.377-1.433-1.588c2.228,5.373-22.317,4.956-22.317,1.784c0-0.721,1.807-1.427,3.477-1.093l-1.42-0.839 C11.26,34.374,9,35.837,9,37.017C9,42.52,36.281,42.255,36.281,36.632z"/><linearGradient id="P9ujQJgz7XN9Qbny9S64He" x1="20.725" x2="28.228" y1="24.582" y2="45.197" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5c65d6"/><stop offset=".999" stop-color="#464eb0"/></linearGradient><path fill="url(#P9ujQJgz7XN9Qbny9S64He)" d="M39,38.604 c-4.146,4.095-14.659,5.587-25.231,3.057C24.341,46.164,38.95,43.628,39,38.604z"/></svg>,
    csharp: <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48"><path fill="#00c853" d="M22.903,3.286c0.679-0.381,1.515-0.381,2.193,0c3.355,1.883,13.451,7.551,16.807,9.434 C42.582,13.1,43,13.804,43,14.566c0,3.766,0,15.101,0,18.867c0,0.762-0.418,1.466-1.097,1.847 c-3.355,1.883-13.451,7.551-16.807,9.434c-0.679,0.381-1.515,0.381-2.193,0c-3.355-1.883-13.451-7.551-16.807-9.434 C5.418,34.899,5,34.196,5,33.434c0-3.766,0-15.101,0-18.867c0-0.762,0.418-1.466,1.097-1.847 C9.451,10.837,19.549,5.169,22.903,3.286z"/><path fill="#69f0ae" d="M5.304,34.404C5.038,34.048,5,33.71,5,33.255c0-3.744,0-15.014,0-18.759 c0-0.758,0.417-1.458,1.094-1.836c3.343-1.872,13.405-7.507,16.748-9.38c0.677-0.379,1.594-0.371,2.271,0.008 c3.343,1.872,13.371,7.459,16.714,9.331c0.27,0.152,0.476,0.335,0.66,0.576L5.304,34.404z"/><path fill="#fff" d="M24,10c-7.73,0-14,6.27-14,14s6.27,14,14,14s14-6.27,14-14S31.73,10,24,10z M24,31 c-3.86,0-7-3.14-7-7s3.14-7,7-7s7,3.14,7,7S27.86,31,24,31z"/><path fill="#00e676" d="M42.485,13.205c0.516,0.483,0.506,1.211,0.506,1.784c0,3.795-0.032,14.589,0.009,18.384 c0.004,0.396-0.127,0.813-0.323,1.127L23.593,24L42.485,13.205z"/><path fill="#fff" d="M34 20H35V28H34zM37 20H38V28H37z"/><path fill="#fff" d="M32 25H40V26H32zM32 22H40V23H32z"/></svg>,
    php: <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64"><path fill="#b5c4e0" d="M32 14A31 18.174 0 1 0 32 50.348A31 18.174 0 1 0 32 14Z"/><path fill="#ced9ed" d="M32,14C14.879,14,1,22.137,1,32.174s13.879,18.174,31,18.174s31-8.137,31-18.174S49.121,14,32,14z M32,45.348c-15.322,0-26-6.942-26-13.174C6,25.943,16.678,19,32,19s26,6.943,26,13.174C58,38.405,47.322,45.348,32,45.348z"/><path fill="#8d6c9e" d="M42.435 26.435l-2.733 14.826h3.566l.71-4.043h2.219c4.645 0 7.172-1.076 8.117-5.062.813-3.425-1.264-5.72-4.69-5.72H42.435zM46.786 34.522h-2.305l1.018-5.391h2.778c2.302 0 2.786 1.038 2.666 2.193C50.634 34.297 48.78 34.522 46.786 34.522zM14.13 26.435l-2.733 14.826h3.566l.71-4.043h2.219c4.645 0 7.172-1.076 8.117-5.062.813-3.425-1.264-5.72-4.69-5.72H14.13zM18.481 34.522h-2.305l1.018-5.391h2.778c2.302 0 2.786 1.038 2.666 2.193C22.329 34.297 20.476 34.522 18.481 34.522zM39.311 27.415c-.762-.698-2.104-.98-4.105-.98h-3.153l1.124-5.391H29.64l-3.379 16.174h3.538l1.706-8.087h2.828c.902 0 1.497.151 1.775.449.276.301.337.867.177 1.686l-1.291 5.952h3.593l1.399-6.44C40.286 29.234 40.059 28.102 39.311 27.415z"/><path fill="#8d6c9f" d="M32 51.348c-17.645 0-32-8.602-32-19.174S14.355 13 32 13c17.645 0 32 8.602 32 19.174S49.645 51.348 32 51.348zM32 15C15.458 15 2 22.704 2 32.174s13.458 17.174 30 17.174 30-7.704 30-17.174S48.542 15 32 15zM58.693 50.667c-.33 0-.653-.163-.845-.463l-1.074-1.687c-.297-.466-.159-1.084.307-1.381.464-.296 1.083-.16 1.381.307l1.074 1.687c.297.466.159 1.084-.307 1.381C59.063 50.616 58.877 50.667 58.693 50.667zM54.446 53.004c-.375 0-.734-.212-.905-.573l-.854-1.809c-.235-.499-.021-1.096.478-1.331.501-.237 1.095-.021 1.331.478l.854 1.809c.235.499.021 1.096-.478 1.331C54.734 52.974 54.589 53.004 54.446 53.004zM49.969 54.817c-.414 0-.802-.26-.945-.673l-.654-1.891c-.181-.522.097-1.092.618-1.272s1.091.097 1.272.618l.654 1.891c.181.522-.097 1.092-.618 1.272C50.188 54.8 50.077 54.817 49.969 54.817zM45.344 56.171c-.451 0-.86-.308-.971-.766l-.47-1.944c-.13-.536.2-1.077.737-1.206.529-.131 1.076.2 1.206.737l.47 1.944c.13.536-.2 1.077-.737 1.206C45.501 56.162 45.422 56.171 45.344 56.171zM40.621 57.093c-.487 0-.914-.356-.988-.853l-.296-1.979c-.081-.546.295-1.055.842-1.137.552-.074 1.056.296 1.137.842l.296 1.979c.081.546-.295 1.055-.842 1.137C40.72 57.089 40.67 57.093 40.621 57.093zM35.841 57.596c-.522 0-.963-.406-.997-.936l-.129-1.996c-.035-.551.383-1.026.934-1.063.544-.027 1.027.383 1.063.934l.129 1.996c.035.551-.383 1.026-.934 1.063C35.885 57.595 35.862 57.596 35.841 57.596z"/><g><path fill="#8d6c9f" d="M21.862,21.161c-0.448,0-0.856-0.304-0.97-0.759c-0.133-0.536,0.194-1.079,0.729-1.212 c1.345-0.334,2.766-0.618,4.224-0.845c0.547-0.084,1.057,0.289,1.142,0.834c0.085,0.546-0.289,1.057-0.834,1.142 c-1.4,0.218-2.762,0.49-4.049,0.81C22.023,21.152,21.942,21.161,21.862,21.161z"/></g><g><path fill="#8d6c9f" d="M6.999,29.997c-0.163,0-0.328-0.04-0.481-0.124c-0.481-0.266-0.659-0.869-0.396-1.352 c0.109-0.2,2.767-4.925,11.424-8.091c0.516-0.191,1.092,0.077,1.282,0.596c0.19,0.519-0.077,1.093-0.596,1.282 c-7.884,2.883-10.334,7.133-10.357,7.175C7.692,29.812,7.35,29.997,6.999,29.997z"/></g></svg>,
    go: <svg viewBox="16.8 16.1 72.9 27.6" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><switch><g fill="#00acd7"><path d="m22.3 24.7c-.1 0-.2-.1-.1-.2l.7-1c.1-.1.2-.2.4-.2h12.6c.1 0 .2.1.1.2l-.6.9c-.1.1-.2.2-.4.2zm-5.3 3.2c-.1 0-.2-.1-.1-.2l.7-1c.1-.1.2-.2.4-.2h16.1c.1 0 .2.1.2.2l-.3 1c0 .1-.2.2-.3.2zm8.5 3.3c-.1 0-.2-.1-.1-.2l.5-.9c.1-.1.2-.2.4-.2h7c.1 0 .2.1.2.2l-.1.8c0 .1-.1.2-.2.2zm36.6-7.2-5.9 1.5c-.5.1-.6.2-1-.4-.5-.6-.9-1-1.7-1.3-2.2-1.1-4.4-.8-6.4.5-2.4 1.5-3.6 3.8-3.6 6.7 0 2.8 2 5.1 4.8 5.5 2.4.3 4.4-.5 6-2.3.3-.4.6-.8 1-1.3h-6.8c-.7 0-.9-.5-.7-1.1.5-1.1 1.3-2.9 1.8-3.8.1-.2.4-.6.9-.6h12.8c-.1 1-.1 1.9-.2 2.9-.4 2.5-1.3 4.9-2.9 6.9-2.5 3.3-5.8 5.4-10 6-3.5.5-6.7-.2-9.5-2.3-2.6-2-4.1-4.6-4.5-7.8-.5-3.8.7-7.3 3-10.3 2.5-3.3 5.8-5.4 9.9-6.1 3.3-.6 6.5-.2 9.3 1.7 1.9 1.2 3.2 2.9 4.1 5 .1.4 0 .5-.4.6z"/><path d="m73.7 43.5c-3.2-.1-6.1-1-8.6-3.1-2.1-1.8-3.4-4.1-3.8-6.8-.6-4 .5-7.5 2.9-10.6 2.6-3.4 5.7-5.1 9.9-5.9 3.6-.6 7-.3 10 1.8 2.8 1.9 4.5 4.5 5 7.9.6 4.8-.8 8.6-4 11.9-2.3 2.4-5.2 3.8-8.4 4.5-1.1.2-2.1.2-3 .3zm8.4-14.2c0-.5 0-.8-.1-1.2-.6-3.5-3.8-5.5-7.2-4.7-3.3.7-5.4 2.8-6.2 6.1-.6 2.7.7 5.5 3.2 6.7 1.9.8 3.9.7 5.7-.2 2.9-1.4 4.4-3.7 4.6-6.7z"/></g></switch></svg>, 
    ruby: <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64"><ellipse cx="32" cy="61" opacity=".3" rx="19" ry="3"/><path fill="#cd2e42" d="M52.97,19l-1.8,28.36c-0.05,0.76-0.37,1.43-0.88,1.93c-0.5,0.5-1.17,0.83-1.93,0.87L18,52l0.11-0.11	c-2.39,0-4.46-0.58-6.03-1.82c-0.24-0.19-0.47-0.39-0.69-0.61c-1.4-1.41-2.15-3.31-2.33-5.53c-0.03-0.31-0.05-0.62-0.05-0.94L9,43	V30.57c0-0.16,0.02-0.32,0.06-0.47c0.04-0.18,0.11-0.36,0.21-0.53l4.43-7.09L14,22l4.5-4.5l4.1-4.1c0.26-0.26,0.56-0.5,0.88-0.7	l7.09-4.43c0.17-0.1,0.35-0.17,0.53-0.21C31.25,8.02,31.41,8,31.57,8H44l-0.01,0.01c0.32,0,0.64,0.01,0.95,0.04	c2.34,0.16,4.32,0.93,5.77,2.39C52.7,12.45,53.4,15.46,52.97,19z"/><path fill="#a8172d" d="M50.29,49.29c-0.5,0.5-1.17,0.83-1.93,0.87L18,52l0.11-0.11c-2.39,0-4.46-0.58-6.03-1.82L31,30	L50.29,49.29z"/><ellipse cx="31.049" cy="29.951" fill="#fd3c4f" rx="27.7" ry="14.142" transform="rotate(-44.781 31.048 29.95)"/><polygon fill="#ffa1ac" points="14,38 18.5,52 25,34"/><path fill="#ffa1ac" d="M14,38l-4.94,5.93L9,44V30.57c0-0.16,0.02-0.32,0.06-0.47L14,38z"/><polygon fill="#ffa1ac" points="35,24 30.5,29.5 25,34 41,40"/><polygon fill="#ffa1ac" points="39,13 53,17.5 35,24"/><path fill="#ffa1ac" d="M45,8l-0.06,0.05L39,13l-7.9-4.94C31.25,8.02,31.41,8,31.57,8H45z"/><path fill="#fd3c4f" d="M39,13l-4,11l-4.5,5.5L25,34l-11,4l-4.94-7.9c0.04-0.18,0.11-0.36,0.21-0.53l4.43-7.09	c0.2-0.32,0.44-0.62,0.7-0.88l4.1-4.1l4.1-4.1c0.26-0.26,0.56-0.5,0.88-0.7l7.09-4.43c0.17-0.1,0.35-0.17,0.53-0.21L39,13z"/><path fill="#fff" d="M35.56,8c0.09,1.76-0.74,3.51-2.34,4.51l-7.09,4.43	l-8.19,8.19l-4.43,7.09c-0.95,1.52-2.58,2.35-4.25,2.35c-0.09,0-0.17,0-0.26-0.01v-3.99c0-0.16,0.02-0.32,0.06-0.47	c0.04-0.18,0.11-0.36,0.21-0.53l4.43-7.09L14,22l4.5-4.5l4.1-4.1c0.26-0.26,0.56-0.5,0.88-0.7l7.09-4.43	c0.17-0.1,0.35-0.17,0.53-0.21C31.25,8.02,31.41,8,31.57,8H35.56z" opacity=".3"/><path d="M47.03,33.68l-0.74,11.6l-11.59,0.7c-2.76,0.17-4.86,2.54-4.69,5.29	l18.35-1.11c0.76-0.04,1.43-0.37,1.93-0.87c0.51-0.5,0.83-1.17,0.88-1.93l1.16-18.35C49.59,28.84,47.2,30.93,47.03,33.68z" opacity=".15"/><path fill="#fff" d="M22.5,20c-0.384,0-0.768-0.146-1.061-0.439c-0.586-0.586-0.586-1.535,0-2.121l1.71-1.71	c0.971-0.971,2.085-1.773,3.312-2.387l1.367-0.685c0.739-0.368,1.642-0.069,2.013,0.671c0.37,0.74,0.07,1.642-0.671,2.013	l-1.368,0.685c-0.938,0.469-1.79,1.082-2.532,1.824l-1.71,1.71C23.268,19.854,22.884,20,22.5,20z"/></svg>,
  };

  return (
    <div>
      {icons[language] ? getIcon(icons[language]) : null}
    </div>
  );
};

export const getLabelKey = (label) => {
  return Object.keys(LANGUAGE_LABELS).find(key => LANGUAGE_LABELS[key] === label);
};