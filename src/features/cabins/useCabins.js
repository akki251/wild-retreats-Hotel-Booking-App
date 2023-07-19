import { useQuery } from "@tanstack/react-query";
import { getCabins as getCabinsApi } from "../../services/apiCabins";

export default function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabinsApi,
  });

  return { isLoading, cabins };
}
