import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "../context/WalletContext";
import products from "../data/products";

const statusConfig = {
  in:  { label: "В наличии", classes: "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400", dot: "bg-green-500" },
  low: { label: "Мало",      classes: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400", dot: "bg-yellow-400" },
  out: { label: "Нет",       classes: "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400", dot: "bg-red-500" },
};

const catLabel = {
  smartphone: "Смартфон",
  laptop: "Ноутбук / ПК",
  accessories: "Аксессуар",
};

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { account, connectWallet } = useWallet();
  const product = products.find((p) => p.id === Number(id));

  const [txStatus, setTxStatus] = useState(null);
  // null | "pending" | "success" | "error"

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <p className="text-gray-400">Товар не найден</p>
        <button onClick={() => navigate("/")} className="text-green-500 text-sm hover:underline">
          Вернуться в каталог
        </button>
      </div>
    );
  }

  const s = statusConfig[product.status];

  async function handleBuy() {
    if (!account) {
      await connectWallet();
      return;
    }
    if (product.status === "out") return;

    try {
      setTxStatus("pending");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Отправляем тестовую транзакцию на нулевой адрес
      const tx = await signer.sendTransaction({
        to: "0x0000000000000000000000000000000000000001",
        value: ethers.parseEther(product.price.toFixed(8)),
      });

      await tx.wait();
      setTxStatus("success");
    } catch (err) {
      console.error(err);
      setTxStatus("error");
    }
  }

  return (
    <main className="px-8 py-8 max-w-4xl mx-auto">
      {/* Назад */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-500 transition-colors mb-8"
      >
        <i className="ti ti-arrow-left" aria-hidden="true" />
        Назад в каталог
      </button>

      <div className="grid grid-cols-2 gap-8">
        {/* Левая колонка — изображение */}
        <div className="bg-white/70 dark:bg-[#1e212c]/80 backdrop-blur-md border border-white/90 dark:border-white/5 rounded-2xl flex items-center justify-center h-80 text-8xl">
          {product.emoji}
        </div>

        {/* Правая колонка — информация */}
        <div className="flex flex-col justify-center gap-4">
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-400 font-medium mb-1">
              {catLabel[product.cat]}
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {product.name}
            </h1>
          </div>

          {/* Цена */}
          <div className="bg-white/70 dark:bg-[#1e212c]/80 backdrop-blur-md border border-white/90 dark:border-white/5 rounded-xl p-4">
            <div className="text-xs text-gray-400 mb-1">Цена</div>
            <div className="font-mono text-2xl font-bold text-gray-900 dark:text-gray-100">
              {product.price.toFixed(5)}{" "}
              <span className="text-sm text-gray-400 font-normal">ETH</span>
            </div>
          </div>

          {/* Статус */}
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium w-fit ${s.classes}`}>
            <div className={`w-2 h-2 rounded-full ${s.dot}`} />
            {s.label}
          </div>

          {/* Кнопка покупки */}
          <button
            onClick={handleBuy}
            disabled={product.status === "out" || txStatus === "pending"}
            className={`w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              product.status === "out"
                ? "bg-gray-100 dark:bg-[#1e212c] text-gray-400 cursor-not-allowed"
                : txStatus === "pending"
                ? "bg-green-400 text-white cursor-wait"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {!account ? (
              <><i className="ti ti-wallet" aria-hidden="true" /> Подключить кошелёк</>
            ) : txStatus === "pending" ? (
              <><i className="ti ti-loader-2 animate-spin" aria-hidden="true" /> Ожидание транзакции...</>
            ) : product.status === "out" ? (
              "Нет в наличии"
            ) : (
              <><i className="ti ti-currency-ethereum" aria-hidden="true" /> Купить за {product.price.toFixed(5)} ETH</>
            )}
          </button>

          {/* Статус транзакции */}
          {txStatus === "success" && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-4 py-3 rounded-xl">
              <i className="ti ti-circle-check" aria-hidden="true" />
              Транзакция прошла успешно!
            </div>
          )}
          {txStatus === "error" && (
            <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-4 py-3 rounded-xl">
              <i className="ti ti-circle-x" aria-hidden="true" />
              Транзакция отклонена или произошла ошибка
            </div>
          )}
        </div>
      </div>
    </main>
  );
}