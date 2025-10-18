// Test ID: IIDSAT
// test ID: 9IWCDQ
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilities/helpers";
import OrderItem from "../order/OrderItem";
import { translateTextSync } from "../../services/apiTranslate";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";
function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher]
  );

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const translatedCart = order.cart.map((item) => ({
    ...item,
    name: translateTextSync(item.name),
  }));
  return (
    <div className="px-3 py-4 font-[Vazirmatn]">
      <div className="flex items-center justify-between flex-wrap gap-5">
        <h2 className="text-2xl font-semibold block">وضعیت سفارش {id}# </h2>
      </div>
      <div className="flex gap-2 mt-3">
        {status === "delivered" ? (
          <p className="text-sm font-bold text-stone-700 bg-green-300 py-1.5 px-1.5 rounded-md">
            تحویل شده
          </p>
        ) : (
          <p className="text-sm font-bold text-stone-700 bg-red-300 py-1.5 px-1.5 rounded-md">
            در حال آماده سازی ...
          </p>
        )}
        {priority ? (
          <p className="text-sm font-bold text-stone-700 bg-teal-300 py-1.5 px-1.5 rounded-md">
            دارای اولویت آماده سازی
          </p>
        ) : (
          status === "preparing" && <UpdateOrder />
        )}
      </div>
      <div className="bg-yellow-100 pb-6 pt-2 px-3 flex flex-col gap-2 rounded-t-md mt-6">
        <p className="mt-1 text-stone-900 font-semibold">
          <span>وضعیت سفارش : </span>
          {status === "preparing" ? " در حال آماده سازی" : "تحویل داده شده ✅ "}
        </p>

        <p className="text-stone-600">
          {deliveryIn >= 0
            ? `فقط ${calcMinutesLeft(estimatedDelivery)} دقیقه باقی مانده 😃`
            : ""}
        </p>
        <p className="text-sm text-yellow-900">
          (زمان تخمین زده شده : {formatDate(estimatedDelivery)})
        </p>
      </div>
      <div className="bg-yellow-100 py-2 px-3">
        <ul className="divide-stone-400 divide-y border-y mb-2 border-stone-400">
          {translatedCart.map((item) => (
            <OrderItem
              item={item}
              key={item.name}
              isLoadingIngredients={fetcher.state === "loading"}
              ingredients={
                fetcher.data?.find((el) => el.id === item.pizzaId)
                  .ingredients ?? []
              }
            />
          ))}
        </ul>
      </div>
      <div className="py-3 px-3 bg-yellow-100 flex flex-col gap-3 rounded-b-md">
        <p className="font-medium text-stone-800">
          قیمت پیتزا : {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="font-medium text-stone-800">
            هزینه اولویت بندی : {formatCurrency(priorityPrice / 8)}
          </p>
        )}
        <p className="text-lg font-bold text-stone-900">
          قابل پرداخت : {formatCurrency(orderPrice + priorityPrice / 8)}
        </p>
      </div>
    </div>
  );
}
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
