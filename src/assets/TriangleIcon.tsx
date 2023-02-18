import React from "react";

function TriangleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="40"
      fill="none"
      viewBox="0 0 22 40"
    >
      <path
        fill="currentColor"
        d="M0 2.024c0-1.8 3.162-2.7 5.012-1.428L31.14 18.572c1.147.788 1.147 2.068 0 2.856L5.012 39.404C3.162 40.677 0 39.776 0 37.976V2.024z"
      ></path>
    </svg>
  );
}

export default TriangleIcon;

