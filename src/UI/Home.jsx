import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="px-4 text-center flex flex-col gap-20">
      <h1 className="text-3xl font-semibold mt-8 sm:text- md:text-4xl md:mt-8">
        پیتزای با کیفیت
        <p className="text-yellow-400 mt-3">از دل فر تا منزل شما</p>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <div className="">
          <Button to="/menu" type="primary">
            بازگشت به منو سفارش
          </Button>
        </div>
      )}
    </div>
  );
}

export default Home;
