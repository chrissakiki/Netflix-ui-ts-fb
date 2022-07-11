import React, { useRef, useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useAppContext } from "../AppProvider";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
const SavedShows = () => {
  interface Movie {
    id: number;
    img: string;
    title: string;
  }
  const [movies, setMovies] = useState<Movie[]>([]);
  const { user } = useAppContext();

  const slider = useRef() as React.MutableRefObject<HTMLInputElement>;

  const slideLeft = (): void => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };

  const slideRight = (): void => {
    slider.current.scrollLeft = slider.current.scrollLeft + 500;
  };

  const deleteShow = async (id: number) => {
    if (!user.email) return;
    const movieRef = doc(db, "users", `${user.email}`);
    try {
      const updatedShows = movies.filter((item) => item.id !== id);
      await updateDoc(movieRef, {
        savedShows: updatedShows,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user.email]);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
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
          {movies.map((item: any, i: number) => (
            <div
              key={i}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="white-space-normal text-sm md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item?.title}
                </p>
                <span
                  onClick={() => deleteShow(item.id)}
                  className="absolute text-gray-300 top-4 right-4 "
                >
                  <AiOutlineClose />
                </span>
              </div>
            </div>
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

export default SavedShows;
