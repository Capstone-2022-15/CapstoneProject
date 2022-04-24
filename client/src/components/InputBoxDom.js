import React from "react";
import PropTypes from "prop-types";
import "../css/InputBoxDom.module.css";

function InputBox({ name, id, type }) {
  return (
    <div>
      <div>{name}</div>
      <input id={id} type={type} />
    </div>
  );
}

InputBox.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default InputBox;
