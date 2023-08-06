import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export default function   useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
        // for erasing data for the logged in user
      queryClient.removeQueries();
      // replace means erasing all back routes from which the user came
      navigate("/login", {
        replace: true,
      });
    },
  });

  return { logout, isLoading };
}
