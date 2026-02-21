import React, { useContext } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { theme, setTheme } = useContext(Context);
  const navigate = useNavigate();

  const themes = ["light", "dark", "cupcake", "forest", "dracula"];

// …

<select
  className="select select-bordered w-full pl-4"
  value={theme}
  onChange={(e) => setTheme(e.target.value)}
>
  {themes.map(t => (
    <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>
  ))}
</select>

  return (
  <div className="flex-1 min-h-screen bg-base-200">

    {/* Top Navigation Bar */}
    <div className="flex items-center justify-between px-8 py-6 border-b border-base-300">
      
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors duration-200"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold">Settings</h1>

      <div /> {/* Empty div for balance */}
    </div>

    {/* Content Area */}
    <div className="flex justify-center p-10">
      <div className="w-full max-w-xl">
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="text-xl font-semibold mb-4">Change Theme</h2>

            <select
              className="select select-bordered w-full"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="cupcake">Cupcake</option>
              <option value="forest">Forest</option>
              <option value="dracula">Dracula</option>
            </select>

          </div>
        </div>
      </div>
    </div>

  </div>
);
};

export default SettingsPage;