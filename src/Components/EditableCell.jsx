import React, { useState } from "react";

function EditableCell({
  defaultValue,
  validationRegex,
  handleInputChange,
  errorMessage,
  type,
  checked,
}) {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState("");

  const handleBlur = () => {
    if (validationRegex.test(value)) {
      setError("");
      handleInputChange(type === "checkbox" ? value : parseFloat(value));
    } else {
      setError(errorMessage);
    }
  };

  return (
    <div className="relative">
      <input
        type={type}
        className=" p-1 text-center "
        value={value}
        onChange={(e) => {
          if (type === "checkbox") {
            setValue(e.target.checked);
          } else {
            setValue(e.target.value);
          }
        }}
        onBlur={handleBlur}
        defaultChecked={checked}
      />
      {error && (
        <span className="absolute mt-5 -ml-45 text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}

export default EditableCell;
