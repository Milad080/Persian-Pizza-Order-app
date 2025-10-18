import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();

  if (to === "-1")
    return (
      <button
        className="text-lg text-blue-500 hover:text-blue-800 transition-all duration-300 hover:px-2 sm:text-2xl"
        onClick={() => navigate(-1)}
      >
        {children}
      </button>
    );
  return (
    <Link
      to={to}
      className="text-lg sm:text-xl text-blue-500 hover:text-blue-800 transition-all duration-300 hover:rounded-sm hover:px-2 hover:py-2"
    >
      {children}
    </Link>
  );
}

export default LinkButton;
