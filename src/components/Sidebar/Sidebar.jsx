import React, { useContext, useState } from 'react'
import { Context } from '../../context/Context.jsx'
import { Menu, Plus, MessageCircle, HelpCircle, History, Settings } from 'lucide-react'


const Sidebar = () => {

    const [extended, setExtended] = useState(false)
    const { prevPrompts, openRecentChat,newChat } = useContext(Context)



    return (
        <div className={`h-screen ${extended ? 'w-64' : 'w-20'} flex flex-col justify-between bg-slate-100 dark:bg-slate-900 p-6 hidden md:flex transition-all duration-300 overflow-hidden`}>
            <div className="top">
                <button onClick={() => setExtended(prev => !prev)} className='cursor-pointer ml-2 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition flex-shrink-0'>
                    <Menu size={20} />
                </button>

                <div onClick={()=>newChat()} className="mt-12 inline-flex items-center gap-2 p-2 bg-slate-200 dark:bg-slate-800 rounded-full text-sm text-gray-500 dark:text-gray-300 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition">
                    <Plus size={20} className="flex-shrink-0" />
                    {extended && <p className="text-sm">New Chat</p>}
                </div>
                {extended && (
                    <div className="flex flex-col animate-fadeIn">
                        <p className="mt-7 mb-5 font-medium text-gray-700 dark:text-gray-300">Recent</p>
                        {prevPrompts.map((chat, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => openRecentChat(chat)}
                                    className="flex items-start gap-2 p-2 rounded-full text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition text-sm"
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
                <div className="flex items-start gap-2 p-2 rounded-full text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition">
                    <HelpCircle size={20} className="flex-shrink-0" />
                    {extended && <p className="text-sm">Help</p>}
                </div>
                <div className="flex items-start gap-2 p-2 rounded-full text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition">
                    <History size={20} className="flex-shrink-0" />
                    {extended && <p className="text-sm">Activity</p>}
                </div>
                <div className="flex items-start gap-2 p-2 rounded-full text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition">
                    <Settings size={20} className="flex-shrink-0" />
                    {extended && <p className="text-sm">Settings</p>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
