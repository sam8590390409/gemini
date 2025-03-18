import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response = prompt ? await run(prompt) : await run(input);
    if (!prompt) {
      setPrevPrompt([...prevPrompt, input]);
      setRecentPrompt(input);
    } else {
      setRecentPrompt(prompt);
    }

    let formattedResponse = response
      .split("**")
      .map((text, i) => (i % 2 ? `<b>${text}</b>` : text))
      .join("")
      .replace(/\*/g, "<br>");

    formattedResponse.split(" ").forEach((word, i) => delayPara(i, word + " "));

    setLoading(false);
    setInput("");
  };

  return (
    <Context.Provider value={{ prevPrompt, setPrevPrompt, onSent, setRecentPrompt, recentPrompt, showResult, loading, resultData, input, setInput, newChat }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
