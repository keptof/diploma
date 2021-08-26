import React from "react";
import ReactDom from "react-dom";

export const withPortal = (Component: React.FC) => (props: any) =>
  ReactDom.createPortal(<Component {...props} />, document.body);
