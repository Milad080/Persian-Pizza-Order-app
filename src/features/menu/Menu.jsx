import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import { translatePizza } from "../../services/apiTranslate";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="divide-y-2 divide-stone-200">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  try {
    const menu = await getMenu();

    const translatedItems = await Promise.all(
      menu.map((pizza) => translatePizza(pizza))
    );

    return translatedItems;
  } catch (error) {
    console.error("خطا در ترجمه منو:", error);
    const menu = await getMenu();
    return menu;
  }
}
export default Menu;
