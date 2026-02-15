
import './Main.css'
import { Context } from '../../context/Context'
import ReactMarkdown from "react-markdown";
import { useEffect, useState, useContext } from 'react';


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
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src="/src/assets/user_icon.png" alt="" />
            </div>
            <div className="main-container">
                {!showResult ?

                    <>
                        <div className="greet">
                            <p><span>Hello, Suraj.</span></p>
                            <p>How can I help you today?</p>

                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see n an upcoming road trip</p>
                                <img src="/src/assets/compass_icon.png" alt="" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concep: urban planning</p>
                                <img src="/src/assets/bulb_icon.png" alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstorm tram bonding activities for our work retreat</p>
                                <img src="/src/assets/message_icon.png" alt="" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src="/src/assets/code_icon.png" alt="" />
                            </div>
                        </div>
                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src="/src/assets/user_icon.png" alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <button onClick={() => speakText(resultData)}>
                                {speaking ? "⏹ Stop" : "🔊 Speak"}
                            </button>


                            <img src="/src/assets/gemini_icon.png" alt="" />
                            {loading ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <ReactMarkdown>{resultData}</ReactMarkdown>
                            }



                        </div>

                    </div>

                }

                <div className="main-bottom">
                    <div className="search-box">

                        {image && (
                            <div className="image-preview-container">
                                <div className="image-preview">
                                    <img src={image} alt="preview" />
                                    <button
                                        className="remove-image-btn"
                                        onClick={() => setImage(null)}
                                        title="Remove image"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="input-row">

                            <input
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                                type="text"
                                placeholder="Enter a prompt here"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && input.trim()) {
                                        onSent(input);
                                    }
                                }}
                            />

                            <div>
                                <label>
                                    <img src="/src/assets/gallery_icon.png" alt="" style={{ cursor: "pointer" }} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleImageUpload}
                                    />
                                </label>

                                <img
                                    src="/src/assets/mic_icon.png"
                                    alt=""
                                    onClick={startListening}
                                    style={{
                                        cursor: "pointer",
                                        filter: listening ? "brightness(1.5)" : "none"
                                    }}
                                />


                                {input ? <img
                                    src="/src/assets/send_icon.png"
                                    alt=""
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
                    <p className="bottom-info">
                        Gemini,may display inaccurate info, including about people, so double-check its response. Your privacy and Gemini Apps
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Main
