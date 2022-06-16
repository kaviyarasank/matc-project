import React from "react";
import { IoMdColorPalette } from "react-icons/io";


export default function Color(props:any) {
  console.log("Color component rendered");
  return (
    <div>
      <IoMdColorPalette onClick={props.handleChange} className="colorChange"/>
      <h3>{props.color}</h3>
    </div>
  );
}
