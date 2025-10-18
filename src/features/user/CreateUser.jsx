import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateName } from "../user/userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="text-center text-sm font-medium sm:text-base md:text-lg"
    >
      <p>👋 خوش آمدید! برای شروع نام خود را وارد کنید :</p>
      <input
        type="text"
        className="input w-48 focus:w-52 text-center mt-5 mb-7 pt-1 pb-2 placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg sm:w-60 sm:focus:w-64 md:w-72 md:focus:w-[19rem]"
        placeholder="نام کامل خود را وارد کنید"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div>
          <button
            onClick={handleSubmit}
            className="inline-block text-xs bg-yellow-400 font-[vazirmatn] hover:bg-yellow-500 text-stone-800 rounded-lg transition-colors duration-300 focus:outline-none focus:ring focus:bg-yellow-500 focus:ring-yellow-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-slate-300 font-normal sm:text-sm sm:font-light py-3 px-3 sm:py-4 sm:px-4"
          >
            شروع سفارش
          </button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
