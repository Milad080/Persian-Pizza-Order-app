import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((state) => state.user.username);
  if (!username) return;
  return (
    <div className="hidden font-semibold font-[vazirmatn] text-yellow-800 text-sm sm:block">
      {username}
    </div>
  );
}

export default Username;
