import React from "react";
import { updateBooking } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
        is_paid: true,
      }),

    onSuccess: (data) => {
      toast.success(`Booking # ${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: (error) => toast.error(error.message),
  });

  return { checkIn, isCheckingIn };
}
