import { useDispatch } from "react-redux";
import Button from "../../UI/Button";
import { deleteItem } from "./cartSlice";

function DeleteItem({ pizzaId }) {
  const Dispatch = useDispatch();
  return (
    <div>
      <Button onClick={() => Dispatch(deleteItem(pizzaId))} type="small">
        حذف
      </Button>
    </div>
  );
}

export default DeleteItem;
