import { ReactNode } from "react";

type PropsTypeContainer = {
  className?: string;
  children: ReactNode;
  [key: string]: any;
  numCols?: number;
};

export const Container = (props: PropsTypeContainer): JSX.Element => {
  let { children, className, numCols, ...rest } = props;
  return (
    <div
      className={`w-full my-10 md:w-11/12 mx-auto items-center h-[calc(100vh_-_20rem)] md:px-24 md:h-[calc(100vh_-_10rem)] grid grid-cols-${numCols} ${
        className ?? ""
      } `}
      {...rest}
    >
      {children}
    </div>
  );
};
