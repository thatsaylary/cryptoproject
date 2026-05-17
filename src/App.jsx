import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Profile from "./pages/Profile";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-[#0f1117] transition-colors duration-300">
        <Header dark={dark} setDark={setDark} />
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}