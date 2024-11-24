import React from "react";
import { Link } from "react-router-dom";

export default function Button({ to, children, ...props }) {
  return (
    <Link to={to} {...props}>
      <button type="button" className="btn btn-light">
        {children}
      </button>
    </Link>
  );
}
