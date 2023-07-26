import styled, { keyframes } from "styled-components";
import { HiMiniArrowPath  } from "react-icons/hi2";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(HiMiniArrowPath)`
  width: 2.4rem;
  height: 2.4rem;
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
