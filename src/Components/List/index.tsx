import React from "react";
import { Note } from "../../types";

type PropsList = {
  data: Note[];
  children: (item: Note) => JSX.Element;
  onEmpty: () => React.ReactElement;
  [key: string]: any;
};
export const List = (props: PropsList) => {
  const { onEmpty, data, children, ...rest } = props;
  return (
    <div className="space-y-4 w-2/3 mx-auto h-full overflow-y-auto">
      <h1 className="text-2xl font-black mb-8">My Notes</h1>
      {data.length < 1 && onEmpty()}
      {data.length > 0 && (
        <div className="grid grid-cols-4 w-full mx-auto gap-3">
          {data.map(children)}
        </div>
      )}
    </div>
  );
};
