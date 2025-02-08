import React, { useState } from "react";

function EditableCell({
  defaultValue,
  validationRegex,
  handleInputChange,
  errorMessage,
}) {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState("");

  const handleBlur = () => {
    if (validationRegex.test(value)) {
      setError("");
      handleInputChange(parseFloat(value));
    } else {
      setError(errorMessage);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="[all:unset] p-1 text-center"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
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
