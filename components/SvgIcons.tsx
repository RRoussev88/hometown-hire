import type { FC, PropsWithChildren } from "react";

const BaseSVG: FC<PropsWithChildren> = ({ children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-current flex-shrink-0 h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
  >
    {children}
  </svg>
);

export const HamburgerIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M1 2l24 0M1 12l24 0M1 22l24 0"
    />
  </svg>
);

export const DownChevron: FC = () => (
  <svg
    className="fill-current"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
  </svg>
);

export const Info: FC = () => (
  <BaseSVG>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </BaseSVG>
);

export const Success: FC = () => (
  <BaseSVG>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </BaseSVG>
);

export const Warning: FC = () => (
  <BaseSVG>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </BaseSVG>
);
export const Error: FC = () => (
  <BaseSVG>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </BaseSVG>
);
