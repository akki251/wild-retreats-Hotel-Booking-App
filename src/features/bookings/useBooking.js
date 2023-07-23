import { useQuery } from "@tanstack/react-query";
import { getBooking as getBookingApi } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export default function useBooking() {
  /// bookingId is named on the route in please check routing configuration
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBookingApi(bookingId),
    retry: false,
  });

  return { isLoading, booking };
}
