import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppProvider";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { signUp } = useAppContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return console.log("empty");
    }

    try {
      await signUp(email, password);
      setDoc(doc(db, "users", email), {
        savedShows: [],
      });
    } catch (error: any) {
      setError(error.message.split("Firebase:")[1]);
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="netflix"
        />

        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"> </div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[500px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16 px-3">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              {error && <p className="pt-3 text-red-700">{error}</p>}
              <form
                className="w-full flex flex-col py-4"
                onSubmit={handleSubmit}
              >
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  required
                />
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  required
                />
                <button className="bg-red-600 py-3 my-6 rounded font-bold">
                  Sign Up
                </button>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="flex items-center">
                    <input className="mr-2" type="checkbox" /> Remember me{" "}
                  </span>
                  <p>Need Help?</p>
                </div>
                <p className="py-6">
                  <span className="text-gray-600">
                    Already subscribed to Netflix?
                  </span>{" "}
                  <Link to="/login"> Sign In </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
