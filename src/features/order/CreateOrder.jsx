import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import Store from "../../utilities/store";
import Button from "../../UI/Button";
import { formatCurrency } from "../../utilities/helpers";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const dispatch = useDispatch();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? (totalCartPrice * 0.2) / 8 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 pb-2 font-[vazirmatn] sm:p-8">
      <h2 className="font-semibold text-xl sm:text-2xl mt-3 mb-4 sm:m-0 sm:mb-8">
        برای تسریع در فرآیند ارسال و تحویل سفارش
        <span className="block sm:inline"> لطفا فرم زیر را تکمیل کنید :</span>
      </h2>

      <Form method="POST" action="/order/new">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:gap-10">
          <label className="text-base font-medium mr-1 mb-2 sm:mb-0 sm:font-normal sm:text-lg sm:basis-28">
            نام
          </label>
          <input
            type="text"
            name="customer"
            required
            defaultValue={username}
            className="input grow"
          />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:gap-10">
          <label className="text-base font-medium mr-1 mb-2 sm:mb-0 sm:font-normal sm:text-lg sm:basis-28">
            شماره تماس
          </label>
          <div className="grow">
            <input
              type="tel"
              dir="rtl"
              name="phone"
              required
              className="input w-full"
            />
          </div>
        </div>
        <div className="mb-4 sm:mr-[7.4rem]">
          {formErrors?.phone && (
            <p className="mt-2 text-red-700 bg-red-100 rounded-md text-xs sm: py-2 pr-3">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="relative mb-4 flex flex-col sm:flex-row sm:items-center sm:gap-10">
          <label className="text-base font-medium mr-1 mb-2 sm:mb-0 sm:font-normal sm:text-lg sm:basis-28">
            آدرس
          </label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              defaultValue={address}
              className="input w-full"
            />
            {addressStatus === "error" && (
              <p className="mt-2 text-red-700 bg-red-100 rounded-md text-xs sm: py-2 pr-3">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitide && !position.longitude && (
            <span className="absolute left-0 top-8 sm:top-0 z-50">
              <Button
                type="position"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                جستجوی موقعیت
              </Button>
            </span>
          )}
        </div>

        <div className="bg-yellow-300 border-yellow-200 border text-stone-900 py-5 text-sm px-5 rounded-lg flex flex-col gap-3">
          <div className="mb-4 flex items-center sm:text-lg">
            <input
              className="h-5 w-5 accent-yellow-900 focus:outline-none cursor-pointer sm:size-5 "
              type="checkbox"
              name="priority"
              id="priority"
              value={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label htmlFor="priority" className="mr-2">
              آیا میخواهید سفارش شما با اولویت بیشتری حاضر شود؟
            </label>
          </div>
          <p>
            <span className="font-medium text-base">هزینه اولویت بندی : </span>
            {withPriority ? `${formatCurrency(priorityPrice)}` : "  --- "}
          </p>
          <p>
            <span className="font-medium text-base"> قیمت پیتزا : </span>
            {formatCurrency(totalCartPrice)}
          </p>
          <p>
            <span className="font-bold text-base">جمع قابل پرداخت : </span>
            {formatCurrency(totalPrice)}
          </p>
          <div className="sm:mt-12">
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <input
              type="hidden"
              name="position"
              value={
                position.latitide && position.longitude
                  ? `${position.latitide},${position.longitude}`
                  : ""
              }
            ></input>
            <button
              className="inline-block bg-yellow-900 text-stone-100 hover:bg-yellow-950 hover:px-12 sm:hover:px-16 hover:text-yellow-100 rounded-lg transition-all duration-300 focus:outline-none focus:ring focus:bg-yellow-950  focus:ring-yellow-900 focus:text-yellow-100 focus:px-12 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-stone-600 font-semibold sm:text-base sm:font-bold font-[Vazirmatn] py-3 px-8 sm:py-4 sm:px-12"
              disabled={isSubmitting || isLoadingAddress}
              type="primary"
            >
              {isSubmitting ? "در حال ثبت سفارش" : "ثبت سفارش"}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "لطفا یک شماره تلفن صحیح وارد کنید";

  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  Store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
