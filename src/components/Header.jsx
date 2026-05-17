import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../context/WalletContext";
import WalletModal from "./WalletModal";

export default function Header({ dark, setDark }) {
  const { account, shortAddress } = useWallet();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-white dark:bg-[#16181f] border-b border-gray-200 dark:border-[#2a2d38] px-8 h-16 flex items-center justify-between sticky top-0 z-10 transition-colors duration-300">
        {/* Логотип */}
        <div
          className="font-mono text-lg font-bold text-gray-900 dark:text-gray-100 cursor-pointer"
          onClick={() => navigate("/")}
        >
          ./shop<span className="text-green-500">.</span>
        </div>

        {/* Навигация */}
        <nav className="flex gap-8">
          <span
            onClick={() => navigate("/")}
            className="text-sm font-bold text-gray-900 dark:text-gray-100 cursor-pointer hover:text-green-500 transition-colors"
          >
            Каталог
          </span>
          <span
            onClick={() => navigate("/profile")}
            className="text-sm font-bold text-gray-900 dark:text-gray-400 cursor-pointer hover:text-green-500 transition-colors"
          >
            Заказы
          </span>
        </nav>

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          {/* Поиск */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#1e212c] border border-gray-200 dark:border-[#2a2d38] rounded-xl px-4 py-2">
            <i className="ti ti-search text-gray-400 text-base" aria-hidden="true" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              className="bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 w-36 font-sans"
            />
          </div>

          {/* Переключатель темы */}
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-xl border border-gray-200 dark:border-[#2a2d38] bg-gray-100 dark:bg-[#1e212c] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-green-500 hover:text-green-500 transition-all"
            title="Переключить тему"
          >
            <i className={`ti ${dark ? "ti-sun" : "ti-moon"} text-base`} aria-hidden="true" />
          </button>

          {/* Кнопка кошелька */}
          {account ? (
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-green-500 text-green-500 text-sm font-semibold hover:bg-green-50 dark:hover:bg-green-500/10 transition-colors"
            >
              <i className="ti ti-circle-check" aria-hidden="true" />
              {shortAddress(account)}
            </button>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors"
            >
              <i className="ti ti-wallet" aria-hidden="true" />
              Подключить кошелёк
            </button>
          )}

          {/* Профиль */}
          <div
            onClick={() => navigate("/profile")}
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-[#2a2d38] bg-gray-100 dark:bg-[#1e212c] flex items-center justify-center cursor-pointer hover:border-green-500 transition-colors"
          >
            <i className="ti ti-user text-gray-500 dark:text-gray-400 text-lg" aria-hidden="true" />
          </div>
        </div>
      </header>

      {modalOpen && <WalletModal onClose={() => setModalOpen(false)} />}
    </>
  );
}