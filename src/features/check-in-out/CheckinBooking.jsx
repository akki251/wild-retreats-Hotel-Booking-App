import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import useCheckIn from "./useCheckin";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/Checkbox";
import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import { useEffect } from "react";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useBooking();

  useEffect(() => {
    setConfirmPaid(booking?.is_paid ?? false);
  }, [booking]);
  const moveBack = useMoveBack();

  const { checkIn, isCheckingIn } = useCheckIn();
  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    total_price,
    num_guests,
    has_breakfast,
    num_nights,
  } = booking;

  function handleCheckin() {
    if (!confirmPaid) return;
    checkIn(bookingId);
  }

  return (
    <StyledDiv>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.full_name} has paid the full amount of{" "}
          {formatCurrency(total_price)}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </StyledDiv>
  );
}

export default CheckinBooking;
