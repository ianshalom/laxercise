import React from "react";
import "./Image.css";

const Image = (props) => {
  return <img className={"image"} src={props.image} alt="" />;
};

export default Image;
