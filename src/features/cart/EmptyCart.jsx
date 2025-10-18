import LinkButton from "../../UI/LinkButton";

function EmptyCart() {
  return (
    <div className="p-7 pt-3">
      <LinkButton to="/menu">&larr; بازگشت به منو</LinkButton>

      <p className="mt-8 font-medium text-xl flex items-center justify-center gap-1 sm:text-2xl">
        سبد خرید شما خالی است
        <span className="text-xs sm:text-base">❌</span>
      </p>
    </div>
  );
}

export default EmptyCart;
