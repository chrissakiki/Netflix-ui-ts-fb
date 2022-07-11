import { FC, useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";
const Main: FC = () => {
  const [movies, setMovies] = useState<string[]>([]);

  const movie: any = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    const popularMovies = async () => {
      const { data } = await axios.get(requests.requestPopular);
      setMovies(data.results);
    };
    popularMovies();
  }, []);

  const truncateString = (str: string, num: number): any => {
    if (!str) return;
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <div className="w-full h-[500px] text-white mb-3">
      <div className="w-full h-full">
        <div className="absolute w-full h-[500px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />

        <div className="absolute w-full top-[20%] p-4 md:p-6">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button className="transition ease-in-out duration-200 border  bg-gray-300 text-black border-gray-300 py-2 px-5 hover:bg-red-700 hover:border-red-700 ">
              Play
            </button>
            <button className="transition ease-in-out duration-200 border text-white border-gray-300 py-2 px-5 ml-4 hover:border-red-700 ">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(movie?.overview, 200)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
