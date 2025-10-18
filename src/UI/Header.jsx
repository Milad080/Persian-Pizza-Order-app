import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
// import Username from "../features/user/Username";
function Header() {
  return (
    <header className="px-1 py-4 bg-yellow-400 font-[Alexandria] font-semibold text-2xl flex justify-between items-center">
      <Link to="/" className="text-yellow-800 flex align-center">
        <span className="text-md mt-1">🍕</span>
        پیتزا پیانو
      </Link>
      <SearchOrder />
      {/* <Username /> */}
    </header>
  );
}

export default Header;
