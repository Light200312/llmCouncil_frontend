import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import SettingsPage from "./pages/SettingsPage";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
};

export default App;