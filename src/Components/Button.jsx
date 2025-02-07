import React from "react";

function Button({ label, handleClick, type }) {
  return (
    <button
      {...(type ? { type } : { onClick: handleClick })}
      className="relative px-4 py-2 text-sm font-medium text-white  rounded-lg focus:outline-none focus: bg-orange-400 hover:bg-orange-500"
    >
      {label}
    </button>
  );
}

export default Button;
