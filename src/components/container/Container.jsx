import React from "react";

function Container({ children }) {
  return (
    <div className="w-full min-h-screen  max-w-7xl mx-auto px-4">
      {children}
    </div>
  );
}

export default Container;
