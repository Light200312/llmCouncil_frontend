import { createContext, useState } from "react";
import { callOpenRouter } from "../utils/openrouter.js";

export const Context = createContext();
import { useEffect } from "react";

const ContextProvider = ({ children }) => {

  // 🔹 states (tutorial-style)
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [image, setImage] = useState(null);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
  const valid = ["light","dark","cupcake","forest","dracula"];
  const applied = valid.includes(theme) ? theme : "light";
  document.documentElement.setAttribute("data-theme", applied);
  localStorage.setItem("theme", applied);
}, [theme]);



  const delayPara = (index, character) => {
    setTimeout(function () {
      setResultData(prev => prev + character);
    }, 15 * index)
  }


  // 🔹 send prompt to OpenRouter API
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    setRecentPrompt(prompt);

    try {
      const reply = await callOpenRouter(prompt, image);

      setResultData("");
      // Split by character instead of word to preserve markdown formatting
      const characters = reply.split("");
      characters.forEach((char, index) => {
        delayPara(index, char);
      });

      setPrevPrompts((prev) => [...prev, { prompt, response: reply }]);
    } catch (err) {
      console.error("❌ OpenRouter error:", err);
      setResultData(err.message || "Something went wrong. Please try again.");
    }

    setLoading(false);
    setInput("");
    setImage(null);
  };

  // 🔹 start new chat
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setInput("");
  };

  const openRecentChat = (chat) => {
    setShowResult(true);
    setRecentPrompt(chat.prompt);
    setResultData(chat.response);
  };


  // 🔹 values shared to components
  const value = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    openRecentChat,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    image,
    setImage,
    theme,
    setTheme,

  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
