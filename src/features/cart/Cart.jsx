import LinkButton from "../../UI/LinkButton";
import Button from "../../UI/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getUsername } from "../user/userSlice";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "../cart/EmptyCart";
function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUsername);
  const dispatch = useDispatch();
  function handleDeleteAll() {
    dispatch(clearCart());
  }
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="mt-1 py-2 px-3 sm:mt-3 sm:py-3 sm:px-6">
      <LinkButton to="/menu">&larr; بازگشت به منو</LinkButton>

      <h2 className="mt-4 mb-5 font-medium text-xl sm:mt-10 sm:text-[1.5rem]">
        <span className="font-bold">{username} </span>
        سبد خرید شما :
      </h2>
      <ul className="divide-y divide-stone-200 text-sm border-b font-light font-[Vazirmatn]">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 pb-3 sm:mt-16 flex gap-2">
        <Button to="/order/new" type="primary">
          ادامه سفارش
        </Button>
        <Button onClick={handleDeleteAll} type="secondary">
          پاک کردن سبد خرید
        </Button>
      </div>
    </div>
  );
}

export default Cart;
