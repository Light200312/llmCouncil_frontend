import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets.js'
import { Context } from '../../context/Context.jsx'


const Sidebar = () => {

    const [extended, setExtended] = useState(false)
    const { prevPrompts, openRecentChat,newChat } = useContext(Context)



    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className='menu' src="/src/assets/menu_icon.png" />

                <div onClick={()=>newChat()} className="new-chat">
                    <img src="/src/assets/plus_icon.png" alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ? <div className="recent">
                    <p className="recent-title">Recent</p>
                    {prevPrompts.map((chat, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => openRecentChat(chat)}
                                className="recent-entry"
                            >
                                <img src="/src/assets/message_icon.png" alt="" />
                                <p>{chat.prompt.slice(0, 18)}...</p>
                            </div>
                        );
                    })}



                </div>
                    : null}

            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src="/src/assets/question_icon.png" alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src="/src/assets/history_icon.png" alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src="/src/assets/setting_icon.png" alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
