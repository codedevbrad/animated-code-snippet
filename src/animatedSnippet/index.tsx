// @ts-nocheck

import React, { useState, useEffect } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { motion } from "framer-motion";


/*
** to add : ** 
  * type: 'highlight' that highlights a portion and skips to the next stage when audio is complete.

  * blocks that can be injected at certain positions / indexes.

  * blocks that can be edited and be reflected in a live version.

  * at the end, give an option to try coding it all yourself, then see both the final and tried version.
*/


// EditorHeader Component
const EditorHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between bg-gray-800 text-white px-3 py-2 rounded-lg"
    >
      <div className="text-center flex-grow text-sm">challenge.jsx</div>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <div className="w-3 h-3 bg-red-500 rounded-full"> </div>
      </div>
    </motion.div>
  );
};

// CodeDisplay Component
const CodeDisplay = ({ displayedCode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-green-400 p-4 rounded-b-lg"
      style={{ backgroundColor: "transparent" }}
    >
      <Highlight
        {...defaultProps}
        theme={theme}
        code={displayedCode}
        language="jsx"
        style={{ backgroundColor: "transparent", padding: 0 }}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`${className} pl-8 relative`}
            style={{ ...style, backgroundColor: "transparent", padding: 0 }}
          >
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                className="relative"
              >
                <span className="text-gray-600 mr-3">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </motion.pre>
        )}
      </Highlight>
    </motion.div>
  );
};

// NextButton Component
const NextButton = ({ onClick, isDisabled }) => {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="bg-black text-white px-4 py-2 rounded-lg disabled:opacity-50"
      disabled={isDisabled}
    >
      What's next?
    </motion.button>
  );
};

// CompletedButton Component
const CompletedButton = ({ completedText = "Retry the challenge!" , onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="bg-black text-white px-4 py-2 rounded-xl"
    >
        { completedText }
    </motion.button>
  );
};

// OptionsDisplay Component
const OptionsDisplay = ({
  options,
  onSelectOption,
  selectedOption,
  correctOption,
  incorrectSelections,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex space-x-4"
    >
      {options.map((option, index) => {
        const isIncorrect = incorrectSelections.includes(index);
        const isCorrect = index === correctOption;
        const isSelected = index === selectedOption;

        let buttonClass = "px-6 py-3 rounded-xl focus:outline-none";

        if (isCorrect && isSelected) {
          buttonClass += " bg-black text-white";
        } else if (isIncorrect) {
          buttonClass += " bg-red-700 text-white"; // Grey out incorrect selections
        } else {
          buttonClass += " bg-gray-700 text-white hover:bg-gray-600";
        }

        return (
          <button
            key={index}
            onClick={() => onSelectOption(index)}
            className={buttonClass}
            disabled={isIncorrect} // Disable the button if it has been incorrectly selected
          >
            {option}
          </button>
        );
      })}
    </motion.div>
  );
};


const CodeTypewriter = ({ codeSteps, typingSpeed = 50, isShowcaseMode = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [displayedCode, setDisplayedCode] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [incorrectSelections, setIncorrectSelections] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const codeToType = codeSteps[currentStep - 1].code;

    if (typingIndex < codeToType.length && isTyping) {
      const timeoutId = setTimeout(() => {
        setDisplayedCode(prev => prev + codeToType[typingIndex]);
        setTypingIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeoutId);
    } else if (typingIndex === codeToType.length) {
      setIsTyping(false); // Stop typing when the current code is fully typed out

      if (isShowcaseMode) {
        if (currentStep < codeSteps.length) {
          const timeoutId = setTimeout(() => {
            handleNextStep(); // Automatically move to the next step in showcase mode
          }, 1000); // Adjust delay as needed
          return () => clearTimeout(timeoutId);
        } else {
          setIsCompleted(true); // Mark as completed when all steps are done in showcase mode
        }
      } else {
        // Ensure code is rendered before moving to the next step
        if (
          currentStep < codeSteps.length &&
          (codeSteps[currentStep - 1]?.interactive === undefined ||
            selectedOption === codeSteps[currentStep - 1]?.interactive?.correct)
        ) {
          const timeoutId = setTimeout(() => {
            handleNextStep(); // Move to the next step after a small delay
          }, 1000); // Adjust delay as needed
          return () => clearTimeout(timeoutId);
        }

        if (currentStep === codeSteps.length) {
          setIsCompleted(true); // Mark as completed when all steps are done
        }
      }
    }
  }, [
    typingIndex,
    currentStep,
    isTyping,
    selectedOption,
    codeSteps,
    typingSpeed,
    isShowcaseMode,
  ]);

  const handleNextStep = () => {
    if (currentStep < codeSteps.length) {
      setCurrentStep(prev => prev + 1);
      setTypingIndex(0);
      setIsTyping(false); // Reset typing state for the next step
      setSelectedOption(null); // Reset the selected option for the next step
      setIncorrectSelections([]); // Reset the incorrect selections for the next step
    }
  };

  const handleSelectOption = selectedIndex => {
    setSelectedOption(selectedIndex);
    const correctIndex = codeSteps[currentStep - 1]?.interactive?.correct;

    if (selectedIndex === correctIndex) {
      setIsTyping(true); // Start typing when the correct option is selected
    } else {
      setIncorrectSelections(prev => [...prev, selectedIndex]); // Track incorrect selections
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setDisplayedCode("");
    setTypingIndex(0);
    setIsTyping(false);
    setSelectedOption(null);
    setIncorrectSelections([]);
    setIsCompleted(false);
  };

  useEffect(() => {
    if (!codeSteps[currentStep - 1].interactive || isShowcaseMode) {
      setIsTyping(true); // Automatically start typing if no interactive options are present or in showcase mode
    }
  }, [currentStep, codeSteps, isShowcaseMode]);

  return (
    <div className="flex flex-col items-center space-y-4 m-5 bg-gray-200 py-8 p-5 rounded-xl">
      {!isCompleted && codeSteps[currentStep - 1]?.interactive?.question && !isShowcaseMode && (
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-lg font-semibold text-black"
        >
          {codeSteps[currentStep - 1].interactive.question}
        </motion.h2>
      )}

      {isCompleted && (
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-lg font-semibold text-black"
        >
          { !isShowcaseMode ? `Awesome, you've completed this challenge` : null }
        </motion.h2>
      )}

      <div className="bg-black p-4 rounded-2xl w-full shadow-2xl">
        <EditorHeader />
        <CodeDisplay displayedCode={displayedCode} />
      </div>

      {!isCompleted && codeSteps[currentStep - 1]?.interactive && !isShowcaseMode && (
        <OptionsDisplay
          options={codeSteps[currentStep - 1].interactive.options}
          onSelectOption={handleSelectOption}
          selectedOption={selectedOption}
          correctOption={codeSteps[currentStep - 1].interactive.correct}
          incorrectSelections={incorrectSelections}
        />
      )}

      <div className="flex space-x-4">
        {!isTyping &&
          !isCompleted &&
          !codeSteps[currentStep - 1]?.interactive && !isShowcaseMode && (
            <NextButton
              onClick={handleNextStep}
              isDisabled={currentStep === codeSteps.length}
            />
          )}
        {isCompleted && <CompletedButton onClick={handleReset} completedText={ isShowcaseMode ? 'View again' : 'Redo Challenge' } />}
      </div>
    </div>
  );
};

export default CodeTypewriter;