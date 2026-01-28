import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {

  // 🔹 states (tutorial-style)
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");


  const delayPara = (index, word) => {
    setTimeout(function () {
      setResultData(prev => prev + word);
    }, 50 * index)

  }


  // 🔹 send prompt to Gemini (via backend)
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    setRecentPrompt(prompt);


    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResultData("");
      const words = data.reply.split(" ");
      words.forEach((word, index) => {
        delayPara(index, word + " ");
      });

      setPrevPrompts((prev) => [...prev, { prompt, response: data.reply }]);
    } catch (err) {
      setResultData("Something went wrong. Please try again.");
    }

    setLoading(false);
    setInput("");
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
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
