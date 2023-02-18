import React from "react";

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="37"
      height="37"
      fill="none"
      viewBox="0 0 37 37"
    >
      <circle
        cx="16.5"
        cy="16.5"
        r="14.5"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="4"
        d="M28.828 28L35 34.172"
      ></path>
    </svg>
  );
}

export default SearchIcon;

