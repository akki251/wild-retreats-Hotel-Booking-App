import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export default function useUser() {
  const {
    data: user,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  console.log({ isLoading, isFetching });
  return {
    user,
    isLoading,
    isAuthenticated: user?.role === "authenticated",
  };
}
