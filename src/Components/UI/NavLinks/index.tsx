import { ReactNode } from "react";
import { Link } from "wouter";

type PropsNavLinks = {
  className?: string;
  children: ReactNode;
  href: string;
  [key: string]: any;
};

export const NavLinks = (props: PropsNavLinks) => {
  const { className, href, children, ...rest } = props;
  return (
    <Link
      href={href}
      className={`block flex justify-center items-center cursor-pointer text-gray-600 hover:text-blue-800 ${
        className ?? ""
      }`}
      {...rest}
    >
      {children}
    </Link>
  );
};
