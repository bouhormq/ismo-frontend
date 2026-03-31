import { SVGProps } from "react";

const RejectedIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_728_2158)">
        <path
          d="M10 20.4803C15.5228 20.4803 20 16.0061 20 10.4868C20 4.96762 15.5228 0.493408 10 0.493408C4.47715 0.493408 0 4.96762 0 10.4868C0 16.0061 4.47715 20.4803 10 20.4803Z"
          fill="#E21B1B"
        />
        <path
          d="M6.82778 5.76743L5.28125 7.31396L13.1717 15.2045L14.7183 13.6579L6.82778 5.76743Z"
          fill="white"
        />
        <path
          d="M13.1717 5.76686L5.28125 13.6573L6.82778 15.2039L14.7183 7.31339L13.1717 5.76686Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_728_2158">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 0.486816)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RejectedIcon;
