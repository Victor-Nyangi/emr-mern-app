import React from "react";

type Props = {
  statement: {
    title: string;
    description: string;
    image: string;
  };
};
const StatementCard = ({ statement }: Props) => {
  return (
    <>
      <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
        <img
          className="object-cover w-full h-56 md:h-64 xl:h-80"
          src={statement.image}
          alt={statement.title}
        />
        <div className="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
          <p className="mb-4 text-lg font-bold text-gray-100 dark:text-gray-200">
            {statement.title}
          </p>
          <p className="text-sm tracking-wide text-gray-300 dark:text-gray-200">
            {statement.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default StatementCard;
