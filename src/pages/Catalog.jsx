import { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

const categories = [
  { key: "all", label: "Все" },
  { key: "smartphone", label: "Смартфоны" },
  { key: "laptop", label: "Ноутбуки" },
  { key: "accessories", label: "Аксессуары" },
];

export default function Catalog() {
  const [activeCat, setActiveCat] = useState("all");

  const filtered =
    activeCat === "all" ? products : products.filter((p) => p.cat === activeCat);

  return (
    <main className="px-8 py-8">
      {/* Заголовок */}
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Каталог товаров
      </h1>
      <p className="text-sm text-gray-400 mt-1 mb-6">
        Покупки через криптовалюту · Тестовая сеть Sepolia
      </p>

      {/* Тулбар */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCat(c.key)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                activeCat === c.key
                  ? "bg-gray-900 dark:bg-green-500 text-white border-gray-900 dark:border-green-500"
                  : "bg-white dark:bg-[#1e212c] text-gray-500 dark:text-gray-400 border-gray-200 dark:border-[#2a2d38] hover:bg-gray-50 dark:hover:bg-[#16181f]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-400">{filtered.length} товаров</span>
      </div>

      {/* Сетка */}
      <div className="grid grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}