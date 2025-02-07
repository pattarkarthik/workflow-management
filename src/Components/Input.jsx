import React from "react";

function Input({ label, type, name, register, defaultValue }) {
  return (
    <div className="flex flex-row justify-between items-center mb-8">
      <label className="w-1/4 text-white">{label}</label>
      <input
        className={`border-2 border-black bg-white w-3/4 rounded-md p-2 ${
          type === "checkbox" ? "h-4" : "h-10"
        }`}
        {...register(name, {
          valueAsNumber: type === "number",
        })}
        type={type}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default Input;
