import { css, styled } from "styled-components";

const Row = styled.div`
  display: flex;
  ${({ type }) =>
    type === "horizontal"
      ? css`
          justify-content: space-between;
          align-items: center;
        `
      : css`
          flex-direction: column;
          gap: 1.6rem;
        `}
`;
Row.defaultProps = {
  type: "vertical",
};

export default Row;
