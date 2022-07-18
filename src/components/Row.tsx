import { FC, useState, useEffect, useRef } from "react";
import axios from "axios";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Movie from "./Movie";
import { MovieObj } from "./Main";

interface Props {
  title: string;
  fetchURL: string;
}

const Row: FC<Props> = ({ title, fetchURL }) => {
  const [movies, setMovies] = useState<MovieObj[]>([]);

  const slider = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const getMovies = async () => {
      const { data } = await axios.get(fetchURL);
      setMovies(data.results);
    };
    getMovies();
  }, []);

  const slideLeft = (): void => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };

  const slideRight = (): void => {
    slider.current.scrollLeft = slider.current.scrollLeft + 500;
  };
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          size={40}
          className="bg-white text-black rounded-full absolute left-0 opacity-70 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
        <div
          ref={slider}
          className="w-full h-full overflow-x-scroll whitespace-nowrap  scroll-smooth scrollbar-hide relative"
        >
          {movies?.map((item, i) => (
            <Movie key={i} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="bg-white text-black rounded-full absolute right-0 opacity-70 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
      </div>
    </>
  );
};

export default Row;
