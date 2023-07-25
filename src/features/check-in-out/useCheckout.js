import React from "react";
import { updateBooking } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking # ${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: (error) => toast.error(error.message),
  });

  return { checkOut, isCheckingOut };
}
