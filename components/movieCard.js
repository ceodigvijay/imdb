import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function movieCard({
  loading = false,
  id,
  title,
  poster = "/nf.png",
  plot,
  rating,
}) {
  if (loading) {
    return <div className="w-64 h-80 bg-gray-200 rounded animate-pulse"></div>;
  } else {
    return (
      <>
        <div className="flex flex-col items-center">
          <div className="relative">
            <Link href={`/movie/${id}`}>
              <img src={poster} className="w-64 h-80" />
            </Link>
            <div className="absolute top-4 right-6 flex bg-white items-center rounded px-2">
              <StarIcon className="w-6 h-6 fill-yellow-500" />
              <span className="text-lg font-semibold mx-2">{rating}</span>
            </div>
          </div>
          <div className="flex bg-white rounded px-2 items-center">
            <Link href={`/movie/${id}`}>
              <span className="text-xl font-semibold mx-2">{title}</span>{" "}
            </Link>
          </div>
        </div>
      </>
    );
  }
}
