# Animated code snippet challenges

<div align="center">
  <img src="https://github.com/user-attachments/assets/22cbdbc7-8fde-468e-8fcb-eebf4a81a66a" alt="Animated code snippet challenges" width="900" height="420" />
</div>

<br />


This project provides an interactive and animated code learning experience using React. It presents coding challenges in a typewriter-like animation, allowing users to learn and practice coding concepts step by step. The challenges are enhanced with options for interactive questions, live coding reflections, and the ability to retry challenges.


## Features

- **Animated Code Typing**: Code is displayed in a typewriter-style animation, making it easier for users to follow along with the code as it is written.
- **Interactive Questions**: Users are prompted with questions during the code animation process. They must choose the correct option to proceed.
- **Retry Challenges**: After completing a challenge, users can retry it to reinforce their learning.
- **Customizable Code Steps**: Each step of the coding challenge is fully customizable, allowing for different types of questions, code snippets, and interaction.
- **Smooth Animations**: Uses `framer-motion` for smooth transitions and animations, enhancing the user experience.
- **Showcase mode**: wwhen in isShowcase mode you can bypass the interactivity and just show someone the code.


## to implement 
- ** type: 'highlight' that highlights a portion and skips to the next stage when audio is complete.
- ** blocks that can be injected at certain positions / indexes.
- ** blocks that can be edited and be reflected in a live version.
- ** at the end, give an option to try coding it all yourself, then see both the final and tried version.
- ** generate the codesteps dynamically by creating new steps in a ui with a textarea to write the next code.  
     I'll need to figure out formatting so code injected has the correct spacing.


## Installation

To get started with this project, you need to clone the repository and install the dependencies.

```javascript
git clone https://github.com/codedevbrad/animated-code-snippet.git
npm install
npm run start
```

## Implementing the Animated snippet

```javascript
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
      code: ` ( \n    <div> \n      hello \n    </div> \n   ) \n }`,
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

```
