import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import axios from "axios";
import { addItem } from "../../slices/historySlice";
import { useSelector, useDispatch } from "react-redux";

async function getData(id) {
  try {
    const res = await axios.get("/api/get-synopses?id=" + id);
    return res.data;
  } catch (error) {
    throw error;
  }
}

async function favourite(id) {
  try {
    const res = await axios.put("/api/favourite", {
      movie_id: id,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default function moviepage() {
  const history = useSelector((state) => state.history.movies);
  const dispatch = useDispatch();
  const router = useRouter();
  const { movie } = router.query;
  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const movieDetail = await getData(movie);
        setMovieData(movieDetail);
        dispatch(
          addItem({
            title: movieDetail.title,
            id: movieDetail._id,
            poster: movieDetail.poster ? movieDetail.poster : "/nf.png",
            rating: movieDetail.imdb.rating,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (movie) {
      getMovieDetail();
    }
  }, [movie]);
  const [movieData, setMovieData] = useState(null);

  if (!movieData) {
    return <Layout>Loading</Layout>;
  }
  return (
    <Layout>
      <div className="grid grid-cols-12 px-4">
        <div className="gird md:col-span-4 col-span-12">
          <img
            src={movieData.poster ? movieData.poster : "/nf.png"}
            className="w-64 h-80 block mx-auto"
          />
        </div>
        <div className="md:col-span-6 col-span-12">
          <h1 className="text-2xl font-semibold text-left my-4">
            {movieData.title}
          </h1>
          <p className="my-4">{movieData.plot}</p>
          <p>Released: {movieData.year}</p>
          <div className="my-2">
            <p className="text-center my-2 font-semibold text-lg">Cast</p>
            <div className="flex items-center gap-2 flex-wrap">
              {movieData.cast.map((name, i) => {
                return (
                  <span
                    className="bg-gray-50 shadow-sm rounded px-4 py-2"
                    key={i}
                  >
                    {name}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="my-2">
            <p className="text-center my-2 font-semibold text-lg">Genres</p>
            <div className="flex items-center gap-2 flex-wrap">
              {movieData.genres.map((name, i) => {
                return (
                  <span
                    className="bg-gray-50 shadow-sm rounded px-4 py-2"
                    key={i}
                  >
                    {name}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="md:flex flex-row flex-wrap my-8 items-center text-center">
            <button
              className="mr-2"
              onClick={async () => {
                try {
                  if (!movieData.favourite) {
                    const data = await favourite(movieData._id);
                    setMovieData({ ...movieData, favourite: 1 });
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {!movieData.favourite ? "Mark Favourite" : "Favourite Movie"}
            </button>
            <button className="mx-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full">
              Watch Online
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
