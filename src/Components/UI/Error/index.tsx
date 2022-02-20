import React from "react";
import { ErrorIcon } from "../../../Icons";

export const Error = ({ error }: { error: string }): React.ReactElement => {
  return (
    <div className="flex gap-4 bg-red-100 p-4 w-full rounded-md">
      <div className="w-max">
        <div className="h-10 w-10 flex rounded-full bg-gradient-to-b from-red-100 to-red-300 text-red-700 justify-center items-center">
          <ErrorIcon />
        </div>
      </div>
      <div className="space-y-1 text-sm">
        <h6 className="font-medium text-red-900">Error</h6>
        <p className="text-red-700 leading-tight">{error} </p>
      </div>
    </div>
  );
};
