import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const showCartOverview = !location.pathname.startsWith("/order");
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-dvh">
      {isLoading && <Loader />}
      <Header />
      <main className="flex flex-col gap-3 mx-auto w-full max-w-4xl overflow-scroll no-scrollbar">
        <Outlet />
      </main>
      {showCartOverview && <CartOverview />}
    </div>
  );
}

export default AppLayout;
