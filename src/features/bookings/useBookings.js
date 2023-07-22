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

  // PAGE

  const page = !searchParams.get("page") ? 1 : +searchParams.get("page");

  const { isLoading, data, error } = useQuery({
    // this is dependency array for queryFn
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookingsApi({ filter, sortBy, page }),
  });

  const bookings = data?.data;
  const count = data?.count;

  return { isLoading, bookings, count };
}
