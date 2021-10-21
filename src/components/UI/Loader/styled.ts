import styled from "styled-components";

export const LoaderWrapper = styled.div`
  background: none repeat scroll 0 0 #000;
  opacity: 0.5;
  height: 100%;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
`;

export const CustomLoader = styled.div`
  animation: animate 1.5s linear infinite;
  clip: rect(0, 80px, 80px, 40px);
  height: 80px;
  width: 80px;
  position: absolute;
  left: calc(50% - 40px);
  top: calc(50% - 40px);

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(220deg);
    }
  }

  &:after {
    animation: animate2 1.5s ease-in-out infinite;
    clip: rect(0, 80px, 80px, 40px);
    content: "";
    border-radius: 50%;
    height: 80px;
    width: 80px;
    position: absolute;
  }

  @keyframes animate2 {
    0% {
      box-shadow: inset #b3dfd8 0 0 0 17px;
      transform: rotate(-140deg);
    }
    50% {
      box-shadow: inset #b3dfd8 0 0 0 2px;
    }
    100% {
      box-shadow: inset #b3dfd8 0 0 0 17px;
      transform: rotate(140deg);
    }
  }
`;
