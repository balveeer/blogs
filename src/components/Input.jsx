import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, limit, outOf = 255, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full relative">
      {label && (
        <span className="flex justify-between w-full px-2">
          <label className="inline-block mb-1 pl-1" htmlFor={id}>
            {label}
          </label>
        </span>
      )}
      <input
        type={type}
        className={`w-full px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 peer focus:ring-2 pr-12 ${className} `}
        ref={ref}
        id={id}
        {...props}
      />
      {limit ? (
        <span className="hidden peer-focus:inline-block absolute right-0 rounded-3xl font-bold text-xs bg-green-600/80 text-white m-2 p-2">
          {limit}/{outOf}
        </span>
      ) : (
        ""
      )}
    </div>
  );
});

export default Input;
