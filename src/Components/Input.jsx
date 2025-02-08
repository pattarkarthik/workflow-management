import React from "react";
import { ErrorMessage } from "@hookform/error-message";

function Input({ label, type, name, register, errors = {} }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-white mb-1">{label}</label>
      <input
        className={`border-2 border-black bg-white rounded-md p-2 ${
          type === "checkbox" ? "h-4" : "h-10"
        }`}
        {...register(name, {
          valueAsNumber: type === "number",
          pattern: {
            value: /^-?\d+(\.\d+)?$/,
            message: "Only numbers are allowed",
          },
        })}
        type={type}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className="text-red-500">{message}</span>
        )}
      />
    </div>
  );
}

export default Input;
