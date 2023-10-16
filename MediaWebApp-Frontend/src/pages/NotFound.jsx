import React from "react";

export default function NotFound() {
  return (
    <div className="w-full min-h-[calc(100vh-43px)] max-h-fit bg-zinc-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-red-500 inline pt-[97px]">404</h1>
      <p className=" text-xl pt-4 pb-8">
        This is not the page that you are looking for.
      </p>
    </div>
  );
}
