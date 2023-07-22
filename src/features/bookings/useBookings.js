import { useQuery } from "@tanstack/react-query";
import { getBookings as getBookingsApi } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    // this is dependency array for queryFn
    queryKey: ["bookings", filter],
    queryFn: () => getBookingsApi({ filter }),
  });

  return { isLoading, bookings };
}
