import React, { useRef, useEffect } from "react";
import { XIcon as IoClose, SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDebounce } from "../hooks/debounce";
import Layout from "../components/layout";
import axios from "axios";
import MovieCard from "../components/movieCard";
import Link from "next/link";

const containerVariants = {
  expanded: {
    display: "block",
    height: "30em",
  },
  collapsed: {
    display: "none",
    height: "0em",
  },
};

const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

function useOutsideAlerter(ref, callbackfunc) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callbackfunc();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

async function getData(searchTitle = "") {
  try {
    const res = await axios.get("/api/auto-complete?title=" + searchTitle);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default function SearchBar(props) {
  useEffect(() => {
    const getLatestMovies = async () => {
      try {
        const latestMovies = await getData("");
        setLatestMovies(latestMovies);
      } catch (error) {
        console.log(error);
      }
    };
    getLatestMovies();
  }, []);

  const [isExpanded, setExpanded] = useState(false);
  const [data, setData] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");

  
  const expandContainer = () => {
    setExpanded(true);
  };
  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery("");
    if (inputRef.current) inputRef.current.value = "";
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, collapseContainer);

  const handleChange = async (e) => {
    setLoading(true);
    setData([]);
    setSearchQuery(e.target.value);
  };

  useDebounce(searchQuery, 500, async () => {
    try {
      const data = await getData(searchQuery);
      setData([...data]);
      setLoading(false);
    } catch (error) {}
  });

  return (
    <Layout>
      <div className="px-10">
        <motion.div ref={wrapperRef} className="relative flex-1 my-10">
          <div className="flex items-center">
            <SearchIcon className="w-6 h-6 -mr-10 z-10 text-gray-400" />
            <input
              onChange={handleChange}
              type="text"
              placeholder="Search for any Movie"
              onFocus={expandContainer}
              ref={inputRef}
              className="flex-1 bg-gray-100 rounded-full box-border pl-14 pr-14 py-3 focus:outline-none"
            />
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  key="close-icon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={collapseContainer}
                  transition={{ duration: 0.2 }}
                >
                  <IoClose className="w-8 h-8 -ml-10 text-gray-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* {isExpanded && <div className=" min-w-full bg-gray-100 h-1 flex"></div>} */}
          <motion.div
            animate={isExpanded ? "expanded" : "collapsed"}
            className="absolute z-50 top-16 w-full rounded-full border"
            variants={containerVariants}
            transition={containerTransition}
          >
            <div className="w-full h-full flex flex-col p-2 overflow-y-auto bg-white border shadow-xl rounded-lg">
              <div className="w-full flex items-center justify-center relative">
                <span className="flex items-center justify-center">
                  {data.length ? (
                    <div>
                      {data.map((d, i) => {
                        return (
                          <div
                            className="flex flex-wrap md:flex-nowrap items-center flex-row my-4 w-full"
                          >
                            <Link href={`/movie/${d._id}`}>
                              <img
                                src={d.poster ? d.poster : "/nf.png"}
                                className="w-32 h-40 rounded align-middle"
                              />
                            </Link>
                            <div>
                              <h2 className="mx-2 px-2 font-semibold text-lg">
                                <Link href={`/movie/${d._id}`}>{d.title}</Link>
                              </h2>
                              <p className="mx-2 px-2">
                                <Link href={`/movie/${d._id}`}>{d.plot}</Link>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : searchQuery ? (
                    loading ? (
                      "Loading..."
                    ) : (
                      "No results found"
                    )
                  ) : (
                    "Enter Something to search"
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <h2 className="text-xl font-semibold my-10 text-center">
          Latest Titles
        </h2>
        <div className="flex flex-row flex-wrap justify-center gap-4">
          {!latestMovies.length
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                return <MovieCard loading={true} key={i} />;
              })
            : ""}
          {latestMovies.map((d, i) => {
            return (
              <MovieCard
                key={d._id}
                id={d._id}
                loading={false}
                title={d.title}
                poster={d.poster}
                plot={d.plot}
                rating={d.imdb.rating}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
