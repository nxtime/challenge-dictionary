import React from "react";

function PauseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <rect width="12" height="32" fill="currentColor" rx="2"></rect>
      <rect width="12" height="32" x="20" fill="currentColor" rx="2"></rect>
    </svg>
  );
}

export default PauseIcon;
