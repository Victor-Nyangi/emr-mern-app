import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <>
      <div className="h-fit md:min-h-screen w-full mb-8">
        <div className="relative w-full m-auto">
          <div className="flex md:flex-row md:min-h-[calc(100vh-80px)] h-full">
            <div className="flex flex-col justify-center flex-1 h-5/6">
              <div className="flex flex-row lg:m-0 w-full mb-2">
                <Skeleton className="h-9 w-[200px] bg-sw-gray-faint md:mr-8" />
              </div>
              <div>
                {[1, 2, 3].map((_) => (
                  <Skeleton
                    className="h-32 w-full bg-sw-gray-faint py-4 mt-4"
                    key={_}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonLoader;
