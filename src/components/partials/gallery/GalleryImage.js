import React, { useState } from "react";
import { Modal } from "reactstrap";

const ImageContainer = ({ img }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <a
      className="gallery-image popup-image"
      onClick={(ev) => {
        ev.preventDefault();
        toggle();
      }}
      href="#gallery"
    >
      <img className="w-100 rounded" style={{height:'200px'}} src={img} alt="" />
      <Modal isOpen={open} toggle={toggle} size="xl">
        <button type="button" className="mfp-close" onClick={toggle}>
          ×
        </button>
        <img className="w-100 rounded-top" style={{ height: "60%" }} src={img} alt="" />
      </Modal>
    </a>
  );
};

export default ImageContainer;
