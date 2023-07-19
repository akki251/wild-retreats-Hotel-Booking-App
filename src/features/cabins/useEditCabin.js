import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin as createEditCabinApi } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabinApi(newCabinData, id),

    onSuccess: () => {
      toast.success("cabin successfully Edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isEditing, editCabin };
}
