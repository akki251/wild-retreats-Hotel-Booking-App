import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export default function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isHacked = user?.isHacked;
  return {
    isHacked,
    user,
    isLoading,
    isAuthenticated: user?.role === "authenticated",
  };
}
