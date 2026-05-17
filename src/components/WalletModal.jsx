import { useWallet } from "../context/WalletContext";

export default function WalletModal({ onClose }) {
  const { connectWallet } = useWallet();

  async function handleConnect() {
    await connectWallet();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#16181f] border border-gray-200 dark:border-[#2a2d38] rounded-2xl p-8 w-[400px] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Подключить кошелёк
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Выберите способ подключения для покупок в ETH
        </p>

        <div className="flex flex-col gap-3">
          {/* MetaMask — реальное подключение */}
          <div
            onClick={handleConnect}
            className="flex items-center gap-3 p-4 border border-gray-200 dark:border-[#2a2d38] rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1e212c] transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-2xl">
              🦊
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                MetaMask
              </div>
              <div className="text-xs text-gray-400">
                Самый популярный браузерный кошелёк
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
}