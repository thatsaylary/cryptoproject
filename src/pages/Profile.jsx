import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../context/WalletContext";

export default function Profile() {
  const { account, shortAddress, connectWallet, disconnectWallet } = useWallet();
  const navigate = useNavigate();
  const [txList, setTxList] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "ZTBTWH6BNP88D1X1J6EBTIUUB3P95JQ23V";

  useEffect(() => {
    if (!account) return;
    fetchTransactions();
  }, [account]);

   async function fetchTransactions() {
    if (!account) return;
    setLoading(true);
    try {
      const url = `https://api.etherscan.io/v2/api?chainid=11155111&module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&sort=desc&apikey=${API_KEY}`;
      console.log("Fetching:", url);
      const res = await fetch(url);
      const data = await res.json();
      console.log("Etherscan response:", data);
      if (data.status === "1") {
        setTxList(data.result.slice(0, 10));
      } else {
        setTxList([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatEth(wei) {
    return (Number(wei) / 1e18).toFixed(6);
  }

  if (!account) {
    return (
      <main className="px-8 py-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Профиль
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Подключите кошелёк чтобы увидеть историю транзакций
        </p>
        <button
          onClick={connectWallet}
          className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          <i className="ti ti-wallet" aria-hidden="true" />
          Подключить MetaMask
        </button>
      </main>
    );
  }

  return (
    <main className="px-8 py-8 max-w-2xl mx-auto">
      {/* Заголовок */}
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Профиль
      </h1>

      {/* Карточка кошелька */}
      <div className="bg-white/70 dark:bg-[#1e212c]/80 backdrop-blur-md border border-white/90 dark:border-white/5 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Адрес кошелька
            </div>
            <div className="font-mono text-sm font-bold text-gray-900 dark:text-gray-100">
              {account}
            </div>
            <div className="text-xs text-gray-400 mt-1">Сеть: Sepolia Testnet</div>
          </div>
          <button
            onClick={disconnectWallet}
            className="text-xs text-red-400 hover:text-red-500 border border-red-200 dark:border-red-500/30 px-3 py-2 rounded-lg transition-colors"
          >
            Отключить
          </button>
        </div>
      </div>

{/* История транзакций */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          История транзакций
        </h2>
        <button
          onClick={fetchTransactions}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-green-500 transition-colors"
        >
          <i className="ti ti-refresh" aria-hidden="true" />
          Обновить
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <i className="ti ti-loader-2 animate-spin" aria-hidden="true" />
          Загружаем транзакции...
        </div>
      ) : txList.length === 0 ? (
        <div className="text-sm text-gray-400 bg-white/70 dark:bg-[#1e212c]/80 border border-white/90 dark:border-white/5 rounded-2xl p-6 text-center">
          Транзакций пока нет. Попробуй купить что-нибудь!
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {txList.map((tx) => (
            <div
              key={tx.hash}
              className="bg-white/70 dark:bg-[#1e212c]/80 backdrop-blur-md border border-white/90 dark:border-white/5 rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                    tx.from.toLowerCase() === account.toLowerCase()
                      ? "bg-red-50 dark:bg-red-500/10 text-red-500"
                      : "bg-green-50 dark:bg-green-500/10 text-green-500"
                  }`}
                >
                  <i
                    className={`ti ${
                      tx.from.toLowerCase() === account.toLowerCase()
                        ? "ti-arrow-up"
                        : "ti-arrow-down"
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {tx.from.toLowerCase() === account.toLowerCase()
                      ? "Отправлено"
                      : "Получено"}
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    {shortAddress(tx.hash)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-sm font-mono font-bold ${
                    tx.from.toLowerCase() === account.toLowerCase()
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {tx.from.toLowerCase() === account.toLowerCase() ? "−" : "+"}
                  {formatEth(tx.value)} ETH
                </div>
                <div className="text-xs text-gray-400">
                  {formatDate(tx.timeStamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ссылка на Etherscan */}
      {txList.length > 0 && (
        <a
          href={`https://sepolia.etherscan.io/address/${account}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-sm text-green-500 hover:underline mt-4"
        >
          Смотреть все на Etherscan
          <i className="ti ti-external-link text-xs" aria-hidden="true" />
        </a>
      )}
    </main>
  );
}