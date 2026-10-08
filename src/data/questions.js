export const questions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question:
      "Which CSS property is used to change the text color of an element?",
    options: ["font-color", "text-color", "color", "foreground"],
    correctAnswer: 2,
  },
  {
    id: 3,
    question:
      "What is the correct syntax for referring to an external script called 'app.js'?",
    options: [
      "<script href='app.js'>",
      "<script name='app.js'>",
      "<script src='app.js'>",
      "<script file='app.js'>",
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "Which React hook is used to manage complex state logic?",
    options: ["useState", "useReducer", "useEffect", "useRef"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "What does the '===' operator check in JavaScript?",
    options: [
      "Only value equality",
      "Only type equality",
      "Both value and type equality",
      "Reference equality",
    ],
    correctAnswer: 2,
  },
  {
    id: 6,
    question:
      "Which method creates a new array with the results of calling a function for every array element?",
    options: ["forEach()", "map()", "filter()", "reduce()"],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "What is the default port for a Vite development server?",
    options: ["3000", "8080", "5173", "4200"],
    correctAnswer: 2,
  },
  {
    id: 8,
    question: "Which keyword is used to declare a block-scoped variable in JavaScript?",
    options: ["var", "let", "function", "static"],
    correctAnswer: 1,
  },
  {
    id: 9,
    question:
      "In Tailwind CSS, which class sets an element's width to 100% of its parent?",
    options: ["w-full", "w-100", "width-full", "w-screen"],
    correctAnswer: 0,
  },
  {
    id: 10,
    question: "What does the localStorage API store data as?",
    options: ["JSON objects", "Strings", "Numbers", "Arrays"],
    correctAnswer: 1,
  },
];

export const TIME_LIMIT_SECONDS = 600;
