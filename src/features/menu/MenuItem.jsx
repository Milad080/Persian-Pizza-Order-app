import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";
import { formatCurrency } from "../../utilities/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }
  return (
    <li className="flex gap-4 py-1 px-1 font-[Vazirmatn]">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 sm:h-28 w-44 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col flex-grow pt-0.5">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-stone-500 mt-2">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-base font-[Vazirmatn]">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-base text-stone-400 font-[Markazi Text]">
              تمام شد
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-4">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type="small">
              افزودن به سبد خرید
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
