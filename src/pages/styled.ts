import styled from "styled-components";
import mainImg from "../components/img/kofe.jpg";
import autImg from "../components/img/andrew-neel-cckf4TsHAuw-unsplash.jpg";

export const ContainerForBtnAdd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  color: aliceblue;
  filter: invert(73%) sepia(8%) saturate(556%) hue-rotate(345deg)
    brightness(89%) contrast(149%);
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  height: 60px;
  color: #ffffffb2;
  border-radius: 12px;
  background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55));
`;

export const TitleStrong = styled.span`
  font-size: 34px;
  color: #b1a296;
`;

export const Main = styled.div`
  height: 100vh;
  background-size: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
    url(${`${mainImg}`});
  color: white;
`;

export const Form = styled.form`
  label {
    margin-right: 12px;
  }
  color: white;
`;

export const Background = styled.div`
  height: 100vh;
  background-size: cover;
  background-image: url(${`${autImg}`});
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    padding: 12px;
  }
`;

export const P = styled.p`
  color: white;
`;
