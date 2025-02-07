import React, { useState } from "react";
import Button from "./Button";

function Select({ label, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (type) => {
    if (type) {
      setSelectedValue(type);
      onChange(type);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <Button handleClick={handleToggle} label={label} />

      {isOpen && (
        <div className="absolute mt-1 w-48 ml-2 rounded-md bg-gray-200">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <a
                key={option.type}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuItemClick(option.type);
                }}
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Select;
