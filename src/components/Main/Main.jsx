import React, { useContext } from 'react'
import './Main.css'
import { Context } from '../../context/Context'
import ReactMarkdown from "react-markdown";


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
    } = useContext(Context);



console.log("🧪 showResult:", showResult);
console.log("🧪 loading:", loading);
console.log("🧪 resultData:", resultData);


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
                    :<div className='result'>
                        <div className="result-title">
                            <img src="/src/assets/user_icon.png" alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src="/src/assets/gemini_icon.png" alt="" />
                            {loading?
                            <div className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            :<ReactMarkdown>{resultData}</ReactMarkdown>
                            }
                            


                        </div>

                    </div>

                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src="/src/assets/gallery_icon.png" alt="" />
                            <img src="/src/assets/mic_icon.png" alt="" />
                            {input?<img
                                src="/src/assets/send_icon.png"
                                alt=""
                                onClick={() => {
                                    console.log("✅ Send icon clicked");
                                    console.log("Input value:", input);
                                    if (input.trim()) {
                                        onSent(input);
                                    }
                                }}
                            />:null}


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
