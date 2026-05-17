import { createContext, useContext, useState } from "react";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null); // адрес кошелька или null

  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask не найден. Установи расширение MetaMask в браузер.");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (err) {
      console.error("Пользователь отклонил подключение:", err);
    }
  }

  function disconnectWallet() {
    setAccount(null);
  }

  // Форматируем адрес для отображения: 0x71C...3f9a
  function shortAddress(addr) {
    if (!addr) return "";
    return addr.slice(0, 5) + "..." + addr.slice(-4);
  }

  return (
    <WalletContext.Provider value={{ account, connectWallet, disconnectWallet, shortAddress }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}