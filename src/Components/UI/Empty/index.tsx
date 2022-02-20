import React from "react";
import { WarningIcon } from "../../../Icons";

export const Empty = (): React.ReactElement => {
  return (
    <div className="flex my-10 gap-4 bg-orange-100 p-4 w-full rounded-md">
      <div className="w-max">
        <div className="h-10 w-10 flex rounded-full bg-gradient-to-b from-orange-100 to-orange-300 text-orange-700 justify-center items-center">
          <WarningIcon />
        </div>
      </div>
      <div className="space-y-1 text-sm">
        <h6 className="font-medium text-orange-900">Advertisement</h6>
        <p className="text-orange-700 leading-tight">
          Not notes in your list yet.
        </p>
      </div>
    </div>
  );
};
