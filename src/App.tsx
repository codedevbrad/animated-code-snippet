import CodeTypewriter from "./animatedSnippet";

export default function App() {
  const codeSteps = [
    {
      step: 1,
      code: `function DisplayName `,
      type: "interactive",
      audio: "",
      interactive: {
        correct: 0,
        options: [
          `function keyword function name`,
          `function name function keyword`,
        ],
        question: "How do we tell js we want to create a named function?",
      },
    },
    {
      step: 2,
      type: "interactive",
      audio: "",
      code: `( { name , age } ) {`,
      interactive: {
        correct: 0,
        options: [`({ propname })`, `([ propname ])`, `(propname)`],
        question: "How do we allow for arguments to be passed to a function?",
      },
    },
    {
      step: 3,
      type: "interactive",
      audio: "",
      code: `   \n   return`,
      interactive: {
        correct: 0,
        options: [`return`, `visualise`, `render`],
        question:
          "How do we turn a function into a component that can render jsx?",
      },
    },
    {
      step: 4,
      type: "interactive",
      audio: "",
      code: ` ( \n    <div> \n      { name } \n    </div> \n   ) \n }`,
      interactive: {
        correct: 2,
        options: [`[ ]`, `{ }`, `( )`],
        question: "How do we open and close jsx for a component?",
      },
    },
    {
      step: 5,
      type: "interactive",
      audio: "",
      code: " \n \n export default DisplayName;",
      interactive: {
        correct: 1,
        options: [
          `export function DisplayName`,
          `export default function DisplayName;`,
        ],
        question: "How do we export this component to use elsewhere?",
      },
    },
  ];

  return (
    <div>
      <CodeTypewriter codeSteps={codeSteps} typingSpeed={45} isShowcaseMode={ true } />
      <CodeTypewriter codeSteps={codeSteps} typingSpeed={75} />
    </div>
  );
}