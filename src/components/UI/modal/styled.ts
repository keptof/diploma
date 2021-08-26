import styled from "styled-components";

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  min-width: 300px;
  padding: 20px 22px;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid #7b542d;
  border-radius: 15px;
  background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55));
`;

export const Body = styled.div``;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const CloseButton = styled.button`
  padding: 0;
  margin-left: 4px;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  position: absolute;
  top: 12px;
  right: 12px;

  img {
    width: 16px;
    height: 16px;
    filter: invert(73%) sepia(8%) saturate(556%) hue-rotate(345deg)
      brightness(89%) contrast(89%);
  }
`;
