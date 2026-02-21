
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
        <div className="flex-1 h-screen bg-base-100 text-base-content flex flex-col">
            <div className="flex items-center justify-between font-semibold text-xl md:text-2xl p-4 md:p-6 md:pr-2.5 text-base-content ">
                <p>LLM Council</p>
                <User size={32} className="md:w-9 rounded-full" />
            </div>
            <div className="flex-1 overflow-y-auto hide-scrollbar">
                <div className={showResult ? "w-full " : "max-w-4xl mx-auto px-4 md:px-0"}>
                    {!showResult ?
                        <>
                            <div className="mt-8 md:mt-12 animate-fadeUp">
                                <p><span className="text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent animate-gradient">Hello, User.</span></p>
                                <p className="text-xl md:text-3xl font-medium text-base-content  mt-2 md:mt-3.5 leading-relaxed">How can <span className="text-blue-500">We</span> help you today?</p>
                            </div>
                            {/* input suggestions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mt-8 md:mt-12 pb-80">
                                <div
                                    onClick={() => onSent("Suggest beautiful places to see in an upcoming road trip")}
                                    className="card bg-base-100 shadow-md hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-primary/30 transition-all duration-300 cursor-pointer border border-base-300"
                                >
                                    <div className="card-body">
                                        <p className="text-base font-medium">
                                            Suggest beautiful places to see in an upcoming road trip
                                        </p>
                                    </div>
                                </div>
                                {/* <div
                                    onClick={() => onSent("Briefly summarize this concept: urban planning")}
                                    className="bg-base-100 shadow-xl rounded-2xl p-4 md:p-5 min-h-32 flex flex-col justify-between cursor-pointer hover:bg-base-200gray-200  transition">
                                    <p className="text-sm md:text-base text-base-content  leading-relaxed">Briefly summarize this concept: urban planning</p>
                                    <Lightbulb size={24} className="opacity-80" />
                                </div> */}
                                <div
                                    onClick={() => onSent("Suggest beautiful places to see in an upcoming road trip")}
                                    className="card bg-base-100 shadow-md hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-primary/30 transition-all duration-300 cursor-pointer border border-base-300"
                                >
                                    <div className="card-body">
                                        <p className="text-base font-medium">
                                            Briefly summarize this concept: urban planning
                                        </p>
                                    </div>
                                </div>
                                {/* <div
                                    onClick={() => onSent("Brainstorm team bonding activities for our work retreat")}
                                    className="card bg-base-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-base-300"
                                >
                                    <div className="card-body">
                                        <p className="text-base font-medium">
                                            Brainstorm team bonding activities for our work retreat
                                        </p>
                                    </div>
                                </div> */}
                                <div
                                    onClick={() => onSent("Suggest beautiful places to see in an upcoming road trip")}
                                    className="card bg-base-100 shadow-md hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-primary/30 transition-all duration-300 cursor-pointer border border-base-300"
                                >
                                    <div className="card-body">
                                        <p className="text-base font-medium">
                                            Brainstorm team bonding activities for our work retreat
                                        </p>
                                    </div>
                                </div>
                                {/* <div
                                    onClick={() => onSent("Improve the readability of the following code")}
                                    className="card bg-base-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-base-300"
                                >
                                    <div className="card-body">
                                        <p className="text-base font-medium">
                                            Improve the readability of the following code
                                        </p>
                                    </div>
                                </div> */}
                                <div
                                    onClick={() => onSent("Suggest beautiful places to see in an upcoming road trip")}
                                    className="card bg-base-100 shadow-md hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-primary/30 transition-all duration-300 cursor-pointer border border-base-300"
                                >
                                    <div className="card-body">
                                        <p className="text-base font-medium">
                                            Improve the readability of the following code</p>
                                    </div>
                                </div>
                            </div>
                        </>
                        : <div className='py-4 md:py-5 px-6 md:px-32 pb-80 max-w-7xl mx-auto'>
                            <div className="my-8 md:my-10 flex items-center gap-4 md:gap-5">
                                <User size={36} className="md:w-10 rounded-full" />
                                <p className="text-sm md:text-base text-base-content ">{recentPrompt}</p>
                            </div>
                            <div className="flex w-fit  flex-col items-start gap-3 leading-relaxed text-sm md:text-base text-base-content ">

                                <div className='flex gap-2'>
                                    <button onClick={() => speakText(resultData)} className="px-4 py-2 bg-blue-500  text-white rounded-lg hover:bg-base-200blue-600  transition mb-2 text-sm md:text-base">
                                        {speaking ? "⏹ Stop" : "🔊 Speak"}
                                    </button>

                                    <Sparkles size={32} className="md:w-10" />
                                </div>

                                {loading ? (
                                    <div className='w-full flex flex-col gap-4'>
                                        <div className="h-5 bg-gray-200  rounded animate-pulse w-full"></div>
                                        <div className="h-5 bg-gray-200  rounded animate-pulse w-3/4"></div>
                                        <div className="h-5 bg-gray-200  rounded animate-pulse w-1/2"></div>
                                    </div>
                                ) : (
                                    /* ✅ FIXED MARKDOWN CONTAINER */
                                    <div className="w-full prose prose-xl md:prose-2xl  max-w-none 
                                        prose-table:border prose-table:border-gray-300 
                                        prose-th:bg-base-200  prose-th:p-3
                                        prose-td:p-3 prose-td:border-t prose-td:border-gray-200 
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

            <div className="w-full flex flex-col items-center p-4 md:p-6">
                <div className="bg-base-200 border border-base-300 rounded-2xl px-4 py-3 w-full max-w-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/40">

                    {image && (
                        <div className="flex gap-2 mb-3">
                            <div className="relative w-fit">
                                <img
                                    src={image}
                                    alt="preview"
                                    className="w-24 h-24 object-cover rounded-xl border border-base-300"
                                />
                                <button
                                    onClick={() => setImage(null)}
                                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-white text-xs flex items-center justify-center hover:scale-110 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            type="text"
                            placeholder="Enter a prompt here..."
                            className="flex-1 bg-transparent outline-none text-base-content placeholder:text-base-content/50"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && input.trim()) {
                                    onSent(input);
                                }
                            }}
                        />

                        <div className="flex items-center gap-3">
                            <label className="cursor-pointer hover:text-primary transition">
                                <Image size={20} />
                                <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                            </label>

                            <Mic
                                size={20}
                                className={`cursor-pointer transition ${listening ? "text-primary scale-110" : "hover:text-primary"
                                    }`}
                                onClick={startListening}
                            />

                            {input && (
                                <Send
                                    size={20}
                                    className="cursor-pointer hover:text-primary transition"
                                    onClick={() => {
                                        if (input.trim()) {
                                            onSent(input);
                                        }
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <p className="text-xs md:text-sm mt-3 text-center text-base-content/70">
                    LLM Council may display inaccurate info, including about people, so double-check its response.
                </p>
            </div>
        </div>
    )
}

export default Main
