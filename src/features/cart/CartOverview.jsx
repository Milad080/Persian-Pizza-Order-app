import { Link } from "react-router-dom";
import { formatCurrency, persianDigit } from "../../utilities/helpers";
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (!totalCartQuantity) return null;
  return (
    <div className="bg-yellow-950 text-stone-200 p-4 flex justify-between font-medium font-[Vazirmatn]">
      <p className="text-stone-300 gap-2 flex ">
        <span>{persianDigit(totalCartQuantity)} عدد پیتزا</span>
        <span className="font-light">{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link
        to="/cart"
        className="text-yellow-200 text-base font-normal hover:text-yellow-500 transition-all duration-300 sm:text-lg"
      >
        سبد خرید &larr;
      </Link>
    </div>
  );
}

export default CartOverview;
