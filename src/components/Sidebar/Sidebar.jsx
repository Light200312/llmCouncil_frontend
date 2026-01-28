import React, { useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets.js'


const Sidebar = () => {

    const [extended, setExtended] = useState(false)

    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={()=>setExtended(prev=>!prev)} className='menu' src="/src/assets/menu_icon.png" />

                <div className="new-chat">
                    <img src="/src/assets/plus_icon.png" alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ? <div className="recent">
                    <p className="recent-title">Recent</p>
                    <div className="recent-entry">
                        <img src="/src/assets/message_icon.png" alt="" />
                        <p>What is react ...</p>
                    </div>
                </div> : null}

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
