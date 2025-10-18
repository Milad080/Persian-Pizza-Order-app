import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form
      className="text-xs sm:text-base font-[Markazi text]"
      onSubmit={handleSubmit}
    >
      <input
        placeholder="# آیدی سفارش را وارد کنید"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-[10px] py-1 px-2 ml-2 rounded-lg bg-yellow-100 placeholder:text-stone-400 w-40 focus:w-44 transition-all duration-300 sm:w-48 sm:focus:w-52 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
      />
    </form>
  );
}

export default SearchOrder;
