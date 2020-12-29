import React, { FC } from "react";
import ReactModal from "react-modal";
import OutsideClickHandler from "react-outside-click-handler";

const customStyles = {
  content: {
    bottom: "auto",
    borderRadius: 10,
    left: "50%",
    marginRight: "-50%",
    padding: 0,
    right: "auto",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
};

type Props = {
  onOutsideClick?: () => void;
};

export const Modal: FC<Props> = ({ onOutsideClick, children }) => {
  return (
    <ReactModal isOpen style={customStyles}>
      <OutsideClickHandler onOutsideClick={onOutsideClick || (() => null)}>{children}</OutsideClickHandler>
    </ReactModal>
  );
};
