import React from "react";

export default function MyRadio(props) {
  const { onChange, value, id, onClick } = props;
  return (
    <input
      className="form-check-input mx-2"
      type="radio"
      name="Radio"
      onChange={onChange}
      value={value}
      id={id}
      onClick={onClick}
    />
  );
}
