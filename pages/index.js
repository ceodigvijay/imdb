import Image from "next/image";
import Link from "next/link";
import React from "react";
import Layout from "../components/layout";
import { StarIcon } from "@heroicons/react/solid";
export default function indexPage() {
  return (
    // <Layout>
    <div className="grid grid-cols-12 min-h-screen px-4">
      <div className="md:col-span-6 col-span-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-center md:text-left">
          Accurate Movies details with <br /> Real World Ratings
        </h1>
        <p className="my-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          aliquam mi vel ipsum molestie vestibulum. Pellentesque posuere non
          orci non viverra. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.{" "}
        </p>
        <div className="my-4 md:flex flex-row items-center text-center">
          <Link href={"/history/"} className="text-black-400 hover:text-blue-500 mr-4">History</Link>
          <Link
            href={"/search"}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full mx-4"
          >
            Search Movies
          </Link>
        </div>
      </div>
      <div className="w-full h-full md:col-span-6 col-span-12 px-4 py-2 relative">
        <img src={"/front.jpg"} className="w-full h-full rounded" />
        <div className="absolute top-4 right-6 flex bg-white items-center rounded px-2">
          <StarIcon className="w-6 h-6 fill-yellow-500" />
          <span className="text-lg font-semibold mx-2">4.5</span>
        </div>
        <div className="absolute bottom-4 left-6 flex bg-white rounded px-2 items-center">
          <span className="text-xl font-semibold mx-2">The Alien's Invasion: On Planet Earth</span>
        </div>
      </div>
    </div>
    // </Layout>
  );
}
