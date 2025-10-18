import { formatCurrency, persianDigit } from "../../utilities/helpers";
import UpdateItemQuantity from "./UpdateItemQuantity";
import DeleteItem from "./DeleteItem";
import { useSelector } from "react-redux";
import { getCurrentQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="px-1 py-2 sm:flex sm:justify-between sm:items-center">
      <p className="font-bold sm:text-lg">
        {persianDigit(quantity)}&times;
        <span className="font-normal sm:text-lg"> {name}</span>
      </p>
      <div className="flex justify-between items-center">
        <p className="sm:text-base">{formatCurrency(totalPrice)}</p>
        <div className="flex items-center justify-between gap-7 mr-10">
          <UpdateItemQuantity
            pizzaId={pizzaId}
            currentQuantity={currentQuantity}
          />
          <DeleteItem pizzaId={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
