import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inline-block text-xs bg-yellow-400 hover:bg-yellow-500 hover:text-yellow-900 text-stone-800 rounded-lg transition-colors duration-300 focus:outline-none focus:ring focus:bg-yellow-500 focus:ring-yellow-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-slate-300 font-normal sm:text-sm sm:font-light";
  const styles = {
    primary: base + " font-[vazirmatn] py-3 px-3 sm:py-4 sm:px-4",
    position: base + " font-[vazirmatn] py-1.5 px-2 sm:py-2 md:py-2 md:px-4",
    small:
      base +
      " font-[vazirmatn] px-2.5 py-2.5 sm:py-3 sm:px-3.5 m-2 md:px-4 md:py-3.5",
    round:
      base +
      " px-3 py-1.5 text-yellow-800 font-semibold sm:px-3 sm:py-2 sm:text-lg sm:font-semibold rounded-full",
    secondary:
      "inline-block text-xs border-2 border-stone-300 font-[vazirmatn] hover:bg-stone-300 hover:text-stone-800 text-stone-500 rounded-lg transition-colors duration-300 focus:outline-none focus:ring focus:bg-stone-300 focus:ring-stone-300 focus:text-stone-800 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-slate-300 py-3 px-3 sm:py-4 sm:px-4 font-normal sm:text-sm sm:font-light",
  };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button onClick={onClick} className={styles[type]} disabled={disabled}>
        {children}
      </button>
    );
  }

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
