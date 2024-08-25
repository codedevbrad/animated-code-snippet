import CodeTypewriter from "./animatedSnippet/v0";
import AnimatedEditorRefactor from "./animatedSnippet/v1"

import { v0Data } from "./animatedSnippet/v0/data";
import { refactorData } from "./animatedSnippet/v1/data";

export default function App() {
  return (
    <div>
      {/* <CodeTypewriter codeSteps={v0Data} typingSpeed={45} isShowcaseMode={ true } />
      <CodeTypewriter codeSteps={v0Data} typingSpeed={75} />  */}
      <AnimatedEditorRefactor codeSteps={ refactorData } title={ 'Learn React components'} />
    </div>
  );
}