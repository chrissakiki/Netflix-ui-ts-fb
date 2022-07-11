import { FC, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAppContext } from "../AppProvider";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

interface props {
  item: any;
}

const Movie: FC<props> = ({ item }) => {
  const { user } = useAppContext();

  const [like, setLike] = useState<boolean>(false);

  const saveShow = async () => {
    if (!user.email) return;

    setLike(!like);

    const movieID = doc(db, "users", `${user.email}`);
    await updateDoc(movieID, {
      savedShows: arrayUnion({
        id: item.id,
        title: item.title,
        img: item.backdrop_path,
      }),
    });
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-sm md:text-sm font-bold flex justify-center items-center h-full text-center ">
          {item?.title.slice(0, 18)}
        </p>
        <span onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </span>
      </div>
    </div>
  );
};

export default Movie;
