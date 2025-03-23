import React from "react";

interface Props {
  loadingText?: string;
}
const Loader = ({ loadingText }: Props) => {
  return (
    <div className="flex items-center justify-center h-[100%] place-content-center w-full bg-onPrimary bg-opacity-50 absolute cursor-progress">
      <div className="flex justify-center items-center gap-2 text-primary">
        <span className="h-8 w-8 block rounded-full border-4 border-t-primary animate-spin"></span>
        {loadingText && loadingText}
        <span className="animate-ping" data-testid="spinner">
          ...
        </span>
      </div>
    </div>
  );
};

export default Loader;
