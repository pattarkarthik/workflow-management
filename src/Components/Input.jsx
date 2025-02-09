import React from "react";
import { ErrorMessage } from "@hookform/error-message";

function Input({
  label,
  type,
  name,
  register,
  errors = {},
  validationRegex,
  errorMessage,
}) {
  return (
    <div className="flex flex-col mb-4">
      <div className="flex flex-row justify-between align-middle">
        <label className="text-black  w-1/3 text-xs m-auto">{label}</label>
        <input
          className={`border-1 border-gray-400 bg-white rounded-md p-2 w-2/3 text-gray-700 text-sm ${
            type === "checkbox" ? "h-4 checked:bg-amber-500" : "h-8"
          }`}
          {...register(name, {
            ...(type === "text" && {
              pattern: {
                value: validationRegex,
                message: errorMessage,
              },
            }),
          })}
          type={type}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className="text-red-500 text-xs">{message}</span>
        )}
      />
    </div>
  );
}

export default Input;
