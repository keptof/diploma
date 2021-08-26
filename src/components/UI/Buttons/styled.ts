import styled from "styled-components";

interface Btn {
  disabled?: boolean;
}

export const CustomBtn = styled.button<Btn>`
  width: 100px;
  height: 30px;
  border-radius: 12px;
  color: #d7ccc8;
  background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65));

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.55;
    `}
`;
