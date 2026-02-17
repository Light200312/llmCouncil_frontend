
import { Context } from '../../context/Context'
import ReactMarkdown from "react-markdown";
import { useEffect, useState, useContext } from 'react';
import { Menu, Plus, MessageCircle, HelpCircle, History, Settings, Compass, Lightbulb, Code, User, Image, Mic, Send, Sparkles } from 'lucide-react';
import remarkGfm from 'remark-gfm';

const Main = () => {
    const {
        onSent,
        prevPrompts,
        showResult,
        loading,
        resultData,
        setInput,
        input,
        recentPrompt,
        setImage,
        image,
    } = useContext(Context);

    const [listening, setListening] = useState(false);
    const [speaking, setSpeaking] = useState(false);





    console.log("🧪 showResult:", showResult);
    console.log("🧪 loading:", loading);
    console.log("🧪 resultData:", resultData);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result); // base64 string
        };
        reader.readAsDataURL(file);
    };

    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onstart = () => {
            console.log("🎤 Listening...");
            setListening(true);

        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log("Voice Input:", transcript);

            setInput(transcript);   // ✅ fills input box
            onSent(transcript);     // ✅ sends prompt immediately
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.onend = () => {
            console.log("🎤 Stopped Listening");
            setListening(false);

        };
    };


    const speakText = (text) => {
        
        if (!window.speechSynthesis) return;

        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            setSpeaking(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => setSpeaking(false);
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    };


    useEffect(() => {
        if (!loading && resultData) {
            speakText(resultData);
        }
    }, [loading]);






    return (
        <div className="flex-1 h-screen bg-white dark:bg-slate-950 dark:text-gray-100 flex flex-col">
            <div className="flex items-center justify-between font-semibold text-xl md:text-2xl p-4 md:p-6 md:pr-2.5 text-gray-500 dark:text-gray-300">
                <p>LLM Council</p>
                <User size={32} className="md:w-9 rounded-full" />
            </div>
            <div className="flex-1 overflow-y-auto hide-scrollbar">
                <div className={showResult ? "w-full " : "max-w-4xl mx-auto px-4 md:px-0"}>
                    {!showResult ?
                        <>
                            <div className="mt-8 md:mt-12 animate-fadeUp">
                                <p><span className="text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent animate-gradient">Hello, User.</span></p>
                                <p className="text-xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 mt-2 md:mt-3.5 leading-relaxed">How can <span className="text-blue-500">We</span> help you today?</p>
                            </div>
                            {/* input suggestions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mt-8 md:mt-12 pb-80">
                                <div 
                                    onClick={() => onSent("Suggest beautiful places to see in an upcoming road trip")}
                                    className="bg-gray-100 dark:bg-slate-800 rounded-2xl p-4 md:p-5 min-h-32 flex flex-col justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 transition">
                                    <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 leading-relaxed">Suggest beautiful places to see in an upcoming road trip</p>
                                    <Compass size={24} className="opacity-80" />
                                </div>
                                <div 
                                    onClick={() => onSent("Briefly summarize this concept: urban planning")}
                                    className="bg-gray-100 dark:bg-slate-800 rounded-2xl p-4 md:p-5 min-h-32 flex flex-col justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 transition">
                                    <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 leading-relaxed">Briefly summarize this concept: urban planning</p>
                                    <Lightbulb size={24} className="opacity-80" />
                                </div>
                                <div 
                                    onClick={() => onSent("Brainstorm team bonding activities for our work retreat")}
                                    className="bg-gray-100 dark:bg-slate-800 rounded-2xl p-4 md:p-5 min-h-32 flex flex-col justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 transition">
                                    <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 leading-relaxed">Brainstorm team bonding activities for our work retreat</p>
                                    <MessageCircle size={24} className="opacity-80" />
                                </div>
                                <div 
                                    onClick={() => onSent("Improve the readability of the following code")}
                                    className="bg-gray-100 dark:bg-slate-800 rounded-2xl p-4 md:p-5 min-h-32 flex flex-col justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 transition">
                                    <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 leading-relaxed">Improve the readability of the following code</p>
                                    <Code size={24} className="opacity-80" />
                                </div>
                            </div>
                        </>
                        : <div className='py-4 md:py-5 px-6 md:px-32 pb-80 max-w-7xl mx-auto'>
                            <div className="my-8 md:my-10 flex items-center gap-4 md:gap-5">
                                <User size={36} className="md:w-10 rounded-full" />
                                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">{recentPrompt}</p>
                            </div>
                            <div className="flex w-fit  flex-col items-start gap-3 leading-relaxed text-sm md:text-base text-gray-800 dark:text-gray-200">
                              
                              <div className='flex gap-2'>
                                 <button onClick={() => speakText(resultData)} className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition mb-2 text-sm md:text-base">
                                    {speaking ? "⏹ Stop" : "🔊 Speak"}
                                </button>

                                <Sparkles size={32} className="md:w-10" />
                                </div>  
                               
                                {loading ? (
                                    <div className='w-full flex flex-col gap-4'>
                                        <div className="h-5 bg-gray-200 dark:bg-slate-800 rounded animate-pulse w-full"></div>
                                        <div className="h-5 bg-gray-200 dark:bg-slate-800 rounded animate-pulse w-3/4"></div>
                                        <div className="h-5 bg-gray-200 dark:bg-slate-800 rounded animate-pulse w-1/2"></div>
                                    </div>
                                ) : (
                                    /* ✅ FIXED MARKDOWN CONTAINER */
                                    <div className="w-full prose prose-xl md:prose-2xl dark:prose-invert max-w-none 
                                        prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-700
                                        prose-th:bg-gray-100 dark:prose-th:bg-slate-800 prose-th:p-3
                                        prose-td:p-3 prose-td:border-t prose-td:border-gray-200 dark:prose-td:border-gray-700
                                        prose-p:leading-loose prose-pre:bg-slate-900 prose-pre:p-4">
                                        
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {resultData}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className="p-4 md:p-5 w-full">
                <div className="flex flex-col gap-2 bg-gray-200 dark:bg-slate-800 p-3 md:p-4 rounded-3xl">
                    {image && (
                        <div className="flex gap-2 p-1 overflow-x-auto">
                            <div className="flex justify-start relative w-fit flex-shrink-0">
                                <img src={image} alt="preview" className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-2xl border-2 border-gray-300 dark:border-gray-600 shadow-md hover:scale-105 transition" />
                                <button
                                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 dark:bg-red-600 text-white cursor-pointer font-bold flex items-center justify-center hover:bg-red-600 dark:hover:bg-red-700 transition"
                                    onClick={() => setImage(null)}
                                    title="Remove image"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-2 md:gap-3">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Enter a prompt here"
                            className="flex-1 bg-transparent border-none outline-none p-2 text-base md:text-lg dark:text-white dark:placeholder-gray-400"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && input.trim()) {
                                    onSent(input);
                                }
                            }}
                        />

                        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                            <label className="cursor-pointer hover:opacity-70 transition">
                                <Image size={20} className="md:w-6" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageUpload}
                                />
                            </label>

                            <Mic
                                size={20}
                                className="md:w-6 cursor-pointer hover:opacity-70 transition"
                                onClick={startListening}
                                style={{
                                    filter: listening ? "brightness(1.5)" : "none"
                                }}
                            />

                            {input ? <Send
                                size={20}
                                className="md:w-6 cursor-pointer hover:opacity-70 transition"
                                onClick={() => {
                                    console.log("✅ Send icon clicked");
                                    console.log("Input value:", input);
                                    if (input.trim()) {
                                        onSent(input);
                                    }
                                }}
                            /> : null}
                        </div>
                    </div>
                </div>
                <p className="text-xs md:text-sm my-2 md:my-3 text-center font-light text-gray-600 dark:text-gray-400 px-2">
                    LLM Council may display inaccurate info, including about people, so double-check its response. Your privacy and LLM Council Apps
                </p>
            </div>
        </div>
    )
}

export default Main
