import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

export function AlertDialog(props) {
  const { txt, open, handleClose } = props;
  return (
    <MDBModal isOpen={open} toggle={handleClose}>
      {this.props.header && (
        <MDBModalHeader toggle={handleClose}>MDBModal title</MDBModalHeader>
      )}
      <MDBModalBody>
        <p> {txt} </p>
      </MDBModalBody>
    </MDBModal>
  );
}
