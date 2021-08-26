import React, { useEffect } from "react";
import { Modal, Body, CloseButton } from "./styled";
import { BackDrop } from "../BackDrop/styled";
import cross from "components/img/cross.svg";

interface IModal {
  onCloseButtonClick: (a: boolean) => void;
}

export const ModalWindow: React.FC<IModal> = (props) => {
  const { onCloseButtonClick, children } = props;
  const listener = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      onCloseButtonClick(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  });

  const closeHandler = () => {
    onCloseButtonClick(false);
  };

  return (
    <>
      <BackDrop />
      <Modal>
        <CloseButton onClick={closeHandler} data-testid="close">
          <img src={`${cross}`} alt="*" />
        </CloseButton>
        <Body data-testid="body">{children}</Body>
      </Modal>
    </>
  );
};
