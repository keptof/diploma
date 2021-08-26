import React from "react";
import { Link } from "react-router-dom";
import { CustomBtn } from "components/UI/Buttons/styled";
import { Background } from "./styled";

export const PagesNotFound = () => (
  <Background>
    <p>Pages not found</p>
    <Link to="/todos">
      <CustomBtn> Go Back</CustomBtn>
    </Link>
  </Background>
);
