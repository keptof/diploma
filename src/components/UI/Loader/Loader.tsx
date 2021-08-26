import React from "react";
import { CustomLoader, LoaderWrapper } from "./styled";
import { BackDrop } from "../BackDrop/styled";
import { withPortal } from "hocs/withPortal";

export const LoaderComponent = () => (
  <>
    <BackDrop />
    <LoaderWrapper>
      <CustomLoader />
    </LoaderWrapper>
  </>
);

export const Loader = withPortal(LoaderComponent);
