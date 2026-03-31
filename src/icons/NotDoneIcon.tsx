import { SVGProps } from "react";

const NotDoneIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_885_5292)">
        <path
          d="M10.75 20.98C16.2728 20.98 20.75 16.5058 20.75 10.9866C20.75 5.46738 16.2728 0.993164 10.75 0.993164C5.22715 0.993164 0.75 5.46738 0.75 10.9866C0.75 16.5058 5.22715 20.98 10.75 20.98Z"
          fill="#E21B1B"
        />
        <path
          d="M7.57778 6.26694L6.03125 7.81348L13.9217 15.704L15.4683 14.1574L7.57778 6.26694Z"
          fill="white"
        />
        <path
          d="M13.9217 6.26674L6.03125 14.1572L7.57778 15.7038L15.4683 7.81327L13.9217 6.26674Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_885_5292">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.75 0.986328)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default NotDoneIcon;
