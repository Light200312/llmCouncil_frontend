import React, { useContext, useState } from 'react'
import { Context } from '../../context/Context.jsx'
import { useNavigate } from "react-router-dom";
import { Menu, Plus, MessageCircle, HelpCircle, History, Settings } from 'lucide-react'


const Sidebar = () => {

    const [extended, setExtended] = useState(false)
    const { prevPrompts, openRecentChat, newChat } = useContext(Context)
    const navigate = useNavigate()



    return (
        <div
            className={`h-screen ${
  extended ? "w-64" : "w-20"
} flex flex-col justify-between bg-base-300 p-4 transition-all duration-300 border-r border-base-200`}
        >
            <div className="top">
                <button onClick={() => setExtended(prev => !prev)} className="cursor-pointer ml-2 p-2 hover:bg-base-200 rounded-lg transition flex-shrink-0">
                    <Menu size={20} />
                </button>

                <div
                    onClick={newChat}
                    className="btn btn-primary btn-sm w-full normal-case gap-2 shadow-md hover:shadow-lg transition-all duration-200"
                >
                    <Plus size={16} />
                    {extended && "New Chat"}
                </div>
                {extended && (
                    <div className="flex flex-col animate-fadeIn">
                        <p className="mt-7 mb-5 font-medium text-base-content ">Recent</p>
                        {prevPrompts.map((chat, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => openRecentChat(chat)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-base-content cursor-pointer hover:bg-base-200 hover:scale-[1.02] transition-all duration-200 text-sm"
                                >
                                    <MessageCircle size={20} className="flex-shrink-0" />
                                    <p className="truncate">{chat.prompt.slice(0, 18)}...</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                    <HelpCircle size={20} className="flex-shrink-0" />
                    {extended && <p className="text-sm">Help</p>}
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                    <History size={20} className="flex-shrink-0" />
                    {extended && <p className="text-sm">Activity</p>}
                </div>
                <div
                    onClick={() => navigate("/settings")}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                >
                    <Settings size={20} className="flex-shrink-0" />
                    {extended && <p className="text-sm">Settings</p>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
