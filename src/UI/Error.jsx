import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();
  return (
    <div className="text-stone-800 bg-yellow-200 h-dvh flex flex-col items-start gap-3 py-16 px-6">
      <h1 className="text-2xl sm:text-3xl">
        خطایی رخ داده است <span className="text-sm sm:text-base">😢</span>
      </h1>
      <p className="text-lg sm:text-xl mb-8">{error.data || error.message}</p>
      <LinkButton to="-1">&larr; بازگشتن به صفحه قبل</LinkButton>
    </div>
  );
}

export default Error;
