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

  // SORT
  const sortByRow = searchParams.get("sortBy") || "start_date-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    // this is dependency array for queryFn
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookingsApi({ filter, sortBy }),
  });

  return { isLoading, bookings };
}
