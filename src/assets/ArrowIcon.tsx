import React from "react";

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="16"
      fill="none"
      viewBox="0 0 24 16"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M2.5 2l15 12 15-12"
      ></path>
    </svg>
  );
}

export default ArrowIcon;
