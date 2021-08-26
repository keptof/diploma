import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ModalWindow } from "../Modal";

describe("Modal", () => {
  const props = {
    onCloseButtonClick: jest.fn(),
  };

  it("should render element with children prop", () => {
    render(
      <ModalWindow onCloseButtonClick={props.onCloseButtonClick}>
        <div>привет</div>
      </ModalWindow>
    );
    const body = screen.getByTestId("body");
    expect(body.children.item(0)).toBeInTheDocument();
  });

  it("should call closeHandler() with props", () => {
    render(
      <ModalWindow onCloseButtonClick={props.onCloseButtonClick}>
        <div>привет</div>
      </ModalWindow>
    );
    fireEvent.click(screen.getByTestId("close"));
    expect(props.onCloseButtonClick).toHaveBeenCalledWith(false);
  });

  it("should close the ModalWindow on button click Escape", () => {
    render(
      <ModalWindow onCloseButtonClick={props.onCloseButtonClick}>
        <div>привет</div>
      </ModalWindow>
    );
    fireEvent.keyDown(window, { code: "Escape" });
    expect(props.onCloseButtonClick).toHaveBeenCalledWith(false);
  });
});
