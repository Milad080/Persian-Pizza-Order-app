import { formatCurrency, persianDigit } from "../../utilities/helpers";
import { translateTextSync } from "../../services/apiTranslate";
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  return (
    <li className="py-2">
      <div className=" flex items-center justify-between gap-4 text-sm text-slate-700">
        <p className="text-base">
          <span className="font-bold ">{persianDigit(quantity)}&times;</span>
          {translateTextSync(name)}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-xs text-stone-500">
        {!isLoadingIngredients && ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
