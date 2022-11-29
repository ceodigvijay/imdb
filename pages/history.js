import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "../components/movieCard";
import Layout from "../components/layout";
export default function historyPage() {
  const history = useSelector((state) => state.history.movies);

  return (
    <Layout>
      <h1 className="text-2xl font-semibold text-center">History</h1>
      {!Object.keys(history).length ? (
        <h3 className="text-center my-10 ">No items in history</h3>
      ) : (
        <div className="p-4">
          <div className="flex flex-row flex-wrap justify-center gap-4">
            {Object.keys(history).map((d, i) => {
              const { id, title, poster, rating } = history[d];
              return (
                <MovieCard
                  key={id}
                  id={id}
                  title={title}
                  poster={poster}
                  rating={rating}
                />
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
}
