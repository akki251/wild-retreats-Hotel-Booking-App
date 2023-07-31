import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import useCheckout from "../../features/check-in-out/useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckout();

  return (
    <Button
      disabled={isCheckingOut}
      onClick={() => checkOut(bookingId)}
      variation="primary"
      size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
