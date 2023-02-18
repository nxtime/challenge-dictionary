import React from "react";

function DictionaryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="34"
      fill="none"
      viewBox="0 0 32 34"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1.03 28.53v-24c0-3.2 2.333-3.667 3.5-3.5h23.5c.5 0 1.5.3 1.5 1.5v22.5h-25c-1.167 0-3.5.7-3.5 3.5zm0 0c-.167 1.166.3 3.5 3.5 3.5h25.5m-20-24h10.5"
      ></path>
    </svg>
  );
}

export default DictionaryIcon;

