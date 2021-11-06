import React, { useState } from "react";

const CustomInput = ({ label, value, setValue, type ="text"}) => {
  return (
    <div style={{ marginTop: 100, maxWidth: 350, margin: "auto" }}>
      <label>{label}:</label>
      <input
        style={{ width: "100%" }}
        value={value}
        type={type}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
export default CustomInput;