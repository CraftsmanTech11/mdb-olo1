import React from "react";
import { MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";

export function AlertDialog(props) {
  const { txt, open, handleClose } = props;
  return (
    <MDBModal isOpen={open} toggle={handleClose}>
      {props.header && (
        <MDBModalHeader toggle={handleClose}>MDBModal title</MDBModalHeader>
      )}
      <MDBModalBody>
        <p> {txt} </p>
      </MDBModalBody>
    </MDBModal>
  );
}
