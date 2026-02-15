import { createContext, useState } from "react";
import { callOpenRouter } from "../utils/openrouter.js";

export const Context = createContext();

const ContextProvider = ({ children }) => {

  // 🔹 states (tutorial-style)
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [image, setImage] = useState(null);



  const delayPara = (index, word) => {
    setTimeout(function () {
      setResultData(prev => prev + word);
    }, 50 * index)

  }


  // 🔹 send prompt to OpenRouter API
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    setRecentPrompt(prompt);

    try {
      const reply = await callOpenRouter(prompt,image);

      setResultData("");
      const words = reply.split(" ");
      words.forEach((word, index) => {
        delayPara(index, word + " ");
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

  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
