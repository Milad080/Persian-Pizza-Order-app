import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH">
      <button className="px-5 py-1.5 inline-block hover:bg-teal-400 hover:ring hover:ring-teal-400 hover:text-stone-900 transition-all duration-300 focus:outline-none focus:ring focus:bg-teal-500 focus:ring-teal-300 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-slate-300 sm:text-sm sm:font-light text-sm font-bold text-stone-700 border-2 border-teal-400 bg-green-300 rounded-md">
        افزودن به اولویت
      </button>
    </fetcher.Form>
  );
}
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

export default UpdateOrder;
