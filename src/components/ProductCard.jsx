import { useNavigate } from "react-router-dom";

const statusConfig = {
  in:  { label: "В наличии", dot: "bg-green-500",  badge: "bg-green-50  dark:bg-green-500/10  text-green-700  dark:text-green-400" },
  low: { label: "Мало",      dot: "bg-yellow-400", badge: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" },
  out: { label: "Нет",       dot: "bg-red-500",    badge: "bg-red-50    dark:bg-red-500/10    text-red-700    dark:text-red-400" },
};

const catLabel = {
  smartphone: "Смартфон",
  laptop: "Ноутбук / ПК",
  accessories: "Аксессуар",
};

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const s = statusConfig[product.status];

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white/70 dark:bg-[#1e212c]/80 backdrop-blur-md border border-white/90 dark:border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
    >
      {/* Картинка */}
      <div className="bg-gray-100 dark:bg-[#16181f] h-40 flex items-center justify-center text-5xl">
        {product.emoji}
      </div>

      {/* Тело карточки */}
      <div className="p-4">
        <div className="text-[11px] uppercase tracking-wide text-gray-400 font-medium mb-1">
          {catLabel[product.cat]}
        </div>
        <div className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {product.name}
        </div>
        <div className="font-mono text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
          {product.price.toFixed(5)}{" "}
          <span className="text-xs text-gray-400 font-normal">ETH</span>
        </div>

        {/* Футер */}
        <div className="flex items-center gap-2">
          <div className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold ${s.badge}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {s.label}
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 flex-shrink-0 rounded-lg border border-gray-200 dark:border-[#2a2d38] bg-white dark:bg-[#16181f] flex items-center justify-center text-gray-400 cursor-pointer hover:border-green-500 transition-colors text-sm"
          >
            ···
          </div>
        </div>
      </div>
    </div>
  );
}